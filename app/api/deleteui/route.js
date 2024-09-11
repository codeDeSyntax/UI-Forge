import component from "@/models/ui-model";
import clientPromise from "@/lib/mongoclient";

//delete component

export const deleteComponent = async (req, res) => {
    const client = await clientPromise();
    const db = client.db();
    // const ObjectId = require("mongodb").ObjectId;
    if (req.method === "DELETE") {
        // Handle DELETE request to remove a component
        try {
          const { id } = JSON.parse(req.body);
          const result = await db.collection("uiComponent").deleteOne({ _id: new ObjectId(id) });
    
          if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Component not found" });
          }
    
          return res.status(200).json({ message: "Component deleted" });
        } catch (error) {
          return res.status(500).json({ message: "Error deleting component", error });
        }
      }
};