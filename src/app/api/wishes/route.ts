import { NextResponse } from "next/server";
import { getDb, ensureTable } from "@/lib/db";

export async function GET() {
  try {
    await ensureTable();
    const sql = getDb();
    const rows = await sql`
      SELECT name, message, attending, headcount, created_at
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
    const attending = body.attending !== false; // default true
    const headcount = Math.max(1, Math.min(20, parseInt(body.headcount) || 1));

    if (!name) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    await ensureTable();
    const sql = getDb();
    await sql`
      INSERT INTO wishes (name, message, attending, headcount)
      VALUES (${name}, ${message}, ${attending}, ${headcount})
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
