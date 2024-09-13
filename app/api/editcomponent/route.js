import { ObjectId } from "mongodb";

const allowedOrigin = process.env.NODE_ENV === 'production' 
  ? 'https://uiforge-sage.vercel.app/api/editcomponent'  // Use your real domain
  : 'http://localhost:3000';  // Use localhost for development

export const editComponent = async (req, res) => {
  // Set CORS headers dynamically
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const db = await clientPromise;
  try {
    const { id, componentName, componentCode, componentImage, tech } = await req.json();

    const objectId = new ObjectId(id); 

    // Update the component in MongoDB
    await db.collection("uiComponent").updateOne(
      { _id: objectId },
      { $set: { componentName, componentCode, componentImage, tech } }
    );

    return NextResponse.json({ message: "Component updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating component", error });
  }
};
