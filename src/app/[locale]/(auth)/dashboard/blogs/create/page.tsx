import Editor from '@/components/TextEditor'
import CreateBlogForm from '@/features/blog/forms/CreateBlogForm'
import React from 'react'

export default function page() {
    return (
        <div>
            <p className='text-3xl font-semibold'>Create New Blog :</p>

            <CreateBlogForm />
        </div>
    )
}
