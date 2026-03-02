'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { MessageCircle, X } from 'lucide-react';
import ChatUi from './ChatUi';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <SheetTrigger asChild>
                                <Button
                                    size="icon"
                                    className="h-14 w-14 rounded-full bg-brand-primary hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 border border-white/10 backdrop-blur-md transition-all duration-300"
                                >
                                    <MessageCircle className="h-7 w-7 text-white" />
                                </Button>
                            </SheetTrigger>
                        </motion.div>
                    )}
                </AnimatePresence>

                <SheetContent
                    side="right"
                    className="w-full sm:max-w-md lg:max-w-3xl p-0 border-l border-white/10 bg-zinc-950/80 backdrop-blur-xl sm:rounded-l-2xl overflow-hidden"
                >
                    <SheetHeader className="px-6 py-4 border-b border-white/5 flex flex-row items-center justify-between bg-white/5">
                        <SheetTitle className="text-white flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Fractals AI
                        </SheetTitle>
                        {/* Close button is handled by SheetPrimitive.Close in default sheet, but we can customize or hide if needed */}
                    </SheetHeader>

                    <div className="h-[calc(100vh-65px)]">
                        <ChatUi className="h-full" />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
