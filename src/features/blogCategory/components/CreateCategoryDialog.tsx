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
import { PlusCircle } from "lucide-react"
import CreateCategoryForm from "../forms/CreateCategoryForm"

export default function CreateCategoryDialog() {
    return (
        <Dialog >
            <div className="">
                <DialogTrigger asChild >
                    <Button type="button" className="font-semibold">
                        <PlusCircle className="w-5 h-5 mr-2" />
                        Create Category
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create new category</DialogTitle>
                        <DialogDescription>
                            Create a new category. click <strong className="text-foreground/80">Create</strong> when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 ">
                        <CreateCategoryForm />
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    )
}
