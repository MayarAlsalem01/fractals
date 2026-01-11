'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Edit2 } from "lucide-react"
import { Category } from "@/db/schema"
import EditCategoryForm from "../forms/EditCategoryForm"

export default function EditCategoryDialog({ category }: { category: Category }) {
    return (
        <Dialog >
            <div className="">
                <DialogTrigger asChild >
                    <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                        <DialogDescription>
                            Edit category details. click <strong className="text-foreground/80">Update</strong> when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 ">
                        <EditCategoryForm category={category} />
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    )
}
