import { useGsapReveal } from '../hooks/useGsap'
import { useClient, resolveImage } from '../context/ClientContext'

export default function Gallery() {
    const { gallery } = useClient()
    const items = gallery.items.map(item => ({ ...item, src: resolveImage(item.image) }))
    const ref = useGsapReveal({ stagger: 0.1 })

    return (
        <section ref={ref} className="py-24 px-4 bg-neutral-950" id="gallery">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12 px-2">
                    <div>
                        <h3 data-reveal className="text-brand text-sm uppercase tracking-[0.2em] mb-2">{gallery.sectionLabel}</h3>
                        <h2 data-reveal className="font-display text-4xl text-white">{gallery.sectionTitle}</h2>
                    </div>
                    <a data-reveal className="hidden md:flex items-center gap-2 text-white/40 hover:text-brand text-sm uppercase tracking-wider transition-colors" href="#">
                        {gallery.viewAllText} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                </div>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                    {items.map((item) => (
                        <div key={item.label} data-reveal className="relative group overflow-hidden break-inside-avoid cursor-pointer rounded-lg">
                            <img alt={item.alt} className="w-full object-cover transition-transform duration-700 group-hover:scale-110" src={item.src} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                                <div>
                                    <span className="text-white font-display text-xl italic">{item.label}</span>
                                    <div className="h-px w-12 bg-brand mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
