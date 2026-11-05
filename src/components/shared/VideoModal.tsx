import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../../types";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const VideoModal: React.FC<Props> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const getEmbed = (url?: string) => {
    if (!url) return null;
    if (url.includes("youtube.com/watch?v="))
      return url.replace("watch?v=", "embed/") + "?autoplay=1";
    if (url.includes("youtu.be/"))
      return `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}?autoplay=1`;
    return url;
  };

  const embed = getEmbed(project.video_url || project.video_embed_url);
  const thumb = project.thumbnail;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#080B09]/80 backdrop-blur-lg cursor-pointer"
        />

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ type: "spring", damping: 28, stiffness: 360 }}
          className="relative w-full max-w-4xl bg-[#111412] border border-[#F1EDE3]/10 rounded-2xl overflow-hidden shadow-2xl z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#F1EDE3]/10">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#F1EDE3]" />
              <h3 id="modal-title" className="font-display font-bold text-sm text-[#F1EDE3]">{project.title}</h3>
              {project.category?.name && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#F1EDE3]/5 text-[#D8D1C2] border border-[#F1EDE3]/10 text-[10px] font-display font-bold">
                  {project.category.name}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-[#F1EDE3]/10 hover:bg-[#F1EDE3]/20 text-[#F1EDE3] flex items-center justify-center text-xs transition-colors"
              aria-label="Close"
            >✕</button>
          </div>

          {/* Video */}
          <div className="aspect-video bg-[#080B09]">
            {embed ? (
              <iframe src={embed} title={project.title} className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            ) : thumb ? (
              <div className="relative w-full h-full">
                <img src={thumb} alt={project.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-[#080B09]/60 flex items-center justify-center">
                  <p className="font-display font-bold text-[#F1EDE3] text-base">Preview available on request</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="font-display text-[#8D8B82] text-sm">Loading preview…</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-[#F1EDE3]/10 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-display text-[#8D8B82] uppercase tracking-widest">Client</p>
              <p className="font-display font-bold text-sm text-[#F1EDE3]">{project.client_name || "Adil Mubarak Films"}</p>
            </div>
            <button
              onClick={() => { onClose(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-emerald text-xs py-2 px-5"
            >
              Inquire Similar Shoot →
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VideoModal;
