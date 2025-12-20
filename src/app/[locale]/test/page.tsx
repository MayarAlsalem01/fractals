
export default function page() {

    return (
        <div className="mt-12 mx-24">
            <button className="sec-btn px-3 py-1 border border-accent-foreground/30 rounded-br-2xl rounded-tl-2xl  relative overflow-hidden">
                Previous
                <div className=" btn-pink-background w-24 h-24 bg-radial from-brand-primary to-transparent to-70% absolute top-5 left-0 hover:-left-4 rounded-full blur  transition-all -z-10 duration-300" />
                <div className="w-24 h-24 bg-radial btn-cyan-background from-brand-secondary to-transparent to-40% absolute -top-16 -right-14 rounded-full blur transition-all -z-10 duration-300" />
                <div className="w-24 h-24 btn-blue-background bg-radial from-brand-tertiary to-transparent to-40% absolute -top-16 -right-2 rounded-full blur transition-all -z-10 duration-300" />
            </button>
        </div>
    )
}
