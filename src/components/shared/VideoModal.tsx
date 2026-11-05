import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../../types";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const getYouTubeEmbed = (url?: string): string | null => {
  if (!url) return null;

  let videoId: string | null = null;

  if (url.includes("youtube.com/watch?v=")) {
    videoId = new URL(url).searchParams.get("v");
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  } else if (url.includes("youtube.com/embed/")) {
    videoId = url.split("youtube.com/embed/")[1]?.split("?")[0];
  }

  if (!videoId) return null;

  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&vq=hd1080&playsinline=1&enablejsapi=1`;
};

const isDirectVideo = (url?: string): boolean => {
  if (!url) return false;
  return (
    url.endsWith(".mp4") ||
    url.endsWith(".webm") ||
    url.endsWith(".mov") ||
    url.startsWith("/videos/") ||
    (!url.includes("youtube.com") && !url.includes("youtu.be") && !url.includes("vimeo.com"))
  );
};

const VideoModal: React.FC<Props> = ({ project, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBuffering, setIsBuffering] = useState(true);

  useEffect(() => {
    if (!project) return;
    setIsBuffering(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  const rawUrl = project.video_url || project.video_embed_url || "/videos/showreel.mp4";
  const isDirect = isDirectVideo(rawUrl);
  const ytEmbed = !isDirect ? getYouTubeEmbed(rawUrl) : null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Full-screen dark cinematic backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/92 backdrop-blur-2xl cursor-pointer"
        />

        {/* Large Expanded Player Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-6xl mx-auto flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 mb-2 bg-[#111412]/90 backdrop-blur-md border border-[#F1EDE3]/10 rounded-2xl">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse flex-shrink-0" />
              <div className="min-w-0">
                <h3
                  id="modal-title"
                  className="font-serif text-sm sm:text-lg text-[#F1EDE3] font-normal leading-tight truncate"
                >
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  {project.category?.name && (
                    <span className="text-[9px] font-sans font-semibold uppercase tracking-widest text-[#8D8B82]">
                      {project.category.name}
                    </span>
                  )}
                  <span className="text-[#67685D] text-[10px]">•</span>
                  <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-[#D8D1C2] bg-white/10 px-2 py-0.5 rounded">
                    1080p Full HD
                  </span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="group flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-widest text-[#8D8B82] hover:text-[#F1EDE3] transition-colors px-2 py-1 flex-shrink-0"
              aria-label="Close video player"
            >
              <span className="hidden sm:inline">Close</span>
              <span className="w-8 h-8 rounded-full bg-white/5 border border-white/15 group-hover:border-white/40 group-hover:bg-white/10 flex items-center justify-center transition-all text-sm">
                ✕
              </span>
            </button>
          </div>

          {/* Large Video Frame (Native HTML5 or YouTube) */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-[0_20px_80px_rgba(0,0,0,0.95)] border border-[#F1EDE3]/15">
            {/* YouTube-style Buffering / Loading Indicator */}
            {isDirect && isBuffering && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 backdrop-blur-[2px] z-20 pointer-events-none transition-opacity duration-200">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-3 sm:border-4 border-white/10" />
                  <div className="absolute inset-0 rounded-full border-3 sm:border-4 border-transparent border-t-[#F1EDE3] border-r-[#F1EDE3]/50 animate-spin" />
                </div>
                <span className="text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-[#D8D1C2] mt-3 drop-shadow-md">
                  Buffering HD Stream
                </span>
              </div>
            )}

            {isDirect ? (
              <video
                ref={videoRef}
                src={rawUrl}
                controls
                autoPlay
                playsInline
                preload="auto"
                onLoadStart={() => setIsBuffering(true)}
                onWaiting={() => setIsBuffering(true)}
                onSeeking={() => setIsBuffering(true)}
                onCanPlay={() => setIsBuffering(false)}
                onPlaying={() => setIsBuffering(false)}
                onPause={() => setIsBuffering(false)}
                onError={() => setIsBuffering(false)}
                className="w-full h-full object-contain bg-black focus:outline-none"
              >
                <source src={rawUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : ytEmbed ? (
              <iframe
                src={ytEmbed}
                title={project.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                {project.thumbnail && (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover filter brightness-50"
                  />
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4 text-center">
                  <p className="font-serif text-lg text-[#F1EDE3]">Preview ready upon inquiry</p>
                  <a
                    href="https://wa.me/971568709412?text=Hi%20Adil,%20I'd%20like%20to%20view%20your%20showreel%20videos."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full bg-[#F1EDE3] text-[#080B09] font-sans font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg"
                  >
                    Request on WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-3 px-3 py-2 text-center sm:text-left">
            <p className="text-[11px] font-sans text-[#8D8B82]">
              Captured &amp; Color Graded on <strong className="text-[#F1EDE3] font-medium">DaVinci Resolve</strong> by Adil Mubarak
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/971568709412?text=Hi%20Adil,%20I%20loved%20your%20showreel%20and%20would%20like%20to%20work%20together."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[11px] font-sans font-semibold uppercase tracking-wider text-[#25D366] hover:text-white transition-colors"
              >
                Book Similar Project &rarr;
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VideoModal;
