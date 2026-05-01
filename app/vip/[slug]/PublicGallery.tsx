"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from '@/lib/supabase/client';

export default function PublicGallery({ eventId, initialImages, activeTheme }: { eventId: string, initialImages: any[], activeTheme: any }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploading(true);
    setUploadSuccess(false);
    
    try {
      const supabase = createClient();
      
      // 1. Generate unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${eventId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // 2. Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('event_images')
        .upload(fileName, file);
        
      if (uploadError) throw uploadError;
      
      // 3. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('event_images')
        .getPublicUrl(fileName);
        
      // 4. Insert into gallery_images (defaults to is_approved: true per schema, or false if we changed it. We will explicitly set is_approved: false so admin must approve)
      const { error: insertError } = await supabase
        .from('gallery_images')
        .insert({
          event_id: eventId,
          image_url: publicUrl,
          is_approved: false
        });
        
      if (insertError) throw insertError;
      
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
      
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h3 className="font-display text-4xl mb-4" style={{ color: activeTheme.textColor }}>Event Gallery</h3>
        <p className="font-editorial text-lg mb-8" style={{ color: activeTheme.accentColor }}>Relive the magic of the day.</p>
        
        {/* Upload Button */}
        <div className="flex flex-col items-center justify-center gap-3">
          <input 
            type="file" 
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:opacity-80 transition-opacity flex items-center gap-2"
            style={{ backgroundColor: activeTheme.accentColor, color: activeTheme.bgColor }}
          >
            {uploading ? (
              <span className="animate-pulse">Uploading...</span>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Upload a Photo
              </>
            )}
          </button>
          
          <AnimatePresence>
            {uploadSuccess && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm font-bold text-green-600 mt-2">
                Photo submitted! It will appear once approved.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {initialImages && initialImages.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {initialImages.map((img) => (
            <div 
              key={img.id} 
              className="relative break-inside-avoid overflow-hidden rounded group cursor-pointer"
              onClick={() => setSelectedImage(img.image_url)}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10"></div>
              <img 
                src={img.image_url} 
                alt="Event moment" 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
          <p className="text-gray-500 font-editorial text-lg">No photos have been published yet.</p>
          <p className="text-sm text-gray-400 mt-2">Be the first to upload a memory!</p>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-[var(--color-rose-gold)] transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="max-w-full max-h-[90vh] object-contain rounded"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
