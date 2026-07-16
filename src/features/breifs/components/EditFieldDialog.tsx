'use client'

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import updateTemplateAttributeAction from "../actions/updateTemplateAttributeAction";
import { Attr } from "../types";

interface EditFieldDialogProps {
    attribute: Attr;
    templateId: number;
    children: React.ReactNode;
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

export default function EditFieldDialog({ attribute, templateId, children }: EditFieldDialogProps) {
    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState(attribute.label);
    const [type, setType] = useState(attribute.type);
    const [required, setRequired] = useState(!!attribute.required);
    const [width, setWidth] = useState(attribute.width || "medium");
    const [position, setPosition] = useState(attribute.position ?? 0);
    const [rawOptions, setRawOptions] = useState("");
    const [loading, setLoading] = useState(false);

    const showOptionsInput = ["select", "selectComboBox", "multiselect"].includes(type);

    // Parse options from attribute on open
    useEffect(() => {
        if (open) {
            setLabel(attribute.label);
            setType(attribute.type);
            setRequired(!!attribute.required);
            setWidth(attribute.width || "medium");
            setPosition(attribute.position ?? 0);

            if (attribute.options) {
                try {
                    const parsed = typeof attribute.options === 'string' ? JSON.parse(attribute.options) : attribute.options;
                    if (Array.isArray(parsed)) {
                        setRawOptions(parsed.map((opt: any) => opt.label || opt).join(", "));
                    } else {
                        setRawOptions("");
                    }
                } catch (e) {
                    setRawOptions("");
                }
            } else {
                setRawOptions("");
            }
        }
    }, [open, attribute]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!label.trim()) {
            toast.error("Label cannot be empty");
            return;
        }

        setLoading(true);
        try {
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

            const res = await updateTemplateAttributeAction({
                id: attribute.id,
                label: label.trim(),
                type,
                required,
                width,
                position: Number(position),
                options: optionsPayload,
                templateId,
            });

            if (res.ok) {
                toast.success("Field updated successfully!");
                setOpen(false);
            } else {
                toast.error(res.error?.message || "Failed to update field");
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
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] border border-border bg-card text-foreground">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-foreground">Edit Field Details</DialogTitle>
                        <DialogDescription className="text-muted-foreground text-sm">
                            Modify the configuration and display order for this field.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3 py-2">
                        {/* Label */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="edit-field-label" className="text-sm font-medium text-muted-foreground">
                                Field Label
                            </label>
                            <Input
                                id="edit-field-label"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                disabled={loading}
                                className="border border-border bg-background text-foreground placeholder-muted-foreground focus:ring-ring"
                            />
                        </div>

                        {/* Type */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-muted-foreground">
                                Field Type
                            </label>
                            <Select value={type} onValueChange={setType} disabled={loading}>
                                <SelectTrigger className="border border-border bg-background text-foreground focus:ring-ring">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent className="border border-border bg-card text-foreground">
                                    {FIELD_TYPES.map((ft) => (
                                        <SelectItem key={ft.value} value={ft.value} className="hover:bg-accent focus:bg-accent">
                                            {ft.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Position (Order) */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="edit-field-position" className="text-sm font-medium text-muted-foreground">
                                Position / Sort Order
                            </label>
                            <Input
                                id="edit-field-position"
                                type="number"
                                min="0"
                                step="1"
                                value={position}
                                onChange={(e) => setPosition(Number(e.target.value))}
                                disabled={loading}
                                className="border border-border bg-background text-foreground placeholder-muted-foreground focus:ring-ring"
                            />
                            <span className="text-[10px] text-muted-foreground leading-none">
                                Lower numbers appear first.
                            </span>
                        </div>

                        {/* Width */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-muted-foreground">
                                Display Width
                            </label>
                            <Select value={width} onValueChange={setWidth} disabled={loading}>
                                <SelectTrigger className="border border-border bg-background text-foreground focus:ring-ring">
                                    <SelectValue placeholder="Select width" />
                                </SelectTrigger>
                                <SelectContent className="border border-border bg-card text-foreground">
                                    <SelectItem value="medium" className="hover:bg-accent focus:bg-accent">Medium (Half Width)</SelectItem>
                                    <SelectItem value="full" className="hover:bg-accent focus:bg-accent">Full Width</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Options list (if select/multiselect) */}
                        {showOptionsInput && (
                            <div className="flex flex-col gap-1.5 animate-in fade-in duration-200">
                                <label htmlFor="edit-field-options" className="text-sm font-medium text-muted-foreground">
                                    Options (comma-separated)
                                </label>
                                <Input
                                    id="edit-field-options"
                                    placeholder="e.g. Option 1, Option 2, Option 3"
                                    value={rawOptions}
                                    onChange={(e) => setRawOptions(e.target.value)}
                                    disabled={loading}
                                    className="border border-border bg-background text-foreground placeholder-muted-foreground focus:ring-ring"
                                />
                                <span className="text-[10px] text-muted-foreground leading-none">
                                    Separate each dropdown option with a comma.
                                </span>
                            </div>
                        )}

                        {/* Required Checkbox */}
                        <div className="flex items-center gap-2 pt-1.5">
                            <Checkbox
                                id="edit-field-required"
                                checked={required}
                                onCheckedChange={(val) => setRequired(!!val)}
                                disabled={loading}
                                className="border-border data-[state=checked]:bg-brand-primary"
                            />
                            <label htmlFor="edit-field-required" className="text-sm font-medium text-muted-foreground cursor-pointer select-none">
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
                            className="border border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={loading}
                            className="bg-brand-primary hover:bg-brand-primary/90 text-white shadow-md shadow-brand-primary/20"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
