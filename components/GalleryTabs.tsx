"use client";

import { useState, useMemo } from "react";
// ✅ Using MasonryPhotoAlbum for that specific editorial grid
import { MasonryPhotoAlbum } from "react-photo-album"; 
import "react-photo-album/masonry.css"; 
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion, AnimatePresence } from "framer-motion";
import type { Photo } from "../lib/photos";

interface GalleryTabsProps {
  initialPhotos: Photo[];
  initialVideos: Photo[];
}

const categories = ["ALL", "KIDS", "MATERNITY", "FAMILY", "CAKE SMASH"];

export default function GalleryTabs({ initialPhotos, initialVideos }: GalleryTabsProps) {
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [index, setIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // ✅ Search and Filter Logic
  const filteredMedia = useMemo(() => {
    const currentData = activeTab === "photos" ? initialPhotos : initialVideos;
    
    return (currentData || [])
      .filter((item) => {
        const matchesSearch = 
          item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.category?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = 
          categoryFilter === "ALL" || 
          item.category?.toUpperCase() === categoryFilter;
        
        return matchesSearch && matchesCategory;
      })
      .map((p) => ({
        ...p,
        key: p.id,
        src: p.src,
        width: 800, 
        height: parseInt(p.aperture) || (Math.random() > 0.5 ? 700 : 1000),
        alt: p.alt || "Gallery Image",
      }));
  }, [activeTab, initialPhotos, initialVideos, searchQuery, categoryFilter]);

  return (
    <div className="w-full">
      <div className="gallery-tabs-nav">
        {["photos", ""].map((tab) => (
          <button
            key={tab}
            onClick={() => { 
              setActiveTab(tab as any); 
              setCategoryFilter("ALL"); 
              setSearchQuery("");
            }}
            className={`gallery-tab-btn ${activeTab === tab ? "active" : ""}`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="galleryUnderline" 
                className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#C8A988]" 
              />
            )}
          </button>
        ))}
      </div>

      {/* 2. SEARCH & FILTER SECTION */}
      <div className="max-w-[1200px] mx-auto px-6 mb-16 gallery-filter-wrap">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between border-b border-white/5 pb-10">
          
          {/* Minimalist Search Field */}
          {/* <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="SEARCH MOMENTS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="gallery-search-input"
            />
          </div> */}

          {/* Category Filter Buttons
          <div className="category-filter-list flex gap-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-[10px] tracking-[3px] uppercase font-bold transition-all whitespace-nowrap ${
                  categoryFilter === cat ? "text-[#C8A988]" : "text-white/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div> */}
        </div>
      </div>

      {/* 3. GRID DISPLAY AREA */}
      <div className="pt-4">
        <AnimatePresence mode="wait">
          {activeTab === "photos" ? (
            <motion.div
              key={`photos-${categoryFilter}-${searchQuery}`}
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-[1600px] mx-auto px-6"
            >
              {filteredMedia.length > 0 ? (
                <MasonryPhotoAlbum
                  photos={filteredMedia}
                  spacing={15}
                  // ✅ Desktop: 3 on a row
                  columns={(w) => (w < 600 ? 1 : w < 1100 ? 2 : 3)}
                  onClick={({ index }) => setIndex(index)}
                  renderPhoto={({ photo, wrapperProps, imageProps }) => {
                    // Safety check to prevent undefined errors
                    if (!photo) return null;
                    return (
                      <div 
                        {...wrapperProps} 
                        className="latestimg-box relative group cursor-pointer overflow-hidden mb-[15px]"
                      >
                        <img 
                          {...imageProps} 
                          alt={photo.alt}
                          className="latestimg transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                          style={{ ...imageProps.style, display: 'block', width: '100%' }}
                        />
                        
                        {/* Novo Style Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-8">
                          <div className="text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-white font-serif text-3xl mb-2">{(photo as any).title}</h3>
                            <div className="w-8 h-[1px] bg-[#C8A988] mx-auto mb-2"></div>
                            <p className="text-[#C8A988] text-[9px] uppercase tracking-[4px]">{(photo as any).category}</p>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                />
              ) : (
                <div className="text-center py-40 text-white/10 uppercase tracking-[5px] text-xs">
                  No matching treasures found
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`videos-${categoryFilter}-${searchQuery}`}
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1600px] mx-auto px-6"
            >
              {filteredMedia.map((video) => (
                <div key={video.id} className="video-grid-card group">
                  <div className="relative aspect-video overflow-hidden bg-black mb-4">
                    <video 
                      src={video.src} 
                      controls 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                  <div className="text-left px-2">
                    <span className="eyebrow !text-[10px] !mb-1 text-[#C8A988]">{video.category}</span>
                    <h3 className="text-white font-serif text-xl tracking-wide">{video.title}</h3>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox Preview */}
      <Lightbox
        index={index}
        slides={filteredMedia}
        open={index >= 0}
        close={() => setIndex(-1)}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.95)" } }}
      />
    </div>
  );
}