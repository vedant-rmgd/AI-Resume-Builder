import { Check, Palette } from "lucide-react";
import { useState } from "react";

function ColorPicker({ selectedColor, onChange }) {
    const colors = [
        {
            name: "Blue",
            value: "#3B82F6",
        },
        {
            name: "Indigo",
            value: "#6366F1",
        },
        {
            name: "Purple",
            value: "#8B5CF6",
        },
        {
            name: "Green",
            value: "#10B981",
        },
        {
            name: "Red",
            value: "#EF4444",
        },
        {
            name: "Orange",
            value: "#F97316",
        },
        {
            name: "Teal",
            value: "#14B8A6",
        },
        {
            name: "Pink",
            value: "#EC4899",
        },
        {
            name: "Gray",
            value: "#6B7280",
        },
        {
            name: "Black",
            value: "#1F2937",
        },
    ];
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-sm text-purple-600 bg-linear-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg"
            >
                <Palette size={16} />
                <span className="max-sm:hidden">Accent</span>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 z-50 w-64 max-h-50 overflow-y-auto overscroll-contain grid grid-cols-4 gap-3 p-3 bg-white rounded-md border border-gray-200 shadow-sm thin-scrollbar scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {colors.map((color) => (
                        <div
                            key={color.value}
                            onClick={() => {
                                onChange(color.value);
                                setIsOpen(false);
                            }}
                            className="relative cursor-pointer flex flex-col items-center"
                        >
                            <div
                                className="w-12 h-12 rounded-full border-2 border-transparent hover:border-black/30 transition-colors"
                                style={{ backgroundColor: color.value }}
                            ></div>
                            {selectedColor === color.value && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Check className="size-5 text-white drop-shadow" />
                                </div>
                            )}
                            <p className="text-[11px] mt-1 text-gray-600 text-center">
                                {color.name}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ColorPicker;
