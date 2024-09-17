import clientPromise from "@/lib/mongoclient";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const components = await db.collection("uiComponent").find({}).toArray();

    // Set Cache-Control header to prevent caching
    const headers = new Headers({
      'Cache-Control': 'no-store'
    });

    // Return the response with the header
    return NextResponse.json(components, { headers });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching components", error: error.message },
      { status: 500 }
    );
  }
}
