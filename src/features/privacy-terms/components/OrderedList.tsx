export function OrderedList({ className, children }: { className?: string, children: React.ReactNode }) {
    return (
        <ol className={`mt-6 space-y-6 text-white list-decimal pl-6 marker:text-brand-primary marker:font-bold marker:text-2xl ${className}`}>
            {children}
        </ol>
    )
}
export function OrderedListItem({ children }: { children: React.ReactNode }) {
    return (
        <li >
            {children}
        </li>
    )
}
export function OrderedListTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-brand-primary font-bold  text-2xl   ">
            {children}

        </div>
    )
}
export function OrderListContent({ children }: { children: React.ReactNode }) {
    return (
        <div className="mt-2 text-base md:text-lg md:w-[60ch] leading-relaxed ">
            {children}
        </div>
    )
}
export function SubOrderedList({ className, children }: { className?: string, children: React.ReactNode }) {
    return (
        <ul className={`mt-4 !text-base md:!text-lg flex flex-col gap-2 list-disc marker:!text-base marker:text-white ${className}`}>
            {children}
        </ul>
    )
}
export function SubOrderedListItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="lg:w-[70ch] leading-relaxed">
            {children}
        </li>
    )
}
export function SubOrderedListTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className="font-semibold">
            {children}
        </div>
    )
}