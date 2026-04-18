"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { uploadPhoto } from "../app/admin/upload/actions";

export default function UploadZone() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const router = useRouter();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setIsUploading(true);
    setTotalFiles(acceptedFiles.length);
    setUploadError(null);

    let successCount = 0;

    // Loop through each file one by one
    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i];
      setCurrentFileIndex(i + 1);
      setUploadProgress(0);

      const isVideo = file.type.startsWith("video/");
      const mediaType = isVideo ? "video" : "photo";

      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", file.name.replace(/\.[^.]+$/, ""));
      formData.append("category", "Gallery");
      formData.append("location", "Unspecified");
      formData.append("iso", "100");
      formData.append("aperture", "f/2.8");
      formData.append("aspect", "wide");
      formData.append("alt", `${file.name} uploaded ${mediaType}`);
      formData.append("media_type", mediaType);

      const toastId = toast.loading(`Uploading ${file.name} (${i + 1}/${acceptedFiles.length})...`, {
        description: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
      });

      try {
        // Start simulated progress
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => (prev >= 90 ? prev : prev + Math.random() * 20));
        }, 600);

        const result = await uploadPhoto(formData);

        clearInterval(progressInterval);
        setUploadProgress(100);

        if (result?.id) {
          successCount++;
          toast.success(`${file.name} uploaded successfully!`, { id: toastId });
        } else {
          throw new Error("Upload failed on server");
        }
      } catch (error) {
        console.error(`❌ Error uploading ${file.name}:`, error);
        toast.error(`Failed to upload ${file.name}`, { id: toastId });
      }
    }

    // Wrap up after all files are done
    if (successCount > 0) {
      toast.success(`Upload complete! ${successCount} items added.`);
      router.refresh();
    }

    // Reset UI
    setTimeout(() => {
      setIsUploading(false);
      setUploadProgress(0);
      setCurrentFileIndex(0);
      setTotalFiles(0);
    }, 1500);
  }, [router]);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [".mp4", ".mov"],
    },
    maxFiles: 20, // Now supports up to 20 files
    multiple: true, // Specifically allows multiple files
    disabled: isUploading,
    noClick: true,
  });

  return (
  <div className={`upload-zone ${isUploading ? "upload-zone--uploading" : ""}`} {...getRootProps()}>
  <input {...getInputProps()} />
  <div className="upload-copy">
    {isUploading ? (
      <motion.div className="upload-spinner-shell">
        <p className="eyebrow">ADMIN UPLOAD</p>
        <h2>{Math.round(uploadProgress)}%</h2>
        <p>Uploading {currentFileIndex} of {totalFiles}</p>
      </motion.div>
    ) : (
      <motion.div>
        <p className="eyebrow" style={{ color: '#C8A988' }}>ADMIN UPLOAD</p>
        <h2>Drag & drop a new file</h2>
        <p style={{ opacity: 0.6 }}>Supported: JPG, PNG, AVIF, MP4, MOV</p>
        <button
          type="button"
          className="secondary-button"
          onClick={open}
        >
          Select file
        </button>
      </motion.div>
    )}
  </div>
</div>
  );
}