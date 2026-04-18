"use client";

import { useState, useTransition, useEffect } from "react";
import { toast } from "sonner";
import { deleteMediaItem } from "../app/admin/manage/actions";

interface MediaItem {
  id: string;
  title: string;
  src: string;
  alt: string;
  media_type: "photo" | "video";
  resource_type?: "image" | "video";
  public_id?: string;
}

interface ManageMediaGridProps {
  initialItems: MediaItem[];
}

function derivePublicId(src: string) {
  const match = src.match(/^https?:\/\/[^\/]+\/(?:image|video)\/upload\/(?:[^\/]+\/)*?(?:v\d+\/)?(.+)$/);
  if (!match?.[1]) {
    return "";
  }
  return match[1].replace(/\.[^./]+$/, "");
}

export default function ManageMediaGrid({ initialItems }: ManageMediaGridProps) {
  const [mediaItems, setMediaItems] = useState(initialItems);
  const [confirmTarget, setConfirmTarget] = useState<MediaItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleDelete = async (item: MediaItem) => {
    if (!item.public_id && !item.src) {
      toast.error("Unable to determine the Cloudinary asset.");
      return;
    }

    setIsDeleting(true);
    const cloudinaryPublicId = item.public_id ?? derivePublicId(item.src);
    const resourceType = item.resource_type ?? (item.media_type === "video" ? "video" : "image");

    if (!cloudinaryPublicId) {
      toast.error("Unable to determine the Cloudinary public ID for this item.");
      setIsDeleting(false);
      setConfirmTarget(null);
      return;
    }

    try {
      const result = await deleteMediaItem(item.id, cloudinaryPublicId, resourceType);
      startTransition(() => {
        setMediaItems((current) => current.filter((media) => media.id !== item.id));
      });
      if (result.wasSelfHealing) {
        toast.success("Record removed from site (File was already missing from cloud storage).", {
          style: { background: '#FFB3BA' } // Soft Coral accent
        });
      } else {
        toast.success("Media deleted successfully.");
      }
    } catch (error) {
      console.error("deleteMediaItem failed", error);
      toast.error("Could not delete media. Please try again.");
    } finally {
      setIsDeleting(false);
      setConfirmTarget(null);
    }
  };

  return (
    <div className="manage-media-shell">
      <div className="manage-grid">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="manage-card skeleton">
              <div className="manage-card-media skeleton-media"></div>
              <div className="manage-card-copy">
                <div className="skeleton-text skeleton-title"></div>
                <div className="skeleton-text skeleton-desc"></div>
                <div className="skeleton-button"></div>
              </div>
            </div>
          ))
        ) : mediaItems.length === 0 ? (
          <div className="manage-empty">
            <p className="eyebrow">Nothing to manage yet.</p>
            <p>Upload new media from the admin upload page to begin managing your library.</p>
          </div>
        ) : (
          mediaItems.map((item) => (
           <div key={item.id} className="manage-card">
  <div className="manage-card-media">
    {item.media_type === "video" ? (
      <video src={item.src} muted loop playsInline autoPlay className="manage-card-preview" />
    ) : (
      <img src={item.src} alt={item.alt} className="manage-card-preview" />
    )}
  </div>
  
  <div className="manage-card-copy">
    <p className="eyebrow" style={{ color: '#C8A988' }}>{item.media_type.toUpperCase()}</p>
    <h3>{item.title}</h3>
    <p style={{ opacity: 0.5, fontSize: '12px' }}>{item.alt}</p>
    
    <button
      type="button"
      className="delete-button"
      onClick={() => setConfirmTarget(item)}
    >
      Delete
    </button>
  </div>
</div>
          ))
        )}
      </div>

      {confirmTarget && (
        <div className="confirm-modal">
          <div className="confirm-dialog">
            <p className="eyebrow">Confirm deletion</p>
            <h2>Delete this item?</h2>
            <p>
              This will remove the item from our site. If the file was already manually deleted, this cleans up the record.
            </p>
            <div className="confirm-actions">
              <button type="button" className="secondary-button" onClick={() => setConfirmTarget(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="delete-button"
                onClick={() => handleDelete(confirmTarget)}
                disabled={isDeleting || pending}
              >
                {isDeleting || pending ? <span className="button-spinner" /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
