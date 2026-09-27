import { NextResponse } from 'next/server';

// In-memory registration cache for duplicate checking
const registrations: Map<string, {
  fullName: string;
  studentId: string;
  email: string;
  branch: string;
  semester: string;
  teamStatus: string;
  registeredAt: string;
  ticketId: string;
}> = new Map();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, studentId, email, branch, semester, teamStatus } = body;

    // Strict validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid full name (at least 2 characters).' },
        { status: 400 }
      );
    }

    if (!studentId || typeof studentId !== 'string' || studentId.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid Student ID / Roll Number.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim().toLowerCase())) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid student email address.' },
        { status: 400 }
      );
    }

    if (!branch || typeof branch !== 'string' || branch.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please specify your engineering branch (e.g. CSE, IT, ECE).' },
        { status: 400 }
      );
    }

    if (!semester || typeof semester !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Please select your current semester.' },
        { status: 400 }
      );
    }

    const validStatuses = ['Joining a team', 'Bringing a team', 'Looking for teammates', 'Solo'];
    if (!teamStatus || !validStatuses.includes(teamStatus)) {
      return NextResponse.json(
        { success: false, error: 'Please select a valid team status.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedId = studentId.trim().toUpperCase();

    // Duplicate detection by email or student ID
    if (registrations.has(normalizedEmail)) {
      const existing = registrations.get(normalizedEmail)!;
      return NextResponse.json(
        {
          success: false,
          error: `A registration already exists with this email address (${normalizedEmail}) under Ticket #${existing.ticketId}.`,
          isDuplicate: true,
          ticketId: existing.ticketId,
        },
        { status: 409 }
      );
    }

    // Check by Student ID
    const existingList = Array.from(registrations.values());
    for (const reg of existingList) {
      if (reg.studentId.toUpperCase() === normalizedId) {
        return NextResponse.json(
          {
            success: false,
            error: `Student ID "${normalizedId}" is already registered under Ticket #${reg.ticketId}.`,
            isDuplicate: true,
            ticketId: reg.ticketId,
          },
          { status: 409 }
        );
      }
    }

    // Generate Celestial Ticket ID
    const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
    const ticketId = `REALM-2026-${randomHex}`;
    const timestamp = new Date().toISOString();

    const record = {
      fullName: fullName.trim(),
      studentId: normalizedId,
      email: normalizedEmail,
      branch: branch.trim(),
      semester: semester.trim(),
      teamStatus,
      registeredAt: timestamp,
      ticketId,
    };

    registrations.set(normalizedEmail, record);

    // If an external Google Apps Script URL is configured in environment, forward payload asynchronously
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (googleScriptUrl) {
      try {
        fetch(googleScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record),
        }).catch((err) => console.warn('Google Script forward notice:', err));
      } catch (err) {
        console.warn('Google Script network notice:', err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Welcome to The Nine Realms. Your registration for Hacktoberfest Hack Day Jaunpur is confirmed!',
        ticketId,
        participant: record,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Registration API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while processing registration. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    event: 'Hacktoberfest Hack Day Jaunpur × Prasad Institute of Technology',
    realm: 'The Nine Realms 2026',
    totalRegistrations: registrations.size,
  });
}
