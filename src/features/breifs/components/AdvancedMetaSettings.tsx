'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface MetaConfig {
    placeholder: string;
    hint: string;
    defaultValue: string;
    minLength: string;
    maxLength: string;
    min: string;
    max: string;
    regex: string;
    regexMessage: string;
    styleType: string;
}

interface AdvancedMetaSettingsProps {
    type: string;
    metaConfig: MetaConfig;
    onChange: (updated: MetaConfig) => void;
}

export default function AdvancedMetaSettings({ type, metaConfig, onChange }: AdvancedMetaSettingsProps) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const updateField = (key: keyof MetaConfig, value: string) => {
        onChange({
            ...metaConfig,
            [key]: value,
        });
    };

    return (
        <div className="border-t border-zinc-800 pt-3">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center justify-between w-full hover:bg-zinc-900 text-zinc-300 text-xs px-2 cursor-pointer"
            >
                <span>Advanced Settings (Placeholder, Hints, Validations)</span>
                {showAdvanced ? <ChevronUp className="h-4 w-4 text-brand-secondary" /> : <ChevronDown className="h-4 w-4 text-brand-secondary" />}
            </Button>

            {showAdvanced && (
                <div className="space-y-3 pt-3 pl-1 pr-1 animate-in slide-in-from-top-2 duration-200">
                    {/* Placeholder */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="field-placeholder" className="text-xs text-zinc-400">Placeholder Text</label>
                        <Input
                            id="field-placeholder"
                            placeholder="Enter input placeholder"
                            value={metaConfig.placeholder}
                            onChange={(e) => updateField("placeholder", e.target.value)}
                            className="border border-zinc-850 bg-zinc-900 text-zinc-200 text-xs placeholder-zinc-600 h-8"
                        />
                    </div>

                    {/* Hint */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="field-hint" className="text-xs text-zinc-400">Hint / Helper Text</label>
                        <Input
                            id="field-hint"
                            placeholder="Under-input instruction text"
                            value={metaConfig.hint}
                            onChange={(e) => updateField("hint", e.target.value)}
                            className="border border-zinc-850 bg-zinc-900 text-zinc-200 text-xs placeholder-zinc-600 h-8"
                        />
                    </div>

                    {/* Default Value */}
                    {type !== "file" && (
                        <div className="flex flex-col gap-1">
                            <label htmlFor="field-default" className="text-xs text-zinc-400">Default Value</label>
                            <Input
                                id="field-default"
                                placeholder="Default preset value"
                                value={metaConfig.defaultValue}
                                onChange={(e) => updateField("defaultValue", e.target.value)}
                                className="border border-zinc-850 bg-zinc-900 text-zinc-200 text-xs placeholder-zinc-600 h-8"
                            />
                        </div>
                    )}

                    {/* Text-specific: minLength, maxLength, regex, regexMessage */}
                    {["text", "textarea", "email"].includes(type) && (
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="field-minlen" className="text-xs text-zinc-400">Min Length</label>
                                <Input
                                    id="field-minlen"
                                    type="number"
                                    min="0"
                                    placeholder="e.g. 5"
                                    value={metaConfig.minLength}
                                    onChange={(e) => updateField("minLength", e.target.value)}
                                    className="border border-zinc-850 bg-zinc-900 text-zinc-200 text-xs placeholder-zinc-600 h-8"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="field-maxlen" className="text-xs text-zinc-400">Max Length</label>
                                <Input
                                    id="field-maxlen"
                                    type="number"
                                    min="0"
                                    placeholder="e.g. 250"
                                    value={metaConfig.maxLength}
                                    onChange={(e) => updateField("maxLength", e.target.value)}
                                    className="border border-zinc-850 bg-zinc-900 text-zinc-200 text-xs placeholder-zinc-600 h-8"
                                />
                            </div>
                            <div className="col-span-2 flex flex-col gap-1">
                                <label htmlFor="field-regex" className="text-xs text-zinc-400">Regex Validation Pattern</label>
                                <Input
                                    id="field-regex"
                                    placeholder="e.g. ^\+963[0-9]{9}$"
                                    value={metaConfig.regex}
                                    onChange={(e) => updateField("regex", e.target.value)}
                                    className="border border-zinc-850 bg-zinc-900 text-zinc-200 text-xs placeholder-zinc-600 h-8"
                                />
                            </div>
                            <div className="col-span-2 flex flex-col gap-1">
                                <label htmlFor="field-regexmsg" className="text-xs text-zinc-400">Regex Error Message</label>
                                <Input
                                    id="field-regexmsg"
                                    placeholder="Message to display if pattern fails"
                                    value={metaConfig.regexMessage}
                                    onChange={(e) => updateField("regexMessage", e.target.value)}
                                    className="border border-zinc-850 bg-zinc-900 text-zinc-200 text-xs placeholder-zinc-600 h-8"
                                />
                            </div>
                        </div>
                    )}

                    {/* Number-specific: min, max */}
                    {type === "number" && (
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="field-minval" className="text-xs text-zinc-400">Min Value</label>
                                <Input
                                    id="field-minval"
                                    type="number"
                                    placeholder="e.g. 0"
                                    value={metaConfig.min}
                                    onChange={(e) => updateField("min", e.target.value)}
                                    className="border border-zinc-850 bg-zinc-900 text-zinc-200 text-xs placeholder-zinc-600 h-8"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="field-maxval" className="text-xs text-zinc-400">Max Value</label>
                                <Input
                                    id="field-maxval"
                                    type="number"
                                    placeholder="e.g. 1000"
                                    value={metaConfig.max}
                                    onChange={(e) => updateField("max", e.target.value)}
                                    className="border border-zinc-850 bg-zinc-900 text-zinc-200 text-xs placeholder-zinc-600 h-8"
                                />
                            </div>
                        </div>
                    )}

                    {/* File-specific: max */}
                    {type === "file" && (
                        <div className="flex flex-col gap-1">
                            <label htmlFor="field-maxfiles" className="text-xs text-zinc-400">Max Files Upload Limit</label>
                            <Input
                                id="field-maxfiles"
                                type="number"
                                min="1"
                                placeholder="e.g. 3"
                                value={metaConfig.max}
                                onChange={(e) => updateField("max", e.target.value)}
                                className="border border-zinc-850 bg-zinc-900 text-zinc-200 text-xs placeholder-zinc-600 h-8"
                            />
                        </div>
                    )}

                    {/* selectComboBox-specific: styleType */}
                    {type === "selectComboBox" && (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-zinc-400">ComboBox Display Style</label>
                            <Select value={metaConfig.styleType} onValueChange={(val) => updateField("styleType", val)}>
                                <SelectTrigger className="border border-zinc-850 bg-zinc-900 text-zinc-200 text-xs h-8">
                                    <SelectValue placeholder="Select style" />
                                </SelectTrigger>
                                <SelectContent className="border border-zinc-800 bg-zinc-950 text-zinc-100">
                                    <SelectItem value="default" className="text-xs hover:bg-zinc-855 focus:bg-zinc-800">Default Radio List</SelectItem>
                                    <SelectItem value="verticalComboGradient" className="text-xs hover:bg-zinc-855 focus:bg-zinc-800">Vertical Gradient Swatches</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
