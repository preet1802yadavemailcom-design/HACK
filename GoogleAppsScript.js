// ════════════════════════════════════════════════════════════════════════════════
//  HACKTOBERFEST HACK DAY JAUNPUR 2026 — MASTER GOOGLE APPS SCRIPT
//  Prasad Institute of Technology · Department of Computer Science & Engineering
//  Ultra-Fast Edition: Instant Sheet Append + Step 2 MLH Official Registration
// ════════════════════════════════════════════════════════════════════════════════

var SHEET_NAME  = "Registrations";          // Sheet tab name
var ADMIN_EMAIL = "yadavpreetrajesh@gmail.com"; // Admin notification email

// ─── Manual Authorization Function (RUN THIS ONCE IN APPS SCRIPT EDITOR) ─────
function testSendEmailManually() {
  var remaining = MailApp.getRemainingDailyQuota();
  Logger.log("Remaining Daily Email Quota: " + remaining);
  
  var testData = {
    fullName: "Preet Yadav",
    rollNo: "2401440100032",
    phone: "6394530549",
    email: ADMIN_EMAIL,
    year: "3rd Year",
    branch: "CSE",
    track: "Web & Open Innovation",
    participationType: "Solo"
  };
  
  var result = sendUltraRoyalEmail(testData, "PIT-2026-TEST", "SOLO-99999", "Solo — Preet Yadav", "Solo Hacker");
  Logger.log("Test Email Result: " + JSON.stringify(result));
}

// ─── Universal Registration Processor (Shared by both doPost & doGet) ────────
function processRegistration(data) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();

  // Auto-create royal header row if sheet is fresh
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp", "Ticket ID", "Participation Type", "Team Code", "Team Name",
      "Member Role", "Full Name", "Roll No", "WhatsApp Phone", "Email",
      "Academic Year", "Branch", "Track", "Registration Status", "Email Delivery Status"
    ]);
    sheet.getRange(1, 1, 1, 15)
      .setBackground("#f59e0b")
      .setFontColor("#000000")
      .setFontWeight("bold");
  }

  var timestamp  = new Date();
  var ticketId   = "PIT-2026-" + Math.floor(100000 + Math.random() * 900000);
  var isSolo     = !data.participationType || data.participationType === "Solo";
  var joinExist  = !!data.teamCode;

  // 1. Duplicate Check
  var existingRow = findExistingRegistration(sheet, data.rollNo, data.email);
  if (existingRow) {
    var existData = sheet.getRange(existingRow, 1, 1, 14).getValues()[0];
    return {
      success: false,
      isDuplicate: true,
      ticketId:       existData[1],
      teamCode:       existData[3],
      teamName:       existData[4],
      registeredName: existData[6]
    };
  }

  // 2. Team Code Generation
  var teamCode = data.teamCode
    ? String(data.teamCode).trim().toUpperCase()
    : (isSolo ? "SOLO-" + Math.floor(100000 + Math.random() * 900000) : "PIT-" + Math.floor(1000 + Math.random() * 9000));

  // 3. Team Capacity Check
  if (joinExist) {
    var memberCount = countTeamMembers(sheet, teamCode);
    if (memberCount >= 3) {
      return {
        success: false,
        isFull: true,
        message: "Team " + teamCode + " has reached maximum capacity (3/3 members)."
      };
    }
  }

  // 4. Team Name
  var teamName = data.teamName
    ? data.teamName
    : (joinExist ? getTeamName(sheet, teamCode) : (isSolo ? "Solo — " + data.fullName : "Team " + teamCode));

  // 5. Role
  var role = data.role || (isSolo ? "Solo Hacker" : (joinExist ? "Team Member" : "Team Leader"));

  // 6. Append Row to Spreadsheet IMMEDIATELY (Turbo Fast)
  sheet.appendRow([
    timestamp,
    ticketId,
    data.participationType || "Solo",
    teamCode,
    teamName,
    role,
    data.fullName,
    data.rollNo,
    data.phone,
    data.email,
    data.year,
    data.branch,
    data.track || "General Track",
    "Confirmed",
    "Sent"
  ]);

  // 7. Dispatch Email
  try {
    sendUltraRoyalEmail(data, ticketId, teamCode, teamName, role);
  } catch (emailErr) {
    Logger.log("Email Delivery Error: " + emailErr.message);
  }

  return {
    success: true,
    ticketId: ticketId,
    teamCode: teamCode,
    teamName: teamName
  };
}

// ─── doGet: Handles GET requests & Fallback for Redirects ─────────────────────
function doGet(e) {
  var output;
  try {
    var params = (e && e.parameter) ? e.parameter : {};
    var action = params.action;

    if (action === "getTeam") {
      output = params.teamCode ? getTeamInfo(params.teamCode) : { success: false, error: "Team code missing" };
    } else if (action === "checkStudent") {
      output = checkStudentExists(params.rollNo, params.email, params.query);
    } else if (action === "quota") {
      output = { success: true, remainingDailyEmailQuota: MailApp.getRemainingDailyQuota() };
    } else if (action === "REGISTER") {
      output = processRegistration(params);
    } else if (!action && params.fullName && params.email) {
      output = processRegistration(params);
    } else {
      output = {
        success: true,
        service: "Hacktoberfest Hack Day Jaunpur 2026 API",
        status: "LIVE & OPERATIONAL",
        supportedActions: ["REGISTER", "getTeam", "checkStudent", "quota"]
      };
    }
  } catch (err) {
    output = { success: false, error: err.message };
  }

  return ContentService.createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── doPost: Handles direct AJAX POST requests ────────────────────────────────
function doPost(e) {
  var output;
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    if (data.action === "REGISTER" || data.fullName) {
      output = processRegistration(data);
    } else if (data.action === "getTeam") {
      output = getTeamInfo(data.teamCode);
    } else if (data.action === "checkStudent") {
      output = checkStudentExists(data.rollNo, data.email, data.query);
    } else {
      output = { success: false, error: "Unknown action requested." };
    }
  } catch (err) {
    output = { success: false, error: err.message };
  }

  return ContentService.createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── Helper Functions ────────────────────────────────────────────────────────
function findExistingRegistration(sheet, rollNo, email) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  var rows = sheet.getRange(2, 1, lastRow - 1, 14).getValues();
  for (var i = 0; i < rows.length; i++) {
    var sheetRoll  = String(rows[i][7]).trim().toLowerCase();
    var sheetEmail = String(rows[i][9]).trim().toLowerCase();
    if (rollNo && sheetRoll === String(rollNo).trim().toLowerCase()) return i + 2;
    if (email  && sheetEmail === String(email).trim().toLowerCase()) return i + 2;
  }
  return null;
}

function countTeamMembers(sheet, teamCode) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;
  var codes = sheet.getRange(2, 4, lastRow - 1, 1).getValues();
  var count = 0;
  for (var i = 0; i < codes.length; i++) {
    if (String(codes[i][0]).trim().toUpperCase() === teamCode) count++;
  }
  return count;
}

function getTeamName(sheet, teamCode) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return teamCode;
  var data = sheet.getRange(2, 4, lastRow - 1, 2).getValues();
  for (var i = 0; i < data.length; i++) {
    if (String(data[i][0]).trim().toUpperCase() === teamCode && data[i][1]) return data[i][1];
  }
  return teamCode;
}

function getTeamInfo(teamCode) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return { success: false, error: "No teams on record" };

  var data = sheet.getRange(2, 4, lastRow - 1, 2).getValues();
  var count = 0, tName = "";
  for (var i = 0; i < data.length; i++) {
    if (String(data[i][0]).trim().toUpperCase() === teamCode.trim().toUpperCase()) {
      count++;
      if (!tName && data[i][1]) tName = data[i][1];
    }
  }
  if (count === 0) return { success: false, error: "Team not found" };
  return { success: true, teamCode: teamCode, teamName: tName, memberCount: count, isFull: count >= 3 };
}

function checkStudentExists(rollNo, email, query) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return { exists: false };

  var q = (query || rollNo || email || "").toString().trim().toLowerCase();
  if (!q) return { exists: false };

  var rows = sheet.getRange(2, 1, lastRow - 1, 14).getValues();
  for (var i = 0; i < rows.length; i++) {
    var ticketId = String(rows[i][1]).trim().toLowerCase();
    var teamCode = String(rows[i][3]).trim().toLowerCase();
    var teamName = String(rows[i][4]);
    var role     = String(rows[i][5]);
    var name     = String(rows[i][6]);
    var rNo      = String(rows[i][7]).trim().toLowerCase();
    var phone    = String(rows[i][8]).trim().replace(/\D/g, "");
    var em       = String(rows[i][9]).trim().toLowerCase();
    var track    = String(rows[i][12]);

    if (
      (rNo && rNo === q) ||
      (em && em === q) ||
      (ticketId && ticketId === q) ||
      (phone && phone.slice(-10) === q.replace(/\D/g, "").slice(-10))
    ) {
      return {
        exists: true,
        ticketId: rows[i][1],
        teamCode: rows[i][3],
        teamName: teamName,
        role: role,
        name: name,
        rollNo: rows[i][7],
        phone: rows[i][8],
        email: rows[i][9],
        track: track
      };
    }
  }
  return { exists: false };
}

