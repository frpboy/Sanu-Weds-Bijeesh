import { NextResponse } from "next/server";
import { getDb, ensureTable } from "@/lib/db";

export async function GET() {
  try {
    await ensureTable();
    const sql = getDb();
    const rows = await sql`
      SELECT name, message, created_at
      FROM wishes
      ORDER BY created_at DESC
    `;
    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/wishes:", err);
    return NextResponse.json(
      { error: "Failed to fetch wishes." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = (body.name ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required." },
        { status: 400 }
      );
    }

    await ensureTable();
    const sql = getDb();
    await sql`
      INSERT INTO wishes (name, message)
      VALUES (${name}, ${message})
    `;

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("POST /api/wishes:", err);
    return NextResponse.json(
      { error: "Failed to save wish." },
      { status: 500 }
    );
  }
}
