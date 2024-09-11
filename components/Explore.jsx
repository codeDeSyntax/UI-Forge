import React from "react";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminWelcomeBanner = ({ onClose }) => {
  return (
    <div className="bg-gradient-to-r from-[#0c253a] to-[#181f45] p-4 sm:p-6 rounded-lg shadow-md border border-[#0a4481] ">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="flex-grow mr-4">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-[#52a9ff] ">
            Welcome to the Admin Dashboard
          </h2>
          <p className="text-sm sm:text-base text-[#4894e3]">
            Easily manage and upload new components to enhance your application.
          </p>
        </div>
        <div className="flex items-center mt-4 sm:mt-0">
          <Button className="mr-2 text-sm text-[#52a9ff]  bg-[#0c253a] border border-[#0a4481]">
            <Upload className="h-4 w-4 mr-2 text-[#0a4481]" />
            Upload Component
          </Button>
          <Button variant="ghost" onClick={onClose} className="p-1">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminWelcomeBanner;
