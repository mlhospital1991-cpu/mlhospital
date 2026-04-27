"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // If there's a hash (e.g., #doctors), don't force scroll to top
    // Let the browser handle the anchor jump
    if (window.location.hash) return;

    // Force scroll to top on mount (refresh) and path changes
    window.scrollTo(0, 0);
    
    // Some browsers need a slight delay to override their restoration logic
    const timer = setTimeout(() => {
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
