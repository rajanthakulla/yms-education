'use client';

import { useState, useRef } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Image' }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setIsUploading(true);
    
    // Create local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setPreview(data.url);
      onChange(data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
      setPreview(value); // Revert on failure
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-bold text-[#1B2A6B] mb-2">{label} *</label>
      
      <div 
        className={`relative border-2 border-dashed rounded-xl p-6 transition-colors text-center cursor-pointer ${
          isDragging ? 'border-[#E8192C] bg-red-50' : 'border-gray-300 hover:border-[#1B2A6B] hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleChange} 
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center justify-center py-4">
            <span className="material-symbols-outlined animate-spin text-4xl text-[#E8192C] mb-2">progress_activity</span>
            <p className="text-sm font-bold text-gray-500">Uploading...</p>
          </div>
        ) : preview ? (
          <div className="relative group">
            <div className="relative h-48 w-full max-w-sm mx-auto rounded-lg overflow-hidden bg-gray-200 border border-gray-300">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
              <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2">
                <span className="material-symbols-outlined">edit</span> Change Image
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 bg-[#1B2A6B]/10 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-3xl text-[#1B2A6B]">cloud_upload</span>
            </div>
            <p className="font-bold text-[#1B2A6B] mb-1">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
          </div>
        )}
      </div>
      
      {/* Hidden input to maintain form state compatibility if needed */}
      <input type="hidden" value={value} />
    </div>
  );
}
