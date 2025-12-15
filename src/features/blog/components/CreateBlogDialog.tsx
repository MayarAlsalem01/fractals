'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import CreateBlogForm from "../forms/CreateBlogForm"
import { PlusCircle } from "lucide-react"

export function CreateBlogDialog() {

    return (
        <Dialog >
            <div className="">
                <DialogTrigger asChild >
                    <Button type="button" className="font-semibold">
                        <PlusCircle className="w-5 h-5 mr-2" />
                        Create Blog
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[925px]">
                    <DialogHeader>
                        <DialogTitle>Create new category</DialogTitle>
                        <DialogDescription>
                            Create a new category. click <strong className="text-foreground/80">Create</strong> when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 ">
                        <CreateBlogForm />
                    </div>

                </DialogContent>
            </div>
        </Dialog>
    )
}
