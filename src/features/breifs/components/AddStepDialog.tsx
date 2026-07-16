'use client'

import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import createBriefStepAction from "../actions/createBriefStepAction";

interface AddStepDialogProps {
    templateId: number;
}

export default function AddStepDialog({ templateId }: AddStepDialogProps) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error("Step title cannot be empty");
            return;
        }

        setLoading(true);
        try {
            const res = await createBriefStepAction({ templateId, title: title.trim() });
            if (res.ok) {
                toast.success("Step created successfully!");
                setTitle("");
                setOpen(false);
            } else {
                toast.error(res.error?.message || "Failed to create step");
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
                    size="icon" 
                    className="h-9 w-9 rounded-lg border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100 transition-all hover:scale-105 active:scale-95"
                    title="Add new step"
                >
                    <Plus className="h-5 w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border border-zinc-800 bg-zinc-950 text-zinc-100">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-zinc-100">Add New Step</DialogTitle>
                        <DialogDescription className="text-zinc-400 text-sm">
                            Create a new step (section) for this brief template.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="step-title" className="text-sm font-medium text-zinc-300">
                                Step Title
                            </label>
                            <Input
                                id="step-title"
                                placeholder="e.g. Project Scope, Assets & Branding"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={loading}
                                className="border border-zinc-800 bg-zinc-900 text-zinc-100 placeholder-zinc-500 focus:ring-zinc-700"
                            />
                        </div>
                    </div>
                    <DialogFooter>
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
                            {loading ? "Creating..." : "Create Step"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
