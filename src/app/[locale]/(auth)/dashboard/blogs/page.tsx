import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import getBlogsAction from '@/features/blog/actions/getBlogsAction'
import { CreateBlogDialog } from '@/features/blog/components/CreateBlogDialog'
import DeleteBlogButton from '@/features/blog/components/DeleteBlogButton'
import { EditBlogDialog } from '@/features/blog/components/EditBlogDialog'
import { Link } from '@/i18n/navigation'
import { Edit2, Trash2 } from 'lucide-react'
import React from 'react'

export default async function page() {
    const blogs = await getBlogsAction()
    console.log(blogs)
    return (
        <div className='w-full'>
            <div className='w-full flex items-center justify-between '>
                <h1 className='text-4xl font-bold font-gravesend'>
                    Blogs
                </h1>
                <Button >
                    <Link href='/dashboard/blogs/create'>
                        Create Blog
                    </Link>
                </Button>
            </div>
            <div className='rounded-lg shadow-sm mt-8'>

                {
                    blogs.data && blogs.data?.length > 0 && <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>title</TableHead>
                                <TableHead>descrption</TableHead>
                                <TableHead className="text-right w-[200px] ">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {
                                blogs.data.map((blog) => <TableRow key={blog.id}>
                                    <TableCell className="font-medium">{blog.id}</TableCell>
                                    <TableCell>{blog.title}</TableCell>
                                    <TableCell className='truncate max-w-xs '>{blog.short_description}</TableCell>
                                    <TableCell className="text-right flex justify-end">
                                        {/* <EditRoleDailog role={{
                                        name: role.name.ar,
                                        name_en: role.name.en,

                                    }}
                                        roleId={role.id} /> */}
                                        {/* <EditBlogDialog blog={blog} />
                                         */}
                                        <Link href={`/dashboard/blogs/update/${blog.id}`}>
                                            <Button variant="ghost" size="icon">
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <DeleteBlogButton blogId={blog.id} />
                                    </TableCell>
                                </TableRow>)
                            }
                        </TableBody>
                    </Table>
                }
            </div>
        </div >
    )
}
