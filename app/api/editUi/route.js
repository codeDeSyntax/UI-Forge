import component from "@/models/ui-model";
import clientPromise from "@/lib/mongoclient";
import { NextResponse } from "next/server";

//edit component
export const editComponent = async (req, res) => {
    const db = await clientPromise;
    try {
        const { id, componentName, componentCode, componentImage, tags } = JSON.parse(req.body);
        await db.collection("uiComponent").updateOne(
            { _id: new ObjectId(id) },
            { $set: { componentName, componentCode, componentImage, tags } }
        );
        NextResponse.json({ message: "Component updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating component", error });
    }
};
