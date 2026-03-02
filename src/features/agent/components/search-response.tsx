'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Search, Clock, } from 'lucide-react';
import { TextUIPart } from 'ai';

interface SearchResponseProps {
    content: TextUIPart;
}

export function SearchResponse({ content }: SearchResponseProps) {

    return (
        <div className="my-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Search Header */}
            <div className="flex items-center gap-3 mb-3 px-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20">
                    <Search className="h-4 w-4 text-brand-secondary" />
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        Tools Results
                        <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 text-[10px] font-medium text-brand-tertiary dark:text-brand-tertiary border border-blue-200 dark:border-brand-tertiary">
                            Verified
                        </span>
                    </h4>

                </div>
            </div>

            {/* Main Content Card */}
            <div className="relative group overflow-hidden rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-xl dark:shadow-2xl/50 transition-all hover:border-blue-500/30 dark:hover:border-blue-500/30">
                {/* Subtle decorative background elements */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 h-32 w-32 bg-blue-500/5 blur-3xl rounded-full" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-32 w-32 bg-indigo-500/5 blur-3xl rounded-full" />

                <div className="relative p-6 md:p-8">
                    <article className="prose prose-zinc dark:prose-invert max-w-none prose-sm sm:prose-base">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h2: ({ node, ...props }) => (
                                    <h2 {...props} className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white mb-4 mt-0 border-b border-zinc-100 dark:border-zinc-800 pb-2 flex items-center gap-2" />
                                ),
                                p: ({ node, ...props }) => (
                                    <p {...props} className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4 last:mb-0" />
                                ),
                                strong: ({ node, ...props }) => (
                                    <strong {...props} className="font-bold text-brand-primary dark:text-blue-400 bg-blue-500/5 px-1 rounded" />
                                ),
                                ul: ({ node, ...props }) => (
                                    <ul {...props} className="space-y-2 mb-4 list-none pl-0" />
                                ),
                                li: ({ node, ...props }) => (
                                    <li className="group/item flex items-start gap-3 text-zinc-600 dark:text-zinc-300">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary/40 group-hover/item:bg-brand-primary transition-colors" />
                                        <span {...props} />
                                    </li>
                                ),
                                hr: ({ node, ...props }) => (
                                    <hr {...props} className="my-8 border-t border-zinc-200 dark:border-zinc-800 border-dashed" />
                                ),
                            }}
                        >
                            {content.text}
                        </ReactMarkdown>
                    </article>
                </div>

                {/* Footer info */}
                <div className="px-6 py-3 bg-zinc-50 dark:bg-zinc-900/80 border-t border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-400 uppercase tracking-widest">
                        <Clock className="h-3 w-3" />
                        Extracted via AI Tools
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-brand-primary uppercase tracking-widest">
                        System Response
                    </div>
                </div>
            </div>
        </div>
    );
}