// ════════════════════════════════════════════════════════════════════════════════
//  ULTRA-ROYAL HTML EMAIL TEMPLATE + RESILIENT SENDER ENGINE
// ════════════════════════════════════════════════════════════════════════════════
function sendUltraRoyalEmail(data, ticketId, teamCode, teamName, role) {
  var isTeam = data.participationType === "Team";
  var isSoloCode = teamCode.startsWith("SOLO-");
  var mlhEventUrl = "https://events.mlh.com/events/15264-hacktoberfest-hack-day-jaunpur-x-prasad-institute-of-technology-jaunpur";

  var inviteHtml = "";
  if (isTeam && !isSoloCode) {
    inviteHtml = `
      <tr>
        <td style="padding:0 36px 28px;">
          <div style="background:linear-gradient(135deg,rgba(16,185,129,0.12),rgba(5,46,22,0.6));border:1px solid rgba(16,185,129,0.45);border-radius:16px;padding:22px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0 0 6px 0;font-family:'Courier New',monospace;font-size:11px;font-weight:700;letter-spacing:3px;color:#34d399;text-transform:uppercase;">
                    ⚡ SQUAD INVITE ACCESS
                  </p>
                  <p style="margin:0 0 14px 0;font-size:13px;color:#d1fae5;line-height:1.6;">
                    Share this unique Team Invite Code with your squad. When they visit the website, they get the full trailer experience and join your team automatically:
                  </p>
                  <table cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                    <tr>
                      <td style="background:#022c22;border:1px dashed #10b981;border-radius:8px;padding:8px 18px;">
                        <span style="font-family:'Courier New',monospace;font-size:18px;font-weight:800;color:#facc15;letter-spacing:3px;">${teamCode}</span>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:0 0 10px 0;font-family:'Courier New',monospace;font-size:11px;color:#6ee7b7;word-break:break-all;">
                    🔗 https://hack-avm.pages.dev/?team=${teamCode}
                  </p>
                  <p style="margin:0;font-size:12px;color:#a7f3d0;font-style:italic;">
                    ⚠️ <strong>Teammates Note:</strong> Team join karne ke baad sabhi members ko niche diye gaye MLH link par bhi individual registration complete karna compulsory hai!
                  </p>
                </td>
              </tr>
            </table>
          </div>
        </td>
      </tr>`;
  }

  var html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Official Pass — Hacktoberfest Hack Day Jaunpur 2026</title>
</head>
<body style="margin:0;padding:0;background-color:#020617;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f8fafc;-webkit-font-smoothing:antialiased;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#020617;padding:32px 16px;">
<tr>
<td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#0b0f19;border:1px solid rgba(245,158,11,0.3);border-radius:24px;overflow:hidden;box-shadow:0 0 60px rgba(245,158,11,0.15);">

  <tr>
    <td style="height:6px;background:linear-gradient(90deg,#f59e0b,#fbbf24,#10b981,#38bdf8,#f59e0b);"></td>
  </tr>

  <tr>
    <td style="padding:36px 36px 24px;text-align:center;">
      <table cellpadding="0" cellspacing="0" style="margin:0 auto 16px;">
        <tr>
          <td style="background:linear-gradient(135deg,#f59e0b,#d97706);padding:2px;border-radius:50px;">
            <div style="background:#000000;border-radius:48px;padding:6px 20px;">
              <span style="font-family:'Courier New',monospace;font-size:10px;font-weight:900;letter-spacing:3px;color:#fbbf24;text-transform:uppercase;">
                &#9679; OFFICIAL ACCREDITATION &#9679;
              </span>
            </div>
          </td>
        </tr>
      </table>

      <h1 style="margin:0 0 8px 0;font-size:26px;font-weight:900;letter-spacing:1px;color:#ffffff;text-transform:uppercase;">
        HACKTOBERFEST 2026
      </h1>
      <h2 style="margin:0 0 8px 0;font-size:20px;font-weight:800;letter-spacing:2px;color:#f59e0b;text-transform:uppercase;">
        HACK DAY JAUNPUR
      </h2>
      <p style="margin:0;font-size:13px;color:#94a3b8;font-weight:500;">
        Prasad Institute of Technology &bull; Department of CSE
      </p>
    </td>
  </tr>

  <tr>
    <td style="padding:0 36px 28px;">
      <div style="background:#0f172a;border:1px solid rgba(245,158,11,0.4);border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
        
        <div style="background:linear-gradient(90deg,#f59e0b,#fbbf24);padding:10px 20px;">
          <span style="font-family:'Courier New',monospace;font-size:10px;font-weight:900;color:#000000;letter-spacing:3px;text-transform:uppercase;">
            ★ SECURE ENTRY TICKET ★
          </span>
          <span style="font-family:'Courier New',monospace;font-size:10px;font-weight:800;color:#000000;float:right;text-transform:uppercase;">
            OCTOBER 2026
          </span>
        </div>

        <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 22px;">
          <tr>
            <td width="50%" style="padding:0 12px 18px 0;vertical-align:top;">
              <p style="margin:0 0 4px 0;font-family:'Courier New',monospace;font-size:9px;text-transform:uppercase;letter-spacing:2px;color:#64748b;">Ticket ID</p>
              <p style="margin:0;font-family:'Courier New',monospace;font-size:16px;font-weight:800;color:#f59e0b;letter-spacing:1px;">${ticketId}</p>
            </td>
            <td width="50%" style="padding:0 0 18px 12px;vertical-align:top;">
              <p style="margin:0 0 4px 0;font-family:'Courier New',monospace;font-size:9px;text-transform:uppercase;letter-spacing:2px;color:#64748b;">Participant Name</p>
              <p style="margin:0;font-size:15px;font-weight:700;color:#ffffff;">${data.fullName}</p>
            </td>
          </tr>
          <tr>
            <td width="50%" style="padding:0 12px 18px 0;vertical-align:top;border-top:1px dashed rgba(255,255,255,0.08);">
              <p style="margin:10px 0 4px 0;font-family:'Courier New',monospace;font-size:9px;text-transform:uppercase;letter-spacing:2px;color:#64748b;">Roll / Enrollment No</p>
              <p style="margin:0;font-family:'Courier New',monospace;font-size:14px;font-weight:700;color:#ffffff;">${data.rollNo}</p>
            </td>
            <td width="50%" style="padding:0 0 18px 12px;vertical-align:top;border-top:1px dashed rgba(255,255,255,0.08);">
              <p style="margin:10px 0 4px 0;font-family:'Courier New',monospace;font-size:9px;text-transform:uppercase;letter-spacing:2px;color:#64748b;">Squad Role</p>
              <p style="margin:0;font-size:13px;font-weight:700;color:#ffffff;">${role}</p>
            </td>
          </tr>
          <tr>
            <td width="50%" style="padding:0 12px 18px 0;vertical-align:top;border-top:1px dashed rgba(255,255,255,0.08);">
              <p style="margin:10px 0 4px 0;font-family:'Courier New',monospace;font-size:9px;text-transform:uppercase;letter-spacing:2px;color:#64748b;">Team Affiliation</p>
              <p style="margin:0;font-size:14px;font-weight:700;color:#ffffff;">${teamName}</p>
            </td>
            <td width="50%" style="padding:0 0 18px 12px;vertical-align:top;border-top:1px dashed rgba(255,255,255,0.08);">
              <p style="margin:10px 0 4px 0;font-family:'Courier New',monospace;font-size:9px;text-transform:uppercase;letter-spacing:2px;color:#64748b;">Innovation Track</p>
              <p style="margin:0;font-size:13px;font-weight:700;color:#38bdf8;">${data.track || "General Track"}</p>
            </td>
          </tr>
          ${!isSoloCode ? `
          <tr>
            <td colspan="2" style="padding:10px 0 0 0;border-top:1px dashed rgba(255,255,255,0.08);">
              <p style="margin:0 0 6px 0;font-family:'Courier New',monospace;font-size:9px;text-transform:uppercase;letter-spacing:2px;color:#64748b;">Official Team Passcode</p>
              <div style="background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.4);border-radius:8px;padding:8px 16px;display:inline-block;">
                <span style="font-family:'Courier New',monospace;font-size:18px;font-weight:900;color:#34d399;letter-spacing:3px;">${teamCode}</span>
              </div>
            </td>
          </tr>` : ""}
        </table>
      </div>
    </td>
  </tr>

  <!-- ═══════════════════════════════════════════════════════════════════ -->
  <!-- 🚀 STEP 2: MANDATORY MLH OFFICIAL REGISTRATION                     -->
  <!-- ═══════════════════════════════════════════════════════════════════ -->
  <tr>
    <td style="padding:0 36px 28px;">
      <div style="background:linear-gradient(135deg,#1e1b4b,#0f172a);border:2px solid #818cf8;border-radius:16px;padding:24px;box-shadow:0 0 30px rgba(129,140,248,0.25);">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <div style="display:inline-block;padding:4px 12px;background:rgba(239,68,68,0.2);border:1px solid #f87171;border-radius:20px;font-family:'Courier New',monospace;font-size:10px;font-weight:800;color:#fca5a5;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">
                ⚠️ ACTION REQUIRED &bull; STEP 2 OF 2
              </div>
              <h3 style="margin:0 0 8px 0;font-size:18px;font-weight:900;color:#ffffff;text-transform:uppercase;letter-spacing:1px;">
                Now You Are Eligible! Complete MLH Check-in
              </h3>
              <p style="margin:0 0 16px 0;font-size:13px;color:#cbd5e1;line-height:1.6;">
                Congratulations, you are now officially eligible for <strong>Hacktoberfest Hack Day Jaunpur 2026</strong>! Because this is an official <strong>Major League Hacking (MLH)</strong> partnered hackathon, <strong>every participant (including all teammates individually)</strong> must complete the official MLH portal registration to qualify for official hackathon check-in, certificates, developer swags, and prizes.
              </p>
              
              <table cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td align="center" style="border-radius:12px;background:linear-gradient(135deg,#ef4444,#f59e0b);box-shadow:0 4px 20px rgba(239,68,68,0.5);">
                    <a href="${mlhEventUrl}" target="_blank" style="display:inline-block;padding:14px 28px;font-family:'Courier New',monospace;font-size:13px;font-weight:900;color:#ffffff;text-decoration:none;text-transform:uppercase;letter-spacing:1.5px;">
                      🚀 Complete Official MLH Registration &raquo;
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.5;font-style:italic;">
                💡 <strong>Team Members Notice:</strong> Agar aap team me hain, to apne sabhi teammates ko bolen ki wo is official MLH link par jakar apna individual registration zaroor complete karein.
              </p>
            </td>
          </tr>
        </table>
      </div>
    </td>
  </tr>

  <tr>
    <td style="padding:0 36px 28px;">
      <div style="background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.25);border-radius:16px;padding:20px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="33%" style="text-align:center;padding:0 8px;">
              <p style="margin:0 0 2px 0;font-size:20px;">📅</p>
              <p style="margin:0 0 3px 0;font-family:'Courier New',monospace;font-size:9px;text-transform:uppercase;letter-spacing:2px;color:#94a3b8;">Event Date</p>
              <p style="margin:0;font-size:13px;font-weight:800;color:#ffffff;">Oct 24, 2026</p>
            </td>
            <td width="34%" style="text-align:center;padding:0 8px;border-left:1px solid rgba(255,255,255,0.08);border-right:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0 0 2px 0;font-size:20px;">⏰</p>
              <p style="margin:0 0 3px 0;font-family:'Courier New',monospace;font-size:9px;text-transform:uppercase;letter-spacing:2px;color:#94a3b8;">Reporting Time</p>
              <p style="margin:0;font-size:13px;font-weight:800;color:#ffffff;">09:30 AM IST</p>
            </td>
            <td width="33%" style="text-align:center;padding:0 8px;">
              <p style="margin:0 0 2px 0;font-size:20px;">🏛️</p>
              <p style="margin:0 0 3px 0;font-family:'Courier New',monospace;font-size:9px;text-transform:uppercase;letter-spacing:2px;color:#94a3b8;">Venue</p>
              <p style="margin:0;font-size:13px;font-weight:800;color:#ffffff;">PIT Auditorium</p>
            </td>
          </tr>
        </table>
      </div>
    </td>
  </tr>

  ${inviteHtml}

  <!-- HOTLINE CARDS -->
  <tr>
    <td style="padding:0 36px 32px;">
      <p style="margin:0 0 12px 0;font-family:'Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#64748b;text-align:center;">
        ORGANIZER DIRECT HOTLINE &bull; CALL FOR ANY QUERIES
      </p>

      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="48%" style="vertical-align:top;background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.3);border-radius:12px;padding:14px 16px;">
            <p style="margin:0 0 2px 0;font-size:12px;font-weight:800;color:#f59e0b;">
              👨‍🏫 Shubhashish Kundu Sir
            </p>
            <p style="margin:0 0 4px 0;font-size:11px;color:#64748b;">
              Faculty Coordinator
            </p>
            <p style="margin:0;font-family:'Courier New',monospace;font-size:13px;font-weight:700;">
              <a href="tel:+916306588533" style="color:#ffffff;text-decoration:none;">+91 63065 88533</a>
            </p>
          </td>

          <td width="4%"></td>

          <td width="48%" style="vertical-align:top;background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:14px 16px;">
            <p style="margin:0 0 2px 0;font-size:12px;font-weight:800;color:#10b981;">
              👨‍💻 Preet Yadav
            </p>
            <p style="margin:0 0 4px 0;font-size:11px;color:#64748b;">
              Student Coordinator
            </p>
            <p style="margin:0;font-family:'Courier New',monospace;font-size:13px;font-weight:700;">
              <a href="tel:+916394530549" style="color:#ffffff;text-decoration:none;">+91 63945 30549</a>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <tr>
    <td style="padding:0 36px 36px;text-align:center;">
      <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent);margin-bottom:24px;"></div>
      
      <p style="margin:0 0 6px 0;font-family:'Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:3px;color:#64748b;">
        OFFICIAL PARTNERS &amp; AFFILIATIONS
      </p>
      <p style="margin:0 0 16px 0;font-size:13px;font-weight:700;color:#94a3b8;">
        🏆 Major League Hacking (MLH) &nbsp;&bull;&nbsp; Dr. A.P.J. Abdul Kalam Technical University (AKTU)
      </p>
      <p style="margin:0;font-size:11px;color:#475569;line-height:1.7;">
        Hacktoberfest Hack Day Jaunpur 2026<br>
        Organized by Department of CSE · Prasad Institute of Technology · Jaunpur, U.P.<br>
        <a href="https://hack-avm.pages.dev" style="color:#f59e0b;text-decoration:none;font-weight:600;">hack-avm.pages.dev</a>
      </p>
    </td>
  </tr>

  <tr>
    <td style="height:3px;background:linear-gradient(90deg,transparent,rgba(245,158,11,0.5),transparent);border-radius:0 0 3px 3px;"></td>
  </tr>

