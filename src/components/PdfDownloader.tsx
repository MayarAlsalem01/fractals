'use client'
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DownloadIcon } from "lucide-react";
import dynamic from "next/dynamic";

export default function PdfDonwloader({ briefId }: { briefId: number }) {
    const BriefPdf = dynamic(() => import('./PdfGenerotro'))
    return (
        <PDFDownloadLink document={<BriefPdf briefId={briefId} />} fileName={`brief-${briefId}.pdf`}>
            {() =>
                <DownloadIcon className="w-5 h-5 mr-2" />
            }
        </PDFDownloadLink>
    )
}