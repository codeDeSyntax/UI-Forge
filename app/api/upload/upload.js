// import { NextResponse } from 'next/server';
// import cloudinary from '@/utils/cloudinary';

// export async function POST(req) {
//   const formData = await req.formData();
//   const file = formData.get('file'); // Get the uploaded file from form data

//   try {
//     // Upload the file to Cloudinary
//     const uploadedImage = await cloudinary.uploader.upload(file, {
//       folder: 'uploads', // Specify a folder if needed
//     });

//     // Return the URL of the uploaded image
//     return NextResponse.json({ url: uploadedImage.secure_url });
//   } catch (error) {
//     return NextResponse.json({ message: 'Error uploading image', error }, { status: 500 });
//   }
// }
