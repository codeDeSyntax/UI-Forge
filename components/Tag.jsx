// components/Tag.js
import { X } from "lucide-react";

export const Tag = ({ tag, onRemove }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-indigo-100">
    {tag}
    <button
      type="button"
      onClick={onRemove}
      className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 dark:hover:bg-indigo-600"
    >
      <X className="h-3 w-3" />
    </button>
  </span>
);
