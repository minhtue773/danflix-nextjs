'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function CollapsibleWrapper({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 text-[#FFD875] hover:text-[#FFD875]/70 md:hidden"
      >
        Thông tin phim
        <ChevronDown className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open
            ? 'mt-2 max-h-[2000px] opacity-100'
            : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'
        }`}
      >
        {children}
      </div>
    </>
  );
}
