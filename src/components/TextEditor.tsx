'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Color from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { FontSize } from './FontSize'
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Heading3,
    Link as LinkIcon,
    Type,
    Palette,
    Undo,
    Redo
} from 'lucide-react'
import { ChangeEvent, useCallback } from 'react'
import { on } from 'events'

const TiptapEditor = ({ onChange, ...props }: React.ComponentProps<'input'>) => {

    const editor = useEditor({
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            // You can handle content updates here if needed
            // console.log(editor.getHTML())
            console.log('asd')
            onChange && onChange(editor.getHTML() as unknown as ChangeEvent<HTMLInputElement>)
        },
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-500 underline cursor-pointer',
                },
            }),
            TextStyle,
            Color,
            FontSize,
        ],
        content: '<p>Hello World! 🌎️</p>',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[200px] border p-4 rounded-md',
            },
        },
    })

    const setLink = useCallback(() => {
        const previousUrl = editor?.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        if (url === null) {
            return
        }

        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }, [editor])

    if (!editor) {
        return null
    }

    return (
        <div className="flex flex-col gap-4 w-full max-w-4xl  " >
            <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-accent'}`}
                    title="Bold"
                >
                    <Bold size={20} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-accent'}`}
                    title="Italic"
                >
                    <Italic size={20} />
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : 'hover:bg-accent'}`}
                    title="Heading 1"
                >
                    <Heading1 size={20} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : 'hover:bg-accent'}`}
                    title="Heading 2"
                >
                    <Heading2 size={20} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : 'hover:bg-accent'}`}
                    title="Heading 3"
                >
                    <Heading3 size={20} />
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    title="Bullet List"
                >
                    <List size={20} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    title="Ordered List"
                >
                    <ListOrdered size={20} />
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

                <button
                    onClick={setLink}
                    className={`p-2 rounded ${editor.isActive('link') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    title="Link"
                >
                    <LinkIcon size={20} />
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

                <div className="flex items-center gap-1">
                    <Type size={20} className="text-gray-500" />
                    <select
                        onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
                        className="p-1 border rounded bg-accent text-sm"
                        value={editor.getAttributes('textStyle').fontSize || '16px'}
                    >
                        <option value="12px">12px</option>
                        <option value="14px">14px</option>
                        <option value="16px">16px</option>
                        <option value="18px">18px</option>
                        <option value="20px">20px</option>
                        <option value="24px">24px</option>
                        <option value="30px">30px</option>
                        <option value="36px">36px</option>
                    </select>
                </div>

                <div className="flex items-center gap-1">
                    <Palette size={20} className="text-gray-500" />
                    <input
                        type="color"
                        onInput={(e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
                        value={editor.getAttributes('textStyle').color || '#000000'}
                        className="w-8 h-8 p-0 border-none bg-transparent cursor-pointer"
                        title="Text Color"
                    />
                </div>

                <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                    title="Undo"
                >
                    <Undo size={20} />
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                    title="Redo"
                >
                    <Redo size={20} />
                </button>
            </div>

            <EditorContent editor={editor} {...props} onChange={(e) => {
                console.log(e)
            }} />



        </div>
    )
}

export default TiptapEditor
