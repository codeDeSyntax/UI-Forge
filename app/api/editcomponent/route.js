import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongoclient";
import { NextResponse } from "next/server";

export async function PATCH(req, res) {
    const client = await clientPromise;
    const db = client.db();

    try {
        const { id, componentName, componentCode, componentImages, tech, description } = await req.json();

        // Validate the ID is present
        if (!id) {
            return NextResponse.json({ message: "Missing required field: id" }, { status: 400 });
        }

        const objectId = new ObjectId(id);

        // Build the update object dynamically based on provided fields
        const updateData = {};
        if (componentName) updateData.componentName = componentName;
        if (componentCode) updateData.componentCode = componentCode;
        if (componentImages) updateData.componentImages = componentImages;
        if (tech) updateData.tech = tech;
        if (description) updateData.description = description;

        // If no fields are provided for update, return an error
        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ message: "No fields provided to update" }, { status: 400 });
        }

        // Update the component in MongoDB
        const result = await db.collection("uiComponent").updateOne(
            { _id: objectId },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: "Component not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Component updated successfully" });
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ message: "Error updating component", error: error.message }, { status: 500 });
    }
}
