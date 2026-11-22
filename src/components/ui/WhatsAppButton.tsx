"use client";

import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils";

export function WhatsAppButton() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 480);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col items-end gap-3 sm:right-7 sm:bottom-7">
      {showTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E4DED4] bg-white/95 text-[#00052F] shadow-md backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-[#CF4520] hover:text-[#CF4520] cursor-pointer"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </button>
      )}

      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Enquire with VJ PRANA on WhatsApp"
        className="group inline-flex items-center gap-2.5 rounded-full bg-[#1F7A4D] px-4 py-3 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#17623D] hover:shadow-xl"
      >
        <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>
    </div>
  );
}
