"use client";

import { useUpdateBriefStatus } from "../hooks/useUpdateBriefStatus";
import { Badge } from "@/components/ui/badge";

interface BriefStatusToggleProps {
    briefId: number;
    currentStatus: string;
}

export default function BriefStatusToggle({ briefId, currentStatus }: BriefStatusToggleProps) {
    const { isActive, isPending, handleToggle } = useUpdateBriefStatus(briefId, currentStatus);

    return (
        <Badge
            variant={isActive ? "default" : "secondary"}
            className={`cursor-pointer transition-all hover:scale-105 active:scale-95 ${
                isActive 
                ? "bg-green-500/20 text-green-500 border-green-500/50 hover:bg-green-500/30" 
                : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700"
            } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={isPending ? undefined : handleToggle}
        >
            {isPending ? "Updating..." : isActive ? "Active" : "Inactive"}
        </Badge>
    );
}
