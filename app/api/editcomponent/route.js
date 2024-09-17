import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongoclient";
import { NextResponse } from "next/server";

export async function PUT(req, res) { // Or POST depending on your setup
    const client = await clientPromise;
    const db = client.db();
  try {
    const { id, componentName, componentCode, componentImages, tech } = await req.json();

    if (!id || !componentName || !componentCode || !tech) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const objectId = new ObjectId(id); 
    console.log(objectId);
    

    // Update the component in MongoDB
    await db.collection("uiComponent").updateOne(
      { _id: objectId },
      { $set: { componentName, componentCode, componentImages, tech } }
    );

    return NextResponse.json({ message: "Component updated successfully" });
  } catch (error) {
    console.error("Server error:", error); // Log the error on the server side
    return NextResponse.json({ message: "Error updating component", error });
  }
}