</table>
</td>
</tr>
</table>

</body>
</html>`;

  var subject = "Pass Confirmed: Hacktoberfest Hack Day Jaunpur 2026 | Ticket #" + ticketId;
  var plainText = "Congratulations " + data.fullName + "!\n\n" +
    "Your pre-registration for Hacktoberfest Hack Day Jaunpur 2026 has been officially confirmed (Step 1/2).\n\n" +
    "Ticket ID: " + ticketId + "\n" +
    "Squad / Team: " + teamName + "\n" +
    "Team Code: " + teamCode + "\n" +
    "Date: Saturday, October 24, 2026 | 09:30 AM IST\n" +
    "Venue: PIT Campus Auditorium, Jaunpur\n\n" +
    "⚠️ MANDATORY STEP 2 (MLH Official Check-in):\n" +
    "Aap hackathon ke liye eligible hain! Major League Hacking (MLH) requires every attendee (and all teammates individually) to complete the official MLH check-in & registration:\n" +
    "👉 https://events.mlh.com/events/15264-hacktoberfest-hack-day-jaunpur-x-prasad-institute-of-technology-jaunpur\n\n" +
    "Direct Coordinator Hotline:\n" +
    "• Shubhashish Kundu Sir: +91 63065 88533\n" +
    "• Preet Yadav: +91 63945 30549\n\n" +
    "Prasad Institute of Technology · Department of CSE";

  try {
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      body: plainText,
      htmlBody: html,
      name: "Hacktoberfest Hack Day Jaunpur 2026"
    });
    return { success: true, engine: "MailApp" };
  } catch (err1) {
    Logger.log("MailApp failed: " + err1.message + ". Attempting GmailApp fallback...");
    try {
      GmailApp.sendEmail(
        data.email,
        subject,
        plainText,
        {
          htmlBody: html,
          name: "Hacktoberfest Hack Day Jaunpur 2026"
        }
      );
      return { success: true, engine: "GmailApp" };
    } catch (err2) {
      Logger.log("Both MailApp and GmailApp failed: " + err2.message);
      return { success: false, error: err2.message };
    }
  }
}
