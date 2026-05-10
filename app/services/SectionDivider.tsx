"use client";

export default function SectionDivider({
    flip = false,
}: {
    flip?: boolean;
}) {
    return (
        <div className="relative py-10 sm:py-14 overflow-hidden">
            {/* Gradient line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
                <div
                    className="h-px w-full"
                    style={{
                        background:
                            flip
                                ? "linear-gradient(90deg, transparent, rgba(149,24,75,0.35), rgba(0,77,151,0.35), transparent)"
                                : "linear-gradient(90deg, transparent, rgba(0,77,151,0.35), rgba(149,24,75,0.35), transparent)",
                    }}
                />
            </div>

            {/* Decorative center orb */}
            <div className="relative flex justify-center">
                <div className="relative">
                    {/* Glow */}
                    <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-[#004D97]/20 to-[#95184B]/20 rounded-full" />

                    {/* Main circle */}
                    <div className="relative w-5 h-5 rounded-full bg-white dark:bg-gray-900 border border-white/40 dark:border-gray-700 shadow-xl flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#004D97] to-[#95184B]" />
                    </div>
                </div>
            </div>

            {/* Floating accents */}
            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-20 h-px bg-gradient-to-r from-transparent to-[#004D97]/20" />
            <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-20 h-px bg-gradient-to-l from-transparent to-[#95184B]/20" />
        </div>
    );
}