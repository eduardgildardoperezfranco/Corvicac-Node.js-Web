'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AccessibilityButton() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="fixed bottom-48 right-6 z-50">
            <Link
                href="/accessibility-guide"
                className={`group relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFFF00] text-[#1C1C1C] shadow-lg transition-all duration-300 animate-float ${isHovered
                    ? 'scale-110 shadow-2xl ring-4 ring-[#1C1C1C] ring-opacity-50'
                    : 'hover:shadow-2xl hover:ring-4 hover:ring-[#1C1C1C] hover:ring-opacity-50'
                    }`}
                aria-label="Herramientas de Accesibilidad"
                title="Herramientas de Accesibilidad"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <span className="text-2xl font-bold">♿</span>

                {/* Tooltip animado */}
                <div className={`absolute right-16 top-1/2 -translate-y-1/2 bg-[#1C1C1C] text-[#FFFF00] px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none ${isHovered ? 'scale-100' : 'scale-95'
                    }`}>
                    Herramientas de Accesibilidad
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1C1C1C] rotate-45"></div>
                </div>
            </Link>
        </div>
    );
}