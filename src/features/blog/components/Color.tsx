import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import "@/colorful.css";
import { PlusIcon } from "lucide-react";

/**
 * ColorPicker Component
 * 
 * Design Philosophy: Dark Sophisticated Studio
 * - Clean, focused interface with dark background
 * - Color wheel for visual selection via react-colorful
 * - Manual hex input for precision
 * - Real-time preview and validation
 * - Smooth transitions and micro-interactions
 */

interface ColorPickerProps {
    colors: string[];
    onAddColor: (color: string) => void;
    onRemoveColor: (index: number) => void;
}

function isValidHex(hex: string): boolean {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}

function normalizeHex(hex: string): string {
    if (!hex.startsWith("#")) {
        hex = "#" + hex;
    }
    return hex.toUpperCase();
}

export default function ColorPicker({
    colors,
    onAddColor,
    onRemoveColor,
}: ColorPickerProps) {
    const [selectedColor, setSelectedColor] = useState<string>("#3B82F6");
    const [hexInput, setHexInput] = useState<string>("#3B82F6");
    const [isOpen, setIsOpen] = useState(false);

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
        setHexInput(color.toUpperCase());
    };

    const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        setHexInput(value);

        if (isValidHex(value)) {
            setSelectedColor(value);
        }
    };

    const handleAddColor = () => {
        if (isValidHex(selectedColor) && !colors.includes(selectedColor.toUpperCase())) {
            onAddColor(selectedColor.toUpperCase());
            setIsOpen(false);
            // Reset to a new color for next selection
            setSelectedColor("#3B82F6");
            setHexInput("#3B82F6");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAddColor();
        }
    };

    return (
        <div className="w-full space-y-6">
            {/* Color Picker Trigger */}
            <div className="flex gap-3">
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-12 h-12 gap-3 border-2 rounded-full border-border hover:border-primary hover:bg-card transition-all duration-300 group"
                        >
                            <PlusIcon />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-80 p-6 space-y-5 bg-card border-border">
                        {/* Color Wheel */}
                        <div className="flex justify-center">
                            <HexColorPicker
                                color={selectedColor}
                                onChange={handleColorChange}
                            />
                        </div>

                        {/* Hex Input Section */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                Hex Value
                            </label>
                            <Input
                                type="text"
                                value={hexInput}
                                onChange={handleHexInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="#000000"
                                className="font-mono text-sm bg-input border-border text-foreground"
                            />
                            <p className="text-xs text-muted-foreground">
                                {isValidHex(selectedColor)
                                    ? "✓ Valid hex color"
                                    : "Enter a valid hex color (e.g., #FF5733)"}
                            </p>
                        </div>

                        {/* Add Button */}
                        <Button
                            onClick={handleAddColor}
                            disabled={!isValidHex(selectedColor) || colors.includes(selectedColor.toUpperCase())}
                            className="w-full h-11 font-semibold"
                        >
                            {colors.includes(selectedColor.toUpperCase())
                                ? "Already Added"
                                : "Add Color"}
                        </Button>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
