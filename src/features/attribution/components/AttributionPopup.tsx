"use client";

import { useState, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitAttributionResponse, dismissAttributionSurvey } from "../actions/attribution";
import BorderGlow from "@/components/BorderGlow";
import PrimaryButton from "@/ui/PrimaryButton";
import { EarIcon } from "lucide-react";
export type AttributionOptionType = {
    id: number;
    label: string;
    value: string;
    is_active: boolean;
    sort_order: number;
};

export default function AttributionPopup({ options }: { options: AttributionOptionType[] }) {
    const [open, setOpen] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [otherText, setOtherText] = useState("");
    const [isPending, startTransition] = useTransition();

    if (!options || options.length === 0) return null;

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            // Dismiss cookie
            startTransition(async () => {
                // await dismissAttributionSurvey();
                setOpen(false);
                setIsDialogOpen(false)
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedOption) return;

        startTransition(async () => {
            await submitAttributionResponse(selectedOption, otherText);
            setOpen(false);
        });
    };

    const isOtherSelected = options.find((o) => o.id === selectedOption)?.value.toLowerCase() === "other";

    return (
        <>

            <Button className="w-12! h-12! fixed bottom-4  rounded-full right-4 bg-brand-primary/15 border border-brand-primary/50 hover:bg-brand-primary/20 backdrop-blur-2xl z-[9999]" onClick={() => setIsDialogOpen(true)}>
                <EarIcon className="text-brand-primary" />
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
                <DialogContent className=" sm:max-w-md bsg-transparent text-white border-none z-[9999] !p-0">
                    <BorderGlow
                        edgeSensitivity={0}
                        glowColor="40 80 80"
                        backgroundColor="#060010"
                        borderRadius={28}
                        glowRadius={40}
                        glowIntensity={1}
                        coneSpread={25}
                        animated={true}
                        colors={['#c084fc', '#f472b6', '#38bdf8']}
                        className="w-full px-2 lg:px-12 py-24! rounded-none! rounded-tl-4xl! rounded-br-4xl!"

                    >
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold">How did you hear about us?</DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                We'd love to know how you found Fractals.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-6 py-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                {options.map((option) => (
                                    <label
                                        key={option.id}
                                        className={`flex items-center gap-3 p-3 rounded-tl-2xl
                                     rounded-br-2xl border cursor-pointer transition-colors ${selectedOption === option.id
                                                ? "border-brand-primary bg-brand-primary/10 text-white"
                                                : "border-zinc-800 hover:bg-zinc-900 text-zinc-300"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="attribution"
                                            value={option.id}
                                            checked={selectedOption === option.id}
                                            onChange={() => setSelectedOption(option.id)}
                                            className="sr-only"
                                        />
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedOption === option.id ? 'border-brand-primary' : 'border-zinc-500'}`}>
                                            {selectedOption === option.id && <div className="w-2 h-2 rounded-full bg-brand-primary" />}
                                        </div>
                                        <span className="text-sm font-medium">{option.label}</span>
                                    </label>
                                ))}
                            </div>

                            {isOtherSelected && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                    <Label htmlFor="otherText" className="text-zinc-300">Please specify</Label>
                                    <Input
                                        id="otherText"
                                        value={otherText}
                                        onChange={(e) => setOtherText(e.target.value)}
                                        placeholder="Tell us more..."
                                        className="bg-zinc-900 border-zinc-800 text-white"
                                        required
                                    />
                                </div>
                            )}

                            <PrimaryButton
                                type="submit"
                                disabled={!selectedOption || isPending}

                                className="z-30 w-full"
                            >
                                {isPending ? "Submitting..." : "Submit"}
                            </PrimaryButton>
                        </form>
                    </BorderGlow>
                </DialogContent>
            </Dialog>
        </>
    );
}

