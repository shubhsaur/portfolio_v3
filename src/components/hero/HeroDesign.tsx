"use client";

import FrontendUniverse from "@/components/hero/FrontendUniverse";

export default function HeroDesign() {
  return (
    <div className="relative w-full md:w-[40%] self-center flex items-center justify-center -mt-2 sm:mt-2 md:mt-0">
      <FrontendUniverse className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[560px]" />
    </div>
  );
}