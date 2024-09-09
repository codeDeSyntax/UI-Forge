import component from "@/models/ui-model"
import clientPromise from "@/lib/mongoclient"

export default async function allComponents  () {
    const client = await clientPromise;
    const db = client.db();

    if (req.method === "GET") {
        // Handle GET request to fetch all components
        try {
          const components = await db.collection("uiComponent").find({}).toArray();
          return res.status(200).json(components);
        } catch (error) {
          return res.status(500).json({ message: "Error fetching components", error });
        }
      }
}

