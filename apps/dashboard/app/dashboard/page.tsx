'use client';

import { useState } from 'react';

// Types for our MVP data
interface Project {
  id: string;
  name: string;
  domain: string;
  status: 'connected' | 'pending' | 'error';
  apiKey: string;
  createdAt: string;
}

interface Template {
  id: string;
  name: string;
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  fontFamily: string;
  borderRadius: string;
  spacing: string;
  isActive: boolean;
}

interface ComponentProps {
  // Card props
  showImage?: boolean;
  borderStyle?: 'rounded' | 'minimal' | 'sharp';
  shadowDepth?: 'light' | 'medium' | 'heavy' | 'none';
  backgroundColor?: string;
  // Button props
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outlined' | 'text' | 'primary';
  borderRadius?: string;
  // Alert props
  showIcon?: boolean;
  dismissible?: boolean;
  severity?: 'success' | 'error' | 'warning' | 'info';
}

interface Component {
  id: string;
  name: string;
  type: 'card' | 'button' | 'alert' | 'header' | 'footer';
  description: string;
  variant: string;
  props: ComponentProps;
  createdAt: string;
  isActive: boolean;
}

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Main Website',
    domain: 'example.com',
    status: 'connected',
    apiKey: 'uk_test_1234567890abcdef',
    createdAt: '2024-12-01'
  },
  {
    id: '2', 
    name: 'Blog Site',
    domain: 'blog.example.com',
    status: 'pending',
    apiKey: 'uk_test_0987654321fedcba',
    createdAt: '2024-12-02'
  }
];

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Default Theme',
    backgroundColor: '#ffffff',
    primaryColor: '#3b82f6',
    secondaryColor: '#64748b',
    textColor: '#1f2937',
    fontFamily: 'Inter',
    borderRadius: '8px',
    spacing: '16px',
    isActive: true
  },
  {
    id: '2',
    name: 'Dark Theme',
    backgroundColor: '#1f2937',
    primaryColor: '#60a5fa',
    secondaryColor: '#9ca3af',
    textColor: '#f9fafb',
    fontFamily: 'Inter',
    borderRadius: '12px',
    spacing: '20px',
    isActive: false
  }
];

const mockComponents: Component[] = [
  {
    id: '1',
    name: 'Hero Card',
    type: 'card',
    description: 'Large featured card with image and call-to-action',
    variant: 'hero',
    props: {
      showImage: true,
      borderStyle: 'rounded',
      shadowDepth: 'medium',
      backgroundColor: '#ffffff'
    },
    createdAt: '2024-12-01',
    isActive: true
  },
  {
    id: '2',
    name: 'News Card',
    type: 'card',
    description: 'Compact card for news articles and blog posts',
    variant: 'news',
    props: {
      showImage: true,
      borderStyle: 'minimal',
      shadowDepth: 'light',
      backgroundColor: '#f9fafb'
    },
    createdAt: '2024-12-02',
    isActive: false
  },
  {
    id: '3',
    name: 'Primary Button',
    type: 'button',
    description: 'Main call-to-action button with primary styling',
    variant: 'primary',
    props: {
      size: 'medium',
      variant: 'filled',
      borderRadius: '8px',
      backgroundColor: '#3b82f6'
    },
    createdAt: '2024-12-01',
    isActive: true
  },
  {
    id: '4',
    name: 'Success Alert',
    type: 'alert',
    description: 'Success message alert with icon',
    variant: 'success',
    props: {
      showIcon: true,
      dismissible: true,
      severity: 'success',
      backgroundColor: '#dcfce7'
    },
    createdAt: '2024-12-03',
    isActive: false
  }
];

