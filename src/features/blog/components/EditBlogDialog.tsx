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
import { EditIcon, PlusCircle } from "lucide-react"
import { Blog } from "@/db/schema"
import EditBlogForm from "../forms/EditBlogForm"

export function EditBlogDialog({ blog }: { blog: Blog }) {

    return (
        <Dialog >
            <div className="">
                <DialogTrigger asChild >
                    <Button type="button" variant={'ghost'} size={'icon'} className="font-semibold ">
                        <EditIcon className="w-5 h-5 mr-2" />

                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[925px]">
                    <DialogHeader>
                        <DialogTitle>Edit Blog</DialogTitle>
                        <DialogDescription>
                            Edit a blog. click <strong className="text-foreground/80">Update</strong> when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 ">
                        <EditBlogForm blog={blog} />
                    </div>

                </DialogContent>
            </div>
        </Dialog>
    )
}
