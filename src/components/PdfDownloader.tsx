'use client'
import { DownloadIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import getBriefAttrubiteValuesByIdAction from "@/features/breifs/actions/getBriefAttrubiteValuesByIdAction";
import type { BriefData } from "./PdfGenerator";
import BriefPdf from './PdfGenerator';
import { pdf } from "@react-pdf/renderer";

export default function PdfDownloader({ briefId }: { briefId: number }) {
    const [data, setData] = useState<BriefData | null>(null)
    const [loading, setLoading] = useState(true)
    const [isGenerating, setIsGenerating] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getBriefAttrubiteValuesByIdAction(briefId)

                setData(result)
            } catch (error) {
                console.error("Failed to fetch brief data for PDF:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [briefId])

    const handleDownload = async () => {
        if (!data || isGenerating) return;

        setIsGenerating(true);
        try {
            // Generate PDF blob manually
            const blob = await pdf(<BriefPdf data={data} />).toBlob();

            // Create a download link and click it
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `brief-${briefId}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up the URL
            setTimeout(() => URL.revokeObjectURL(url), 100);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    if (loading) {
        return <Loader2 className="w-5 h-5 mr-2 animate-spin text-zinc-500" />
    }

    if (!data) {
        return null
    }

    return (
        <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="p-2 hover:bg-zinc-800 rounded-md transition-colors disabled:opacity-50"
            title="Download PDF"
        >
            {isGenerating ? (
                <Loader2 className="w-5 h-5 animate-spin text-zinc-500" />
            ) : (
                <DownloadIcon className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
            )}
        </button>
    )
}