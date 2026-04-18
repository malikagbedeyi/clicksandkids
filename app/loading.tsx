"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <motion.div 
          className="loading-logo-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.98, 1, 0.98] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <img 
            src="/image/logo/logo-03.png" 
            alt="Loading Logo" 
            className="loading-logo-img" 
          />
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="loading-text"
        >
          Capturing magic...
        </motion.p>
      </div>
      
      <div className="loading-bar-container">
        <motion.div 
          className="loading-bar-fill"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}