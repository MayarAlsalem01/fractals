// components/BlobUploader.tsx
"use client";
import React, { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { PutBlobResult } from "@vercel/blob";
import UploadImage from '../../../../public/assets/Upload.svg'
import Image from "next/image";
export default function BlobUploader({ onValueChnage, value }: { onValueChnage?: (value: string) => void, value?: string }) {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);

    async function handleUpload(e: React.FormEvent) {
        e.preventDefault();
        const file = fileRef.current?.files?.[0];
        if (!file) return setStatus("Choose a file first");

        // client-side validation (fast UX):
        const allowed = ["image/png", "image/jpeg", "image/webp", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        if (!allowed.includes(file.type)) return setStatus("File type not allowed");
        if (file.size > 50 * 1024 * 1024) return setStatus("File too large (max 50MB)");

        try {
            setStatus("Uploading...");
            // upload(...) will:
            //  1) call your server route (/api/blob/upload) to request a client token
            //  2) upload directly to Vercel Blob
            // clientPayload is optional (you can send JSON that server will receive in onBeforeGenerateToken)
            const res = await upload(file.name, file, {
                access: "public",                 // or 'private' depending on your needs
                handleUploadUrl: "/api/upload",
                multipart: true,
                clientPayload: JSON.stringify({ size: file.size, userId: "current-user-id" }),
            });

            setBlob(res);
            setStatus("Uploaded!");
            onValueChnage?.(res.pathname)
            // res.url is the public URL (if you used public access)
            console.log("Blob result:", res);
        } catch (err: any) {
            console.error("Upload failed:", err);
            setStatus(err?.message || "Upload failed");
        }
    }

    return (
        <form onSubmit={handleUpload} className="flex flex-col items-start  ">
            <input ref={fileRef} id="fileInput" type="file" accept=".png,.jpg,.jpeg,.webp,.pdf,.doc,.docx" onChange={handleUpload} disabled={blob !== null} className="hidden" />
            <div className="flex justify-between items-centerpy-2 max-w-full border-accent-foreground/30 rounded rounded-tl-2xl rounded-br-2xl border px-4 py-4" >
                <label htmlFor="fileInput" className="text-center">
                    <Image src={UploadImage} alt="upload" className="w-12 " />
                </label>
            </div>
            {status && <p>{status}</p>}
            <p className="text-muted text-xs mt-2 truncate max-w-full"> {value}</p>
        </form>
    );
}
