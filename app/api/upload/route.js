import multiparty from "multiparty";
import cloudinary from "@/utils/cloudinary";

const handle = async (req, res) => {
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  // Upload images to cloudinary
  const images = await Promise.all(
    files.images.map((image) => cloudinary.uploader.upload(image.path))
  );
  const links = images.map((image) => image.secure_url);
  res.status(200).json({ links });
};

export const config = {
  // Disable body parser so we can read the file
  api: {
    bodyParser: false,
  },
};

export default handle;
