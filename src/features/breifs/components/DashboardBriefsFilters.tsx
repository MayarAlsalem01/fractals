"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardBriefsFilters() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentStatus = searchParams.get("status") || "all";

    const handleTabChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "all") {
            params.delete("status");
        } else {
            params.set("status", value);
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <Tabs defaultValue={currentStatus} value={currentStatus} onValueChange={handleTabChange} className="w-fit ">
            <TabsList className="bg-transparent ">
                <TabsTrigger value="all">All Items</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
