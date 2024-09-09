// components/ComponentList.js
export const ComponentList = ({ components }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {components.map((component, index) => (
        <div key={index} className="border rounded-lg p-6 shadow-sm dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {component.componentName}
          </h3>
          {component.componentImage && <img src="/api/placeholder/400/300" alt={component.componentName} className="mt-4 h-40 object-cover rounded-md" />}
          <pre className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
            <code>{component.componentCode}</code>
          </pre>
        </div>
      ))}
    </div>
  );
  