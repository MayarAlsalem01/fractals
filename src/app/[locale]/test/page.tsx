'use client'
import BorderGlow from "@/components/BorderGlow";
import { Button } from "@/components/ui/button";
import ColorPicker from "@/features/blog/components/Color";
import { useColorList } from "@/hooks/useColorList";

export default function page() {
    const { colors, addColor, clearColors, removeColor, setColors } = useColorList()
    return (
        <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#060010"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1}
            coneSpread={25}
            animated={true}
            colors={['#c084fc', '#f472b6', '#38bdf8']}
        >
            <div style={{ padding: '2em' }}>
                <h2>Your Content Here</h2>
                <p>Hover near the edges to see the glow.</p>
            </div>
        </BorderGlow>
    )
}


