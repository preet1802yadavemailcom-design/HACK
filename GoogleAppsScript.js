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
    } else if (action === "testBroadcast") {
      output = testBroadcastMilestoneEmailToAdmin();
    } else if (action === "broadcastMilestone") {
      output = broadcastMilestoneThankYouToAllParticipants();
    } else if (action === "REGISTER") {
      output = processRegistration(params);
    } else if (!action && params.fullName && params.email) {
      output = processRegistration(params);
    } else {
      output = {
        success: true,
        service: "Hacktoberfest Hack Day Jaunpur 2026 API",
        status: "LIVE & OPERATIONAL",
        supportedActions: ["REGISTER", "getTeam", "checkStudent", "quota", "testBroadcast", "broadcastMilestone"]
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
                    ⚠️ <strong>Teammates Note:</strong> After joining your squad, make sure all team members connect to the official WhatsApp community for announcements!
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
  <!-- 🚀 STEP 2: OFFICIAL WHATSAPP COMMUNITY GROUP & LAPTOP NOTICE       -->
  <!-- ═══════════════════════════════════════════════════════════════════ -->
  <tr>
    <td style="padding:0 36px 28px;">
      <div style="background:linear-gradient(135deg,#064e3b,#022c22);border:2px solid #10b981;border-radius:16px;padding:24px;box-shadow:0 0 30px rgba(16,185,129,0.3);">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <div style="display:inline-block;padding:4px 12px;background:rgba(16,185,129,0.25);border:1px solid #34d399;border-radius:20px;font-family:'Courier New',monospace;font-size:10px;font-weight:800;color:#6ee7b7;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">
                📲 MANDATORY COMMUNITY GROUP &bull; JOIN NOW
              </div>
              <h3 style="margin:0 0 8px 0;font-size:18px;font-weight:900;color:#ffffff;text-transform:uppercase;letter-spacing:1px;">
                Join Official Hackathon WhatsApp Group
              </h3>
              <p style="margin:0 0 14px 0;font-size:13px;color:#e2e8f0;line-height:1.6;">
                All confirmed participants must join the official WhatsApp Community. Real-time problem statements, sprint updates, reporting guidelines, and mentor assistance will be coordinated exclusively in this group.<br>
                <em>(If you have already joined the community, you are all set &mdash; no further action required!)</em>
              </p>
              
              <table cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td align="center" style="border-radius:12px;background:linear-gradient(135deg,#10b981,#059669);box-shadow:0 4px 20px rgba(16,185,129,0.5);">
                    <a href="https://chat.whatsapp.com/JFsE2mm3c8l4wnnwjYI9Th" target="_blank" style="display:inline-block;padding:14px 28px;font-family:'Courier New',monospace;font-size:13px;font-weight:900;color:#000000;text-decoration:none;text-transform:uppercase;letter-spacing:1.5px;">
                      👉 Join Official WhatsApp Group Now &raquo;
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Laptop / College System Notice -->
              <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(245,158,11,0.4);border-radius:12px;padding:14px;margin-top:12px;">
                <p style="margin:0 0 4px 0;font-size:12px;font-weight:800;color:#fbbf24;">
                  💻 LAPTOP &amp; COLLEGE COMPUTER SYSTEMS NOTICE:
                </p>
                <p style="margin:0;font-size:12px;color:#cbd5e1;line-height:1.5;">
                  &bull; Participants who own a personal laptop should bring their machine and charger to the venue.<br>
                  &bull; <strong>Don&apos;t have a personal laptop? No worries at all!</strong> Prasad Institute of Technology&apos;s high-speed computer labs and desktop workstations are fully available for your use during the hackathon. Complete computer setups will be provided by the department!
                </p>
              </div>
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
    "Your registration for Hacktoberfest Hack Day Jaunpur 2026 has been officially confirmed.\n\n" +
    "Ticket ID: " + ticketId + "\n" +
    "Squad / Team: " + teamName + "\n" +
    "Team Code: " + teamCode + "\n" +
    "Date: Saturday, October 24, 2026 | 09:30 AM IST\n" +
    "Venue: PIT Campus Auditorium, Jaunpur\n\n" +
    "📢 OFFICIAL WHATSAPP COMMUNITY GROUP (MANDATORY):\n" +
    "All confirmed participants must join the official WhatsApp Community. Real-time problem statements, sprint updates, reporting guidelines, and mentor assistance will be coordinated exclusively in this group:\n" +
    "👉 https://chat.whatsapp.com/JFsE2mm3c8l4wnnwjYI9Th\n" +
    "(If you have already joined the group, you are all set — no further action required!)\n\n" +
    "💻 LAPTOP & COLLEGE COMPUTER SYSTEMS NOTICE:\n" +
    "• Participants who own a personal laptop should bring their machine and charger to the venue.\n" +
    "• Don't have a personal laptop? No worries at all! Prasad Institute of Technology's high-speed computer labs and desktop workstations are fully available for your use during the hackathon. Complete computer setups will be provided by the department!\n\n" +
    "Direct Coordinator Hotline:\n" +
    "• Shubhashish Kundu Sir (Faculty Coordinator): +91 63065 88533\n" +
    "• Preet Yadav (Lead Student Organizer): +91 63945 30549\n\n" +
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

// ════════════════════════════════════════════════════════════════════════════════
//  MILESTONE BROADCAST ENGINE — 125+ HACKERS MILESTONE & SPECIAL THANKS
// ════════════════════════════════════════════════════════════════════════════════

/**
 * 🧪 Test Milestone Email directly to Admin (Run from Script Editor dropdown!)
 * Function: testBroadcastMilestoneEmailToAdmin()
 */
function testBroadcastMilestoneEmailToAdmin() {
  var remaining = MailApp.getRemainingDailyQuota();
  Logger.log("Remaining Daily Email Quota: " + remaining);

  var testAttendee = {
    fullName: "Preet Yadav (Admin Test)",
    email: ADMIN_EMAIL,
    ticketId: "PIT-2026-TEST",
    teamName: "Hackathon Core Organizing Squad"
  };

  var res = sendMilestoneThankYouEmail(testAttendee.email, testAttendee.fullName, testAttendee.ticketId, testAttendee.teamName);
  Logger.log("Admin Test Milestone Email Result: " + JSON.stringify(res));
  return { success: res.success, details: res, remainingDailyQuota: MailApp.getRemainingDailyQuota() };
}

/**
 * 📢 Broadcast Milestone & Special Thanks Email to ALL Registered Participants (125+)
 * Run from Script Editor: Select "broadcastMilestoneThankYouToAllParticipants" -> Click "Run" (▶️)
 */
function broadcastMilestoneThankYouToAllParticipants() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();
  var data  = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return { success: false, message: "No registered participants found in sheet." };
  }

  var quota = MailApp.getRemainingDailyQuota();
  Logger.log("Starting broadcast. Daily Quota Available: " + quota);

  var totalRows = data.length - 1; // excluding header
  var sentCount = 0;
  var skipCount = 0;
  var failCount = 0;
  var sentEmails = {};

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var ticketId = row[1];
    var teamName = row[4] || "Solo Hacker";
    var fullName = row[6] || "Hacker Delegate";
    var email    = row[9] ? String(row[9]).trim().toLowerCase() : "";

    if (!email || email.indexOf("@") === -1) {
      skipCount++;
      continue;
    }

    // Prevent duplicate emails to the same address if registered multiple times
    if (sentEmails[email]) {
      skipCount++;
      continue;
    }

    try {
      var res = sendMilestoneThankYouEmail(email, fullName, ticketId, teamName);
      if (res.success) {
        sentCount++;
        sentEmails[email] = true;
        Logger.log("Sent (" + sentCount + "/" + totalRows + ") to: " + email);
      } else {
        failCount++;
        Logger.log("Failed sending to " + email + ": " + res.error);
      }

      // Small pause to maintain respectful pacing
      Utilities.sleep(150);
    } catch (sendErr) {
      failCount++;
      Logger.log("Exception sending to " + email + ": " + sendErr.message);
    }
  }

  var summary = {
    success: true,
    totalEligible: totalRows,
    sentCount: sentCount,
    skipped: skipCount,
    failed: failCount,
    remainingDailyQuota: MailApp.getRemainingDailyQuota()
  };

  Logger.log("Broadcast Completed: " + JSON.stringify(summary));
  return summary;
}

