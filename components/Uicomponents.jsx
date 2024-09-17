import React, { useState, useEffect } from "react";
import {
  Maximize2,
  Minimize2,
  Eye,
  Copy,
  Edit,
  Trash2,
  X,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { EditForm } from "./EditForm";
import { SkeletonCard } from "./Preview";

const ComponentList = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedComponent, setExpandedComponent] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isEditing , setIsEditing] = useState(false);
  const [showImages, setShowImages] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch(
          "https://uiforge-sage.vercel.app/api/components"
        );
        if (!response.ok) throw new Error("Failed to fetch components");
        const data = await response.json();
        setComponents(data);
        const initialShowImages = {};
        const initialCurrentImageIndex = {};
        data.forEach((component) => {
          initialShowImages[component._id] = true;
          initialCurrentImageIndex[component._id] = 0;
        });
        setShowImages(initialShowImages);
        setCurrentImageIndex(initialCurrentImageIndex);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComponents();
  }, []);

  const toggleExpand = (id) => {
    setExpandedComponent(expandedComponent === id ? null : id);
  };

  const openCodeModal = (component) => {
    setSelectedComponent(component);
    setIsCodeModalOpen(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Code copied to clipboard!");
    });
  };

  const handleDelete = (id) => {
    console.log("Delete component with id:", id);
  };

  const saveUpdate = (id) => {
    console.log("Edit component with id:", id);
  };
  
  const handleEdit = (id) => {
    setIsEditing(true);
    setSelectedComponent(components.find((c) => c._id === id));
  }

  const toggleImages = (id) => {
    setShowImages((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const nextImage = (id) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]:
        (prev[id] + 1) %
        components.find((c) => c._id === id).componentImages.length,
    }));
  };

  const prevImage = (id) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]:
        (prev[id] -
          1 +
          components.find((c) => c._id === id).componentImages.length) %
        components.find((c) => c._id === id).componentImages.length,
    }));
  };

  if (loading)
    return (
      <div className="flex justify-start items-center h-screen text-gray-200">
        <SkeletonCard/>
      </div>
    );
  if (error)
    return (
      <div className="bg-red-500 text-white p-4 rounded-md">    
        <h2 className="font-bold text-lg">Error</h2>
        <p>{error}</p>
      </div>
    );

  return (
    <div className="container mx-auto px-2 py-8 bg-background text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-100">UI Components</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {components.map((component) => (
          <div
            key={component._id}
            className={` bg-accent border border-gray-700 rounded-lg shadow-md hover:shadow-lg hover:border-gray-600 transition-all duration-300  flex flex-col `}
          >
            <div className="p-4 border-b border-gray-700">
              <div className="flex justify-between items-center text-gray-100">
                <span className="font-bold truncate">
                  {component.componentName}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleImages(component._id)}
                    className="text-gray-300 hover:text-gray-100 p-1"
                    title={
                      showImages[component._id] ? "Hide Images" : "Show Images"
                    }
                  >
                    <ImageIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => toggleExpand(component._id)}
                    className="text-gray-300 hover:text-gray-100 p-1"
                    title={
                      expandedComponent === component._id
                        ? "Minimize"
                        : "Expand"
                    }
                  >
                    {expandedComponent === component._id ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(component._id)}
                    className="text-gray-300 hover:text-gray-100 p-1"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(component._id)}
                    className="text-gray-300 hover:text-gray-100 p-1"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 flex-grow overflow-hidden">
              <div className="flex flex-wrap gap-2 mb-4">
                {component.tech.map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-700 text-gray-200 px-2 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {showImages[component._id] &&
              component.componentImages &&
              component.componentImages.length > 0 ? (
                <div className="relative  mt-4">
                  <img
                    src={
                      component.componentImages[
                        currentImageIndex[component._id]
                      ]
                    }
                    alt={`${component.componentName} preview`}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-1 rounded-full"
                    onClick={() => prevImage(component._id)}
                  >
                    <ChevronLeft className="h-4 w-4 text-white" />
                  </button>
                  <button
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-1 rounded-full"
                    onClick={() => nextImage(component._id)}
                  >
                    <ChevronRight className="h-4 w-4 text-white" />
                  </button>
                </div>
              ) : (
                <div className="italic text-gray-400">
                  Code and images hidden
                </div>
              )}
            </div>
            <div className="p-4 space-y-2">
              <button
                onClick={() => openCodeModal(component)}
                className="w-full bg-gray-700 text-gray-200 hover:bg-gray-600 py-2 px-4 rounded-md flex items-center justify-center"
              >
                <Eye className="h-4 w-4 mr-2" /> View Code
              </button>
              <div className="w-full px-3 py-1 bg-gray-700 rounded text-center">
                <span className="text-sm text-gray-300">
                  Created: {new Date(component.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>


      <Dialog open={isCodeModalOpen} onOpenChange={setIsCodeModalOpen}>
        <DialogContent className="max-w-[95vw] w-full sm:max-w-4xl bg-gray-800 text-gray-200 p-0">
          <DialogHeader className="px-4 py-2 border-b border-gray-700">
            <DialogTitle className="flex justify-between items-center text-gray-100">
              <span className="truncate">
                {selectedComponent?.componentName}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCodeModalOpen(false)}
                className="text-gray-300 hover:text-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="relative p-4">
            <Button
              className="absolute top-6 right-6 z-10"
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(selectedComponent?.componentCode)}
            >
              <Copy className="h-4 w-4 mr-2" /> Copy
            </Button>
            <div className="max-h-[60vh] overflow-auto mt-8" >
              <SyntaxHighlighter
                language="jsx"
                style={vscDarkPlus}
                showLineNumbers={true}
                wrapLines={true}
                customStyle={{
                  margin: 0,
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  backgroundColor: "#1e1e1e",
                }}
              >
                {selectedComponent?.componentCode || ""}
              </SyntaxHighlighter>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-[95vw] w-full sm:max-w-4xl bg-background text-gray-200 p-0">
          <DialogHeader className="px-4 py-2 border-b border-gray-700">
            <DialogTitle className="flex justify-between items-center text-gray-100">
              <span className="truncate">
                {selectedComponent?.componentName}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(false)}
                className="text-gray-300 hover:text-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <EditForm component={selectedComponent} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComponentList;
