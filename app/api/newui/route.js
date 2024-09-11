import { ObjectId } from "mongodb";
import component from "@/models/ui-model";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongoclient";

// Named export for POST method
export async function POST(req) {
  const client = await clientPromise;
  const db = client.db();

  try {
    const { componentName, componentCode, componentImages,tech } = await req.json(); // Parse the JSON request body
    const newComponent = new component({
      componentName,
      componentCode,
      componentImages,
      tech
    });
    await db.collection("uiComponent").insertOne(newComponent);

    return NextResponse.json(newComponent);
  } catch (error) {
    return NextResponse.json({ message: "Error creating component", error });
  }
}

// Other methods like GET can also be added as named exports if needed
