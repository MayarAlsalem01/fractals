'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useEffect, useRef, useState } from 'react';
import { SearchResponse } from './search-response';
import { cn } from '@/lib/utils';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatUiProps {
    className?: string;
}

export default function ChatUi({ className }: ChatUiProps) {
    const [input, setInput] = useState('');
    const [currentUrl, setCurrentUrl] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
    }, []);

    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chat',
            body: {
                current_url: currentUrl
            }
        }),
        onFinish: () => {
            scrollToBottom();
        }
    });

    const isLoading = status === 'submitted' || status === 'streaming';

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        sendMessage({ text: input });
        setInput('');
    };

    // Extract text content from message parts
    const getMessageText = (message: typeof messages[number]) => {
        return message.parts
            .filter(part => part.type === 'text')
            .map(part => part.text)
            .join('');
    };

    return (
        <div className={cn("flex flex-col h-full w-full", className)}>
            {/* Messages Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800"
            >
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6 text-zinc-500 space-y-4 opacity-50">
                        <div className="w-16 h-16 rounded-2xl bg-linear-to-tr from-brand-primary to-brand-tertiary flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <p className="font-medium text-lg">How can I help you today?</p>
                            <p className="text-xs">Ask about our services, projects, or brief submission.</p>
                        </div>
                    </div>
                )}

                {messages.map(message => (
                    <div key={message.id} className={cn(
                        "flex w-full",
                        message.role === 'user' ? "justify-end" : "justify-start"
                    )}>
                        <div className={cn(
                            "max-w-[95%] rounded-2xl p-4 text-sm",
                            message.role === 'user'
                                ? "bg-brand-primary text-white rounded-br-none"
                                : "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 rounded-bl-none border border-zinc-200 dark:border-zinc-700"
                        )}>
                            {message.role === 'user' ? (
                                <div>{getMessageText(message)}</div>
                            ) : (
                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                    {message.parts.map((part, i) => {
                                        if (part.type === 'text') {
                                            return <SearchResponse key={`${message.id}-${i}`} content={part} />;
                                        }
                                        return null;
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl rounded-bl-none p-4 border border-zinc-200 dark:border-zinc-700">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800">
                <form
                    onSubmit={handleSubmit}
                    className="relative flex items-center"
                >
                    <input
                        className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-full py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-brand-primary/20 outline-none"
                        value={input}
                        placeholder="Type a message..."
                        onChange={e => setInput(e.target.value)}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={isLoading || !input.trim()}
                        className="absolute right-1 top-1 h-8 w-8 rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
}