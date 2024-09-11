import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2, Eye, Copy, Edit, Trash2, X } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ComponentList = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedComponent, setExpandedComponent] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch('https://uiforge-sage.vercel.app/api/components');
        if (!response.ok) throw new Error('Failed to fetch components');
        const data = await response.json();
        setComponents(data);
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
      alert('Code copied to clipboard!');
    });
  };

  const handleDelete = (id) => {
    console.log('Delete component with id:', id);
  };

  const handleEdit = (id) => {
    console.log('Edit component with id:', id);
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-gray-200">Loading...</div>;
  if (error) return <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>;

  return (
    <div className="container mx-auto px-4 py-8 bg-background text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-100">UI Components</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {components.map((component) => (
          <Card key={component._id} className={`${expandedComponent === component._id ? 'col-span-full' : ''} transition-all duration-300 bg-gray-800 border-gray-700`}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center text-gray-100">
                <span className="truncate">{component.componentName}</span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => toggleExpand(component._id)} className="text-gray-300 hover:text-gray-100">
                    {expandedComponent === component._id ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(component._id)} className="text-gray-300 hover:text-gray-100">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(component._id)} className="text-gray-300 hover:text-gray-100">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {component.tech.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-gray-700 text-gray-200">{tech}</Badge>
                ))}
              </div>
              <div className="italic text-gray-400">Code hidden</div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <Button variant="outline" size="sm" onClick={() => openCodeModal(component)} className="w-full sm:w-auto bg-gray-700 text-gray-200 hover:bg-gray-600">
                <Eye className="h-4 w-4 mr-2" /> View Code
              </Button>
              <span className="text-sm text-gray-400">Created: {new Date(component.createdAt).toLocaleDateString()}</span>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isCodeModalOpen} onOpenChange={setIsCodeModalOpen}>
        <DialogContent className="max-w-[95vw] w-full sm:max-w-4xl bg-gray-800 text-gray-200 p-0">
          <DialogHeader className="px-4 py-2 border-b border-gray-700">
            <DialogTitle className="flex justify-between items-center text-gray-100">
              <span className="truncate">{selectedComponent?.componentName}</span>
              <Button variant="ghost" size="icon" onClick={() => setIsCodeModalOpen(false)} className="text-gray-300 hover:text-gray-100">
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
            <div className="max-h-[60vh] overflow-auto mt-8">
              <SyntaxHighlighter 
                language="jsx" 
                style={vscDarkPlus} 
                showLineNumbers={true}
                wrapLines={true}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  backgroundColor: '#1e1e1e',
                }}
              >
                {selectedComponent?.componentCode || ''}
              </SyntaxHighlighter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComponentList;