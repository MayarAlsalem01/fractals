'use client'
import { useFieldArray, useFormContext, Controller, FieldArrayWithId } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import BlobUploader from '@/features/breifs/components/BlobUploader'; // Assuming this is the correct path
import { FieldValues } from 'react-hook-form';

// --- Type Definitions ---

// Define the structure for a single file item in the form array
type FileItem = {
    path: string; // The final path/URL of the uploaded file
};

// Define the type for the fields array with the correct structure
type FileField = FieldArrayWithId<FieldValues, string, "id"> & FileItem;


// Define the props for the MultiFileUploader component
interface MultiFileUploaderProps {
    name: string; // The field name in the form (e.g., 'files')
    maxFiles: number; // The maximum number of files allowed
}

// --- MultiFileUploader Component ---

export default function MultiFileUploader({ name = "files", maxFiles = 3 }: MultiFileUploaderProps) {

    return (
        <BlobUploader />
    );
}
