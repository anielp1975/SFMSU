import { NextResponse } from "next/server";

const UPSTREAM_URL = "http://www.sunrisefmsuriname.cloud/listen/sunrisefm/radio.mp3";

export async function GET() {
  try {
    const upstream = await fetch(UPSTREAM_URL, { cache: "no-store" });

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json({ error: "Stream niet beschikbaar" }, { status: 502 });
    }

    const contentType = upstream.headers.get("content-type") ?? "audio/mpeg";

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error("Stream proxy failed", error);
    return NextResponse.json({ error: "Stream niet bereikbaar" }, { status: 502 });
  }
}
