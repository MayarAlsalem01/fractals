'use client'

import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import createTemplateAttributeAction from "../actions/createTemplateAttributeAction";

interface AddFieldDialogProps {
    sectionId: number;
    templateId: number;
}

const FIELD_TYPES = [
    { value: "text", label: "Text Input" },
    { value: "textarea", label: "Text Area" },
    { value: "select", label: "Dropdown Select" },
    { value: "selectComboBox", label: "Radio / ComboBox Select" },
    { value: "multiselect", label: "Checkbox Multi-Select" },
    { value: "boolean", label: "Boolean (Yes/No)" },
    { value: "date", label: "Date Picker" },
    { value: "number", label: "Number Input" },
    { value: "file", label: "File Uploader" },
    { value: "colorList", label: "Color Swatches" },
    { value: "range", label: "Range Slider" },
];

export default function AddFieldDialog({ sectionId, templateId }: AddFieldDialogProps) {
    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState("");
    const [type, setType] = useState("text");
    const [required, setRequired] = useState(false);
    const [width, setWidth] = useState("medium");
    const [rawOptions, setRawOptions] = useState(""); // Comma-separated list for select/multiselect
    const [loading, setLoading] = useState(false);

    const showOptionsInput = ["select", "selectComboBox", "multiselect"].includes(type);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!label.trim()) {
            toast.error("Label cannot be empty");
            return;
        }

        setLoading(true);
        try {
            // Process options if applicable
            let optionsPayload = null;
            if (showOptionsInput && rawOptions.trim()) {
                optionsPayload = rawOptions
                    .split(",")
                    .map((item) => {
                        const trimmed = item.trim();
                        return {
                            value: trimmed.toLowerCase().replace(/[^a-z0-9_]+/g, "_"),
                            label: trimmed,
                        };
                    })
                    .filter((opt) => opt.label.length > 0);
            }

            const res = await createTemplateAttributeAction({
                sectionId,
                label: label.trim(),
                type,
                required,
                width,
                options: optionsPayload,
                templateId,
            });

            if (res.ok) {
                toast.success("Field created successfully!");
                setLabel("");
                setType("text");
                setRequired(false);
                setWidth("medium");
                setRawOptions("");
                setOpen(false);
            } else {
                toast.error(res.error?.message || "Failed to create field");
            }
        } catch (err) {
            console.error(err);
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1.5 border border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-all active:scale-95"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add Field</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] border border-zinc-800 bg-zinc-950 text-zinc-100">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-zinc-100">Add New Field</DialogTitle>
                        <DialogDescription className="text-zinc-400 text-sm">
                            Create a new input field (attribute) for this step.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3 py-2">
                        {/* Label */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="field-label" className="text-sm font-medium text-zinc-300">
                                Field Label
                            </label>
                            <Input
                                id="field-label"
                                placeholder="e.g. Preferred Color Palette"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                disabled={loading}
                                className="border border-zinc-800 bg-zinc-900 text-zinc-100 placeholder-zinc-500 focus:ring-zinc-700"
                            />
                        </div>

                        {/* Type */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-zinc-300">
                                Field Type
                            </label>
                            <Select value={type} onValueChange={setType} disabled={loading}>
                                <SelectTrigger className="border border-zinc-800 bg-zinc-900 text-zinc-100 focus:ring-zinc-700">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent className="border border-zinc-800 bg-zinc-900 text-zinc-100">
                                    {FIELD_TYPES.map((ft) => (
                                        <SelectItem key={ft.value} value={ft.value} className="hover:bg-zinc-800 focus:bg-zinc-800">
                                            {ft.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Width */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-zinc-300">
                                Display Width
                            </label>
                            <Select value={width} onValueChange={setWidth} disabled={loading}>
                                <SelectTrigger className="border border-zinc-800 bg-zinc-900 text-zinc-100 focus:ring-zinc-700">
                                    <SelectValue placeholder="Select width" />
                                </SelectTrigger>
                                <SelectContent className="border border-zinc-800 bg-zinc-900 text-zinc-100">
                                    <SelectItem value="medium" className="hover:bg-zinc-800 focus:bg-zinc-800">Medium (Half Width)</SelectItem>
                                    <SelectItem value="full" className="hover:bg-zinc-800 focus:bg-zinc-800">Full Width</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Options list (if select/multiselect) */}
                        {showOptionsInput && (
                            <div className="flex flex-col gap-1.5 animate-in fade-in duration-200">
                                <label htmlFor="field-options" className="text-sm font-medium text-zinc-300">
                                    Options (comma-separated)
                                </label>
                                <Input
                                    id="field-options"
                                    placeholder="e.g. Option 1, Option 2, Option 3"
                                    value={rawOptions}
                                    onChange={(e) => setRawOptions(e.target.value)}
                                    disabled={loading}
                                    className="border border-zinc-800 bg-zinc-900 text-zinc-100 placeholder-zinc-500 focus:ring-zinc-700"
                                />
                                <span className="text-[10px] text-zinc-500 font-medium leading-none">
                                    Separate each dropdown option with a comma.
                                </span>
                            </div>
                        )}

                        {/* Required Checkbox */}
                        <div className="flex items-center gap-2 pt-1.5">
                            <Checkbox
                                id="field-required"
                                checked={required}
                                onCheckedChange={(val) => setRequired(!!val)}
                                disabled={loading}
                                className="border-zinc-800 data-[state=checked]:bg-brand-primary"
                            />
                            <label htmlFor="field-required" className="text-sm font-medium text-zinc-300 cursor-pointer select-none">
                                This field is required
                            </label>
                        </div>
                    </div>

                    <DialogFooter className="pt-2">
                        <Button 
                            type="button" 
                            variant="ghost" 
                            onClick={() => setOpen(false)} 
                            disabled={loading}
                            className="border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={loading}
                            className="bg-brand-primary hover:bg-brand-primary/90 text-white shadow-md shadow-brand-primary/20"
                        >
                            {loading ? "Adding..." : "Add Field"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
