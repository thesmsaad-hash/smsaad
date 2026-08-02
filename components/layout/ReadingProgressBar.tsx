"use client";

import * as React from "react";

export function ReadingProgressBar() {
  const [completion, setCompletion] = React.useState(0);

  React.useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(
          Number((currentProgress / scrollHeight).toFixed(2)) * 100
        );
      }
    };

    window.addEventListener("scroll", updateScrollCompletion);
    return () => window.removeEventListener("scroll", updateScrollCompletion);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#7C3AED] via-[#22D3EE] to-purple-400 transition-all duration-150"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
}