/**
 * 👑 Ultra-Royal Milestone Celebration & Thank You Email Template
 */
function sendMilestoneThankYouEmail(recipientEmail, fullName, ticketId, teamName) {
  var mlhUrl = "https://events.mlh.com/events/15264-hacktoberfest-hack-day-jaunpur-x-prasad-institute-of-technology-jaunpur";

  var html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Target Smashed! Special Thanks & Important Updates</title>
</head>
<body style="margin:0;padding:0;background-color:#05070f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#e2e8f0;">

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#05070f;padding:24px 12px;">
<tr>
<td align="center">
<table role="presentation" width="620" cellspacing="0" cellpadding="0" style="max-width:620px;width:100%;background-color:#0b0f19;border:1px solid rgba(245,158,11,0.4);border-radius:24px;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,0.8),0 0 40px rgba(245,158,11,0.2);">

  <!-- Top Amber Accent Line -->
  <tr>
    <td style="height:4px;background:linear-gradient(90deg,#f59e0b,#fbbf24,#10b981,#f59e0b);"></td>
  </tr>

  <!-- Header Branding -->
  <tr>
    <td style="padding:32px 32px 20px;text-align:center;background:linear-gradient(180deg,#121829 0%,#0b0f19 100%);border-bottom:1px solid rgba(255,255,255,0.08);">
      <div style="display:inline-block;padding:6px 16px;border-radius:50px;background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.4);color:#fbbf24;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:14px;">
        🏆 MILESTONE CRUSHED: 125+ HACKERS REGISTERED!
      </div>
      <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:900;letter-spacing:-0.5px;line-height:1.2;">
        HACKTOBERFEST HACK DAY JAUNPUR 2026
      </h1>
      <p style="margin:6px 0 0;color:#94a3b8;font-size:13px;letter-spacing:1px;font-weight:600;text-transform:uppercase;">
        Prasad Institute of Technology · Department of Computer Science &amp; Engineering
      </p>
    </td>
  </tr>

  <!-- Personalized Greeting & Special Thanks from Preet Yadav -->
  <tr>
    <td style="padding:28px 32px 18px;">
      <h2 style="margin:0 0 12px;font-size:21px;color:#ffffff;font-weight:800;">
        Dear ${fullName}, 👋
      </h2>
      <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#cbd5e1;">
        A heartfelt <strong style="color:#fbbf24;">THANK YOU</strong> from all of us for your incredible enthusiasm! Our original target was to register <strong style="color:#ffffff;">100 participants</strong> for this hackathon, but thanks to your overwhelming response, we easily crossed <strong style="color:#34d399;">125+ registered builders</strong>! 🎉
      </p>
      <p style="margin:0 0 18px;font-size:14px;line-height:1.7;color:#cbd5e1;">
        Because we have reached full capacity in the auditorium, <strong>new registrations have now been officially closed</strong> to ensure the best possible experience, mentorship, and safety for every attendee.
      </p>

      <!-- Ticket & Squad Reminder Box -->
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#050813;border:1px solid rgba(245,158,11,0.3);border-radius:16px;margin:16px 0;padding:16px;">
        <tr>
          <td width="50%" style="padding:8px;vertical-align:top;">
            <div style="font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Confirmed Ticket ID</div>
            <div style="font-size:15px;color:#fbbf24;font-weight:900;font-family:monospace;">${ticketId || "PIT-2026-VIP"}</div>
          </td>
          <td width="50%" style="padding:8px;vertical-align:top;">
            <div style="font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Affiliated Squad</div>
            <div style="font-size:14px;color:#ffffff;font-weight:700;">${teamName || "Solo Participant"}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- MANDATORY STEP: Official WhatsApp Community Group & Laptop Notice -->
  <tr>
    <td style="padding:0 32px 24px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:linear-gradient(135deg,#064e3b 0%,#022c22 100%);border:2px solid #10b981;border-radius:18px;padding:22px;box-shadow:0 0 35px rgba(16,185,129,0.25);">
        <tr>
          <td>
            <div style="font-size:11px;font-weight:800;color:#34d399;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px;">
              📲 MANDATORY COMMUNITY GROUP &bull; JOIN NOW
            </div>
            <h3 style="margin:0 0 10px;font-size:18px;color:#ffffff;font-weight:800;">
              Join Official Hackathon WhatsApp Group
            </h3>
            <p style="margin:0 0 12px;font-size:13px;line-height:1.6;color:#e2e8f0;">
              If you haven&apos;t joined the official WhatsApp group yet, please join immediately! All urgent sprint announcements, live problem statements, schedule updates, and mentor guidance will be shared directly in this community:
            </p>
            <p style="margin:0 0 16px;font-size:12px;color:#a7f3d0;line-height:1.5;font-style:italic;">
              💡 <em>If you have already joined the WhatsApp group, you are all set &mdash; no further action required!</em>
            </p>
            
            <div style="text-align:center;margin:16px 0;">
              <a href="https://chat.whatsapp.com/JFsE2mm3c8l4wnnwjYI9Th" target="_blank" style="display:inline-block;padding:14px 28px;background:linear-gradient(90deg,#10b981,#059669);color:#000000;text-decoration:none;font-weight:900;font-size:13px;letter-spacing:1px;text-transform:uppercase;border-radius:12px;box-shadow:0 4px 20px rgba(16,185,129,0.5);">
                👉 Join Official WhatsApp Group Now 🚀
              </a>
            </div>

            <!-- Laptop & College Computer Systems Notice -->
            <div style="background:rgba(0,0,0,0.45);border:1px solid rgba(245,158,11,0.45);border-radius:14px;padding:14px 16px;margin-top:14px;">
              <p style="margin:0 0 6px 0;font-size:12px;font-weight:800;color:#fbbf24;">
                💻 LAPTOP &amp; COLLEGE COMPUTER SYSTEMS NOTICE:
              </p>
              <p style="margin:0;font-size:12px;color:#cbd5e1;line-height:1.6;">
                &bull; Participants who own a personal laptop should bring their machine and charger to the venue.<br>
                &bull; <strong>Don&apos;t have a personal laptop? No worries at all!</strong> Prasad Institute of Technology&apos;s Computer Labs and high-speed desktop workstations are fully accessible for your use &mdash; you can smoothly participate and code on college systems!
              </p>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Sponsor Teaser Announcement (Verbatim) -->
  <tr>
    <td style="padding:0 32px 24px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#131826;border:1px solid rgba(245,158,11,0.35);border-radius:16px;padding:20px;">
        <tr>
          <td>
            <div style="font-size:11px;font-weight:800;color:#fbbf24;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">
              👀🔥 SOMETHING SPECIAL IS COMING SOON!
            </div>
            <p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:#e2e8f0;font-weight:600;">
              But wait… there’s more!
            </p>
            <p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:#cbd5e1;">
              We’re currently working on bringing additional sponsors and exclusive benefits for our participants and team members.
            </p>
            <p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:#cbd5e1;">
              🎁 More sponsor rewards &amp; goodies may be added soon, including benefits for participating teams.<br>
              🤝 The exact rewards will depend on the sponsors and their available offerings.<br>
              📢 All confirmed sponsor benefits will be officially revealed soon.
            </p>
            <p style="margin:8px 0 0;font-size:13px;color:#fbbf24;font-weight:700;">
              So stay tuned… more surprises are on the way! 🚀✨
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Event Schedule & Venue Reminder -->
  <tr>
    <td style="padding:0 32px 24px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#090d18;border-radius:14px;padding:16px;border:1px solid rgba(255,255,255,0.06);">
        <tr>
          <td style="font-size:12px;color:#94a3b8;line-height:1.7;">
            📅 <strong style="color:#ffffff;">Date:</strong> Saturday, October 24, 2026<br>
            ⏰ <strong style="color:#ffffff;">Reporting Time:</strong> 09:30 AM IST (Keynote starts at 10:00 AM)<br>
            🏛️ <strong style="color:#ffffff;">Venue:</strong> Main Auditorium, Prasad Institute of Technology, Jaunpur<br>
            💻 <strong style="color:#ffffff;">Setup:</strong> Personal Laptop &amp; Charger (College Lab Systems available for those without laptop)
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Direct Organizer Hotline & Regards -->
  <tr>
    <td style="padding:0 32px 32px;">
      <p style="margin:0 0 10px;font-size:13px;color:#cbd5e1;line-height:1.6;">
        If you have any questions, need team adjustments, or require assistance, feel free to contact us anytime:
      </p>
      <div style="font-size:13px;color:#fbbf24;font-weight:700;line-height:1.8;">
        📞 <strong>Preet Yadav</strong> (Lead Student Organizer): <a href="tel:+916394530549" style="color:#fbbf24;text-decoration:none;">+91 63945 30549</a><br>
        📞 <strong>Shubhashish Kundu Sir</strong> (Faculty Coordinator): <a href="tel:+916306588533" style="color:#fbbf24;text-decoration:none;">+91 63065 88533</a>
      </div>

      <div style="margin-top:20px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;color:#94a3b8;line-height:1.6;">
        Warm regards &amp; happy hacking,<br>
        <strong style="color:#ffffff;">Preet Yadav</strong> &amp; The Hacktoberfest Jaunpur Organizing Team<br>
        Department of Computer Science &amp; Engineering<br>
        Prasad Institute of Technology, Jaunpur<br>
        <a href="https://hack-avm.pages.dev" style="color:#f59e0b;text-decoration:none;">hack-avm.pages.dev</a>
      </div>
    </td>
  </tr>

  <!-- Bottom Accent Line -->
  <tr>
    <td style="height:3px;background:linear-gradient(90deg,transparent,#f59e0b,transparent);"></td>
  </tr>

</table>
</td>
</tr>
</table>

</body>
</html>`;

  var subject = "🎉 Target Smashed (125+ Hackers)! Special Thanks & Important Updates | Hacktoberfest Hack Day Jaunpur 2026";
  var plainText = "Dear " + fullName + ",\n\n" +
    "A heartfelt THANK YOU from all of us for your incredible enthusiasm!\n" +
    "Our initial target was 100 participants, but thanks to your overwhelming response, we easily crossed 125+ registered builders! Registrations are now officially closed.\n\n" +
    "Your Confirmed Ticket ID: " + (ticketId || "PIT-2026-VIP") + "\n" +
    "Affiliated Squad: " + (teamName || "Solo Participant") + "\n\n" +
    "📲 OFFICIAL WHATSAPP COMMUNITY GROUP (JOIN NOW):\n" +
    "If you have not joined the official WhatsApp group yet, please join immediately! All urgent sprint notices, live problem statements, and mentor guidance will be shared in this group:\n" +
    "👉 https://chat.whatsapp.com/JFsE2mm3c8l4wnnwjYI9Th\n" +
    "(Note: If you have already joined the group, you are all set — no further action required!)\n\n" +
    "💻 LAPTOP & COLLEGE LAB SYSTEMS NOTICE:\n" +
    "• Participants who own a personal laptop should bring their machine and charger to the venue.\n" +
    "• Don't have a personal laptop? No worries at all! Prasad Institute of Technology's Computer Labs and workstations will be fully available for your use — you can smoothly participate using college computer systems!\n\n" +
    "Event Date: Saturday, October 24, 2026 | 09:30 AM IST\n" +
    "Venue: PIT Campus Auditorium, Jaunpur\n\n" +
    "Direct Coordinator Hotline:\n" +
    "• Preet Yadav: +91 63945 30549\n" +
    "• Shubhashish Kundu Sir: +91 63065 88533\n\n" +
    "Warm regards,\n" +
    "Preet Yadav & The Organizing Team\n" +
    "Department of CSE · Prasad Institute of Technology";

  try {
    MailApp.sendEmail({
      to: recipientEmail,
      subject: subject,
      body: plainText,
      htmlBody: html,
      name: "Hacktoberfest Hack Day Jaunpur 2026"
    });
    return { success: true, engine: "MailApp" };
  } catch (err1) {
    Logger.log("Milestone MailApp failed for " + recipientEmail + ": " + err1.message + ". Attempting GmailApp fallback...");
    try {
      GmailApp.sendEmail(
        recipientEmail,
        subject,
        plainText,
        {
          htmlBody: html,
          name: "Hacktoberfest Hack Day Jaunpur 2026"
        }
      );
      return { success: true, engine: "GmailApp" };
    } catch (err2) {
      Logger.log("Both MailApp and GmailApp failed for " + recipientEmail + ": " + err2.message);
      return { success: false, error: err2.message };
    }
  }
}

