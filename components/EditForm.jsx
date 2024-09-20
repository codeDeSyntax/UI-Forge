"use client";
import React, { useState, useCallback, useEffect } from "react";
import { Plus, X, Image as ImageIcon, Loader, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Image } from "cloudinary-react";
import {
  FaReact,
  FaVuejs,
  FaAngular,
  FaNodeJs,
  FaPython,
  FaJava,
  FaPhp,
  FaDocker,
  FaTrash,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiRubyonrails,
  SiDjango,
  SiFlask,
  SiSpring,
  SiLaravel,
  SiExpress,
} from "react-icons/si";

const techIcons = [
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Vue", icon: FaVuejs, color: "#42b883" },
  { name: "Angular", icon: FaAngular, color: "#DD0031" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Python", icon: FaPython, color: "#3776AB" },
  { name: "Java", icon: FaJava, color: "#007396" },
  { name: "Ruby on Rails", icon: SiRubyonrails, color: "#CC0000" },
  { name: "Django", icon: SiDjango, color: "#092E20" },
  { name: "Flask", icon: SiFlask, color: "#000000" },
  { name: "Spring", icon: SiSpring, color: "#6DB33F" },
  { name: "PHP", icon: FaPhp, color: "#777BB4" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "Express", icon: SiExpress, color: "#f5f5f5" },
  { name: "Docker", icon: FaDocker, color: "#2496ED" },
];

export const EditForm = ({ component }) => {
  const [componentName, setComponentName] = useState(component.componentName);
  const [componentCode, setComponentCode] = useState(component.componentCode);
  const [componentImages, setComponentImages] = useState(component.componentImages);
  const [description, setDescription] = useState(component?.description);
  const [tech, setTech] = useState(component.tech);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      setFilename(selectedFile.name);
    }
  }, []);

  const handleImageUpload = useCallback((event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilename(selectedFile.name);
    }
  }, []);

  const handleImageSubmit = useCallback(async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mbadmlib");

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_API_URL,
        formData
      );
      const newImageUrl = response.data.secure_url;
      setComponentImages((prevImages) => [...prevImages, newImageUrl]);
      setFile(null);
      setFilename("");
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  }, [file]);

  const removeImage = useCallback((index) => {
    setComponentImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  }, []);

  const toggleTech = useCallback((techName) => {
    setTech((prevTech) =>
      prevTech.includes(techName)
        ? prevTech.filter((t) => t !== techName)
        : [...prevTech, techName]
    );
  }, []);

  const handleSave = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await axios.patch(
          "/api/editcomponent",
          {
            id: component._id,
            componentName,
            componentCode,
            description,
            componentImages,
            tech,
          }
        );
        setShowSuccess(true);
      } catch (error) {
        console.error("Error updating UI component:", error);
      }
    },
    [component._id, componentName, description, componentCode, componentImages, tech]
  );

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <form
      onSubmit={handleSave}
      className="space-y-8 mx-auto pt-4 sm:p-6 bg-background shadow-lg rounded-xl max-w-4xl h-[450px] overflow-y-scroll no-scrollbar"
    >
      <div className="space-y-4">
        <label
          htmlFor="componentName"
          className="block text-sm font-semibold text-gray-400"
        >
          Component Name
        </label>
        <input
          type="text"
          id="componentName"
          value={componentName}
          onChange={(e) => setComponentName(e.target.value)}
          className="w-full px-4 py-3 text-gray-200 bg-secondary border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          required
        />
      </div>

      <div className="space-y-4">
        <label
          htmlFor="componentCode"
          className="block text-sm font-semibold text-gray-400"
        >
          Component Code
          {componentCode.length > 0
            ? ` (${componentCode.length} characters)`
            : ""}
        </label>
        <textarea
          id="componentCode"
          value={componentCode}
          onChange={(e) => setComponentCode(e.target.value)}
          rows={8}
          className="w-full px-4 py-3 text-gray-200 font-mono bg-secondary border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 resize-none"
          required
        />
      </div>

      <div className="space-y-4">
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-gray-400"
        >
          Desciption
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={8}
          className="w-full px-4 py-3 text-gray-200 font-mono bg-secondary border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 resize-none"
          required
        />
      </div>

      <div className="space-y-4">
        <label
          htmlFor="componentImages"
          className="block text-sm font-semibold text-gray-400"
        >
          Component Images
        </label>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition duration-200 ${
            dragActive
              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900"
              : "border-gray-500 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400"
          }`}
        >
          <div className="space-y-1 text-center">
            {filename ? (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {filename}
              </div>
            ) : (
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            )}
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white px-2 dark:bg-gray-800 rounded-md font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload an image</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleImageSubmit}
          className="mt-2 w-full inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
          disabled={uploading}
        >
          {uploading ? (
            <Loader className="animate-spin h-5 w-5 mr-3" />
          ) : (
            <Plus className="h-5 w-5 mr-2" />
          )}
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <AnimatePresence>
            {componentImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group"
              >
                <Image
                  cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                  publicId={image}
                  width="100"
                  height="100"
                  crop="fill"
                  className="rounded-lg w-full h-full object-cover"
                  alt=""
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Technologies
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {techIcons.map(({ name, icon: Icon, color }) => (
            <button
              key={name}
              type="button"
              onClick={() => toggleTech(name)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200 ${
                tech.includes(name)
                  ? `bg-[rgba(0,0,0,0.5)]  text-[#FAFAFA]`
                  : `bg-[rgba(0,0,0,0.8)] text-gray-600 hover:bg-gray-700 hover:text-[#FAFAFA]`
              }`}
            >
              <Icon className="w-8 h-8 mb-2" color={color} />
              <span className={`text-xs text-center `}>{name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Selected Technologies
        </label>
        <div className="flex flex-wrap gap-2">
          {tech.map((techItem) => (
            <span
              key={techItem}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
            >
              {techItem}
              <button
                type="button"
                onClick={() => toggleTech(techItem)}
                className="ml-2 inline-flex items-center justify-center w-4 h-4 text-indigo-400 hover:text-indigo-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-secondary text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 text-lg font-semibold"
      >
        Update Component
      </button>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed bottom-40 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center"
          >
            <Check className="w-5 h-5 mr-2" />
            Component updated successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};