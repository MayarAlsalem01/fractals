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
    // Destructure control and setValue from useFormContext
    const { control, setValue } = useFormContext<FieldValues>();

    // useFieldArray to manage the array of file inputs
    // We explicitly type the fields array here to resolve the TypeScript error
    const { fields, append, remove } = useFieldArray({
        control,
        name: name,
    });

    // Cast fields to the correct type for easier use
    const typedFields = fields as FileField[];

    // Function to handle the completion of a single file upload
    const handleUploadComplete = (index: number, uploadedPath: string) => {
        // 1. Update the current field with the final path using setValue
        setValue(`${name}.${index}.path`, uploadedPath, { shouldDirty: true, shouldValidate: true });

        // 2. Check if we can add another slot
        if (typedFields.length < maxFiles) {
            // Append a new, empty slot for the next file
            append({ path: '' } as FileItem);
        }
    };

    // Function to handle the removal of a file slot
    const handleRemove = (index: number) => {
        remove(index);

        // Logic to ensure there is always an empty slot if maxFiles is not reached
        const hasEmptySlot = typedFields.some((field, i) => i !== index && field.path === '');

        if (typedFields.length - 1 < maxFiles && !hasEmptySlot) {
            // If removing the last item and we are under the limit, add an empty slot
            append({ path: '' } as FileItem);
        }
    };

    // Determine the number of completed uploads
    const completedUploads = typedFields.filter(field => field.path !== '').length;

    // Determine if the last field is an empty slot for a new upload
    const hasEmptySlot = typedFields.length > 0 && typedFields[typedFields.length - 1].path === '';

    // Determine if we should show the "Add File" button
    const canAddNewSlot = completedUploads < maxFiles && !hasEmptySlot;

    // Initial state: If no fields exist, add the first one
    if (typedFields.length === 0 && completedUploads < maxFiles) {
        append({ path: '' } as FileItem);
    }

    return (
        <div className="space-y-4">
            {/* Render the list of uploaded files and the current upload slot */}
            {typedFields.map((field, index) => {
                const isCompleted = field.path !== '';

                return (
                    <div key={field.id} className="flex items-center gap-2 p-2 border rounded-lg">
                        <div className="flex-1">
                            {/* Render the BlobUploader for the current slot */}
                            <Controller
                                control={control}
                                name={`${name}.${index}.path`}
                                render={({ field: { onChange } }) => (
                                    <BlobUploader
                                        // Pass the onChange handler to update the form value
                                        onValueChnage={(uploadedPath) => {
                                            // 1. Update the form value and trigger slot logic
                                            handleUploadComplete(index, uploadedPath);
                                        }}
                                    // Disable the uploader if the slot is already completed

                                    // Pass the current value for display/preview

                                    />
                                )}
                            />
                        </div>

                        {/* Remove Button for completed uploads */}
                        {isCompleted && (
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => handleRemove(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                );
            })}

            {/* Button to add a new file slot (only shown if no empty slot exists and limit not reached) */}
            {canAddNewSlot && (
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ path: '' } as FileItem)}
                    disabled={typedFields.length >= maxFiles}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another File ({completedUploads}/{maxFiles})
                </Button>
            )}

            {/* Display max file info */}
            <p className="text-xs text-muted-foreground">
                Maximum files allowed: {maxFiles}
            </p>
        </div>
    );
}
