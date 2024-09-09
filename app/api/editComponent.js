import component from "@/models/ui-model";
import clientPromise from "@/lib/mongoclient";

//edit component
export const editComponent = async (req, res) => {
    const db = await clientPromise;
    try {
        const { id, componentName, componentCode, componentImage, tags } = JSON.parse(req.body);
        await db.collection("uiComponent").updateOne(
            { _id: new ObjectId(id) },
            { $set: { componentName, componentCode, componentImage, tags } }
        );
        res.status(200).json({ message: "Component updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating component", error });
    }
};
