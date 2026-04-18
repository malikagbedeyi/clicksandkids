"use client";

import { useState, useMemo } from "react";
import { MasonryPhotoAlbum } from "react-photo-album"; 
import "react-photo-album/masonry.css"; 
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion, AnimatePresence } from "framer-motion";

// const categories = ["ALL", "KIDS", "MATERNITY", "FAMILY", "CAKE SMASH"];
const categories = [""]

export default function LatestWorks({ initialPhotos }: { initialPhotos: any[] }) {
  const [index, setIndex] = useState<number>(-1);
  const [filter, setFilter] = useState<string>("ALL");

  const filteredPhotos = useMemo(() => {

    const filtered = filter === "ALL" 
      ? initialPhotos 
      : initialPhotos.filter(p => p.category?.toUpperCase() === filter);
    

    const topSix = filtered.slice(0, 6);
      
    return topSix.map((p) => ({
      src: p.src,
      width: p.width || 800, 
      height: p.height || (Math.random() > 0.5 ?700 : 900), 
      alt: p.alt || "Gallery Image",
      title: p.title || "Untitled",
      category: p.category || "Story"
    }));
  }, [filter, initialPhotos]);

  return (
   <section className="w-full py-32 bg-[#0A0A0A]" style={{padding:"0 8%"}}>
  {/* Header Section */}
  <div className="section-heading text-center mb-16" style={{display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto",}}>
    <h2 className=" mt-4 font-serif text-6xl md:text-8xl tracking-tight " style={{color:"#C8A988"}}>
      Latest Works
    </h2>
  </div>

  {/* Category Bar - Updated Classes */}
  <div className="category-bar-container max-w-2xl mx-auto overflow-x-auto no-scrollbar">
    {categories.map((cat) => (
   <button
  key={cat}
  onClick={() => setFilter(cat)}
  className={`relative pb-2 text-[10px] tracking-[3px] uppercase font-bold transition-colors whitespace-nowrap
    ${filter === cat ? "text-[#C8A988]" : "text-white/30 hover:text-[#C8A988]"}
  `}
>
  {cat}

  {filter === cat && (
    <motion.div
      layoutId="activeTab"
      className="absolute bottom-[-24px] left-0 w-full h-[1px] bg-[#C8A988]"
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    />
  )}
</button>
    ))}
  </div>

      <div className="max-w-[1600px] mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MasonryPhotoAlbum
              photos={filteredPhotos}
              spacing={15} 
              columns={(w) => (w < 600 ? 1 : w < 1100 ? 2 : 3)}
              onClick={({ index }) => setIndex(index)}
              renderPhoto={({ photo, wrapperProps, imageProps }) => (
                <div  {...wrapperProps}  className=" latestimg-box react-photo-album--photo relative group cursor-none overflow-hidden mb-[15px]"    >
                  <img  
                    {...imageProps}    
                    className="latestimg transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                  />
                  
                  {/* The Novo-style Overlay */}
                  <div className="work-overlay-content absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-8">
                    <div className="text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="work-overlay-title text-white font-serif text-3xl mb-2">{photo.title}</h3>
                      <p className="work-overlay-category text-[#C8A988] text-[9px] uppercase tracking-[4px]">{photo.category}</p>
                    </div>
                  </div>
                </div>
              )}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <Lightbox
        index={index}
        slides={filteredPhotos}
        open={index >= 0}
        close={() => setIndex(-1)}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.95)" } }}
      />
      
      {initialPhotos.length > 6 && (
    <div className="view-more-container">
        <a href="/gallery" className="view-more-link">
          VIEW FULL GALLERY —
        </a>
    </div>
  )}
    </section>
  );
}