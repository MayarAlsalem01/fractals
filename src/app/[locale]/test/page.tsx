'use client'
import { Button } from "@/components/ui/button";
import ColorPicker from "@/features/blog/components/Color";
import { useColorList } from "@/hooks/useColorList";

export default function page() {
    const { colors, addColor, clearColors, removeColor, setColors } = useColorList()
    return (
        <div className="mt-12 mx-24">
            <div className="flex gap-4 items-center justify-start flex-row-reverse ">
                <ColorPicker colors={colors} onAddColor={addColor} onRemoveColor={removeColor} />

                {colors.map((color, index) => (
                    <button
                        key={`${color}-${index}`}
                        onClick={() => removeColor(index)}
                        className="group relative flex-shrink-0 transition-all duration-300 hover:scale-110 active:scale-95"
                        title={`Click to remove ${color}`}
                    >
                        {/* Circular Swatch with White Border */}
                        <div
                            className="w-12 h-12 rounded-full border-2 border-white shadow-lg transition-all duration-300 group-hover:shadow-2xl"
                            style={{ backgroundColor: color }}
                        />

                        {/* Hex Value Tooltip */}
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            <p className="text-xs font-mono text-muted-foreground bg-card/80 backdrop-blur-sm px-2 py-1 rounded">
                                {color}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
            {colors.length > 0 && (
                <div className="flex items-center gap-4 pt-8 border-t border-border mt-2">
                    <span className="text-muted-foreground">
                        {colors.length} color{colors.length !== 1 ? "s" : ""}
                    </span>
                    <Button
                        variant="outline"
                        onClick={clearColors}
                        className="px-6"
                    >
                        Clear All
                    </Button>

                </div>
            )}
        </div>
    )
}


