import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useClient } from '../context/ClientContext'

gsap.registerPlugin(ScrollTrigger)

export default function Artists() {
    const { artists } = useClient()
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.artist-text', {
                y: 100, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
            })
            gsap.fromTo('.artist-bg-text', { x: '10%' }, {
                x: '-20%', ease: 'none',
                scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative py-24 md:py-32 bg-neutral-950 text-white overflow-hidden min-h-[60vh]">
            <div className="absolute inset-0 w-full h-full z-0">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-brand/10 via-neutral-950 to-neutral-900" />
            </div>
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                <div className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.04] pointer-events-none artist-bg-text z-0">
                    <span className="font-display text-[15vw] font-bold uppercase tracking-tighter">{artists.backgroundText}</span>
                </div>
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
                    <div className="max-w-3xl mx-auto flex flex-col items-center">
                        <p className="artist-text font-bold text-lg md:text-2xl uppercase tracking-[0.3em] mb-6 text-white/80 drop-shadow-md">{artists.heading}</p>
                        <div className="artist-text h-px w-24 bg-brand/50 mx-auto mb-12" />
                        <div className="artist-text grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
                            {artists.items.map((artist) => (
                                <div key={artist.name} className="group flex flex-col items-center gap-3 p-6 border border-white/10 rounded-lg hover:border-brand/40 transition-all duration-500 hover:-translate-y-1 bg-white/[0.02] backdrop-blur-sm">
                                    <div className="w-16 h-16 rounded-full border-2 border-brand/30 group-hover:border-brand flex items-center justify-center transition-all duration-500">
                                        <span className="font-display text-2xl font-bold text-brand">{artist.initial}</span>
                                    </div>
                                    <h4 className="font-display text-base text-white font-medium">{artist.name}</h4>
                                    <p className="text-xs text-white/40 uppercase tracking-wider">{artist.genre}</p>
                                </div>
                            ))}
                        </div>
                        <p className="artist-text mt-12 text-white/30 text-sm italic">{artists.subtitle}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
