
export default function Blind({ className }: { className?: string }) {
    return (
        <div className={`absolute -top-4 left-0 w-full h-1/4 bg-linear-to-b from-transparent to-black rotate-180  blur-lg  shadow-2xl shadow-black  z-[-2] ${className}`}></div>
    )
}
