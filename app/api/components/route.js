import clientPromise from "@/lib/mongoclient";
import { NextResponse } from "next/server";

export async function GET() {
  // Test with a simple JSON response
//   return NextResponse.json({ randomMessage: 'Welcome to testing API on the browser' });
  try {
    const client = await clientPromise;
    const db = client.db();
    const components = await db.collection("uiComponent").find({}).toArray();
    return NextResponse.json(components);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching components", error: error.message });
  }
}
