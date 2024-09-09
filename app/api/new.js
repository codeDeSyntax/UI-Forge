import { ObjectId } from "mongodb";
import component from "@/models/ui-model";
import clientPromise from "@/lib/mongoclient";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();

  if (req.method === "POST") {
    // Handle POST request to add a new component
    try {
      const { componentName, componentCode, componentImage, tags } = JSON.parse(req.body);
      const newComponent = new component({ componentName, componentCode, componentImage, tags });
      await db.collection("uiComponent").insertOne(newComponent);

      return res.status(201).json(newComponent);
    } catch (error) {
      return res.status(500).json({ message: "Error creating component", error });
    }
  } 



 

 

  // If method is not supported
  return res.status(405).json({ message: "Method not allowed" });
}
