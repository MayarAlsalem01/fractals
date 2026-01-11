'use server'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import getAllBlogCategories from '@/features/blogCategory/actions/getAllBlogCategories'
import CreateCategoryDialog from '@/features/blogCategory/components/CreateCategoryDialog'
import DeleteCategoryButton from '@/features/blogCategory/components/DeleteCategoryButton'
import EditCategoryDialog from '@/features/blogCategory/components/EditCategoryDialog'
import React from 'react'

export default async function page() {
    const categories = await getAllBlogCategories()
    return (
        <div className='w-full'>
            <div className='w-full flex items-center justify-between '>
                <h1 className='text-4xl font-bold font-gravesend'>
                    Categories
                </h1>
                <CreateCategoryDialog />
            </div>
            <div className='rounded-lg shadow-sm mt-8'>
                {
                    categories.data && categories.data?.length > 0 ? <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Normalized Name</TableHead>
                                <TableHead className="text-right w-[200px] ">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                categories.data.map((category) => <TableRow key={category.id}>
                                    <TableCell className="font-medium">{category.id}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.normalizedName}</TableCell>
                                    <TableCell className="text-right flex justify-end">
                                        <EditCategoryDialog category={category} />
                                        <DeleteCategoryButton categoryId={category.id} />
                                    </TableCell>
                                </TableRow>)
                            }
                        </TableBody>
                    </Table> :
                        <div className="text-center p-4">No categories found</div>
                }
            </div>
        </div >
    )
}