type ActiveSection = 'dashboard' | 'projects' | 'templates' | 'components';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
  const [projects] = useState<Project[]>(mockProjects);
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [components, setComponents] = useState<Component[]>(mockComponents);
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);

  const renderDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Dashboard Overview
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Projects</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{projects.length}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Templates</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {templates.filter(t => t.isActive).length}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Components</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {components.filter(c => c.isActive).length}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => setActiveSection('projects')}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Manage Projects
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Add new websites, manage API keys, and monitor connection status.
          </p>
        </div>
        
        <div 
          onClick={() => setActiveSection('templates')}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Design Templates
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Configure colors, fonts, and layout settings for your design system.
          </p>
        </div>
        
        <div 
          onClick={() => setActiveSection('components')}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Build Components
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Create and customize reusable UI components for your websites.
          </p>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Connected Websites
        </h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Add New Project
        </button>
      </div>
      
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {project.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{project.domain}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  Created: {project.createdAt}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'connected' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : project.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <p className="text-sm text-gray-600 dark:text-gray-400">API Key:</p>
              <code className="text-sm font-mono text-gray-900 dark:text-white">
                {project.apiKey}
              </code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Design Templates
        </h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Create Template
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {template.name}
              </h3>
              {template.isActive && (
                <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs font-medium rounded">
                  Active
                </span>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Background Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-8 h-8 rounded border border-gray-300"
                      style={{ backgroundColor: template.backgroundColor }}
                    ></div>
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                      {template.backgroundColor}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-8 h-8 rounded border border-gray-300"
                      style={{ backgroundColor: template.primaryColor }}
                    ></div>
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                      {template.primaryColor}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Font Family
                  </label>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {template.fontFamily}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Border Radius
                  </label>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {template.borderRadius}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded border border-blue-200">
                Edit
              </button>
              {!template.isActive && (
                <button 
                  onClick={() => {
                    setTemplates(prev => prev.map(t => ({
                      ...t,
                      isActive: t.id === template.id
                    })));
                  }}
                  className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded border border-green-200"
                >
                  Activate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderComponents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          UI Components
        </h1>
        <div className="relative">
          <button 
            onClick={() => setShowCreateDropdown(!showCreateDropdown)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <span>Create Component</span>
            <span className={`transform transition-transform ${showCreateDropdown ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          
          {showCreateDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
              <div className="py-1">
                {['Card', 'Button', 'Alert', 'Header', 'Footer'].map((componentType) => (
                  <button
                    key={componentType}
                    onClick={() => {
                      setShowCreateDropdown(false);
                      // TODO: Handle component creation
                      console.log(`Creating ${componentType} component`);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    📄 {componentType}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {components.map((component) => (
          <div key={component.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {component.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    component.type === 'card' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                    component.type === 'button' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                    component.type === 'alert' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                  }`}>
                    {component.type}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {component.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Created: {component.createdAt}
                </p>
              </div>
              
              {component.isActive && (
                <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs font-medium rounded">
                  Active
                </span>
              )}
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Variant: {component.variant}
                </label>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Configuration:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(component.props).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{key}:</span>
                      <span className="font-mono text-gray-900 dark:text-white">
                        {typeof value === 'boolean' ? (value ? 'true' : 'false') : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded border border-blue-200">
                Edit
              </button>
              <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded border border-gray-200">
                Preview
              </button>
              {!component.isActive && (
                <button 
                  onClick={() => {
                    setComponents(prev => prev.map(c => ({
                      ...c,
                      isActive: c.id === component.id ? true : c.isActive
                    })));
                  }}
                  className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded border border-green-200"
                >
                  Activate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'projects':
        return renderProjects();
      case 'templates':
        return renderTemplates();
      case 'components':
        return renderComponents();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700 min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              UnityUI
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Design System
            </p>
          </div>
          
          <nav className="mt-6">
            <div className="px-6 space-y-2">
              <button
                onClick={() => setActiveSection('dashboard')}
                className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors ${
                  activeSection === 'dashboard'
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                📊 Dashboard
              </button>
              
              <button
                onClick={() => setActiveSection('projects')}
                className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors ${
                  activeSection === 'projects'
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                🌐 Projects
              </button>
              
              <button
                onClick={() => setActiveSection('templates')}
                className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors ${
                  activeSection === 'templates'
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                🎨 Templates
              </button>
              
              <button
                onClick={() => setActiveSection('components')}
                className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors ${
                  activeSection === 'components'
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                🧩 Components
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}