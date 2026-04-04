"use client";

import { useTransition } from "react";
import { updateBriefStatus } from "../actions/updateBriefStatusAction";
import { toast } from "sonner";

export function useUpdateBriefStatus(briefId: number, currentStatus: string) {
    const [isPending, startTransition] = useTransition();

    const isActive = currentStatus === "active";

    const handleToggle = () => {
        const newStatus = isActive ? "inactive" : "active";
        
        startTransition(async () => {
            const result = await updateBriefStatus(briefId, newStatus);
            if (result.success) {
                toast.success(`Brief set to ${newStatus}`);
            } else {
                toast.error(result.error || "Failed to update status.");
            }
        });
    };

    return {
        isActive,
        isPending,
        handleToggle
    };
}
