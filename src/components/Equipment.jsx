import { useState } from 'react'
import { useClient, resolveImage } from '../context/ClientContext'

export default function Equipment() {
    const { equipment } = useClient()
    const rooms = equipment.rooms.map(r => ({ ...r, image: resolveImage(r.image) }))
    const [active, setActive] = useState(0)

    return (
        <section className="py-24 px-6 md:px-12 bg-neutral-900 border-y border-white/5" id="studio">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h3 className="text-brand text-sm uppercase tracking-[0.2em] mb-3">{equipment.sectionLabel}</h3>
                    <h2 className="font-display text-4xl md:text-5xl text-white font-medium">{equipment.sectionTitle}</h2>
                    <p className="text-white/40 mt-4 max-w-xl mx-auto">{equipment.sectionDescription}</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="flex-1 w-full max-w-lg mx-auto border border-white/10 rounded-lg overflow-hidden">
                        <div className="relative w-full aspect-[3/4] max-h-[500px] overflow-hidden">
                            <img src={rooms[active].image} alt={rooms[active].title} className="w-full h-full object-cover transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                                {rooms[active].specs.map((spec) => (
                                    <span key={spec} className="text-[10px] text-white/90 bg-black/60 backdrop-blur-sm px-3 py-1 border border-white/10 uppercase tracking-wider">{spec}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        {rooms.map((room, i) => (
                            <button key={room.id} onClick={() => setActive(i)}
                                className={`w-full text-left p-6 border transition-all duration-300 group rounded-lg ${active === i ? 'border-brand/50 bg-neutral-800/50 shadow-[0_0_30px_rgba(0,229,255,0.08)]' : 'border-white/10 bg-transparent hover:border-brand/30'}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className={`font-display text-xl ${active === i ? 'text-brand' : 'text-white'}`}>{room.title}</h4>
                                        <p className="text-white/40 text-sm mt-1">{room.subtitle}</p>
                                    </div>
                                    <span className={`material-symbols-outlined transition-colors ${active === i ? 'text-brand' : 'text-white/30'}`}>arrow_forward</span>
                                </div>
                                {active === i && (
                                    <>
                                        <p className="text-white/50 text-sm mt-3 leading-relaxed">{room.description}</p>
                                        <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-brand rounded-full w-full" /></div>
                                    </>
                                )}
                            </button>
                        ))}
                        <div className="pt-4 flex gap-8">
                            {equipment.highlights.map((h) => (
                                <div key={h.label}>
                                    <p className="font-display text-3xl text-brand">{h.value}</p>
                                    <p className="text-xs text-white/40 uppercase tracking-wider mt-1">{h.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
