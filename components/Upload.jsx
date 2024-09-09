import React, { useState } from "react";
import { Plus, Upload, X } from "lucide-react";
import { motion } from "framer-motion";

const InputField = ({ label, id, value, onChange, type = "text", className = "", ...props }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ${className}`}
      {...props}
    />
  </div>
);

const Tag = ({ tag, onRemove }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
  >
    {tag}
    <button
      type="button"
      onClick={onRemove}
      className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full bg-indigo-200 dark:bg-indigo-800 hover:bg-indigo-300 dark:hover:bg-indigo-700 transition-colors duration-200"
    >
      <X className="w-3 h-3 text-indigo-600 dark:text-indigo-300" />
    </button>
  </motion.span>
);

export const UploadForm = ({ onSubmit }) => {
  const [componentName, setComponentName] = useState("");
  const [componentCode, setComponentCode] = useState("");
  const [componentImage, setComponentImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");

  const handleImageUpload = (e) => setComponentImage(e.target.files[0]);
  const handleTagAdd = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ componentName, componentCode, componentImage, tags });
    setComponentName("");
    setComponentCode("");
    setComponentImage(null);
    setTags([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <InputField
        label="Component Name"
        id="componentName"
        value={componentName}
        onChange={(e) => setComponentName(e.target.value)}
        required
      />

      <div className="space-y-2">
        <label htmlFor="componentCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Component Code
        </label>
        <textarea
          id="componentCode"
          value={componentCode}
          onChange={(e) => setComponentCode(e.target.value)}
          rows={10}
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 resize-none"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="componentImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Component Image
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400 transition duration-200">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600 dark:text-gray-400">
              <label
                htmlFor="componentImage"
                className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input id="componentImage" name="componentImage" type="file" className="sr-only" onChange={handleImageUpload} />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tags
        </label>
        <div className="flex">
          <input
            type="text"
            id="tags"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            placeholder="Add tags"
          />
          <button
            type="button"
            onClick={handleTagAdd}
            className="px-4 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Tag key={index} tag={tag} onRemove={() => setTags(tags.filter((_, i) => i !== index))} />
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 transform hover:scale-105"
        >
          Upload Component
        </button>
      </div>
    </form>
  );
};

export default UploadForm;