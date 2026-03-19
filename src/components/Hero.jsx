import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useClient, resolveImage } from '../context/ClientContext'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
    const { hero, about } = useClient()
    const sectionRef = useRef(null)
    const imageRef = useRef(null)

    const heroImage = resolveImage(about.image)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('[data-hero-reveal]', {
                y: 80,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power4.out',
                delay: 0.3,
            })

            gsap.to(imageRef.current, {
                yPercent: 30,
                scale: 1.15,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.5,
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
            {/* Background Image with Parallax */}
            <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
                <img
                    ref={imageRef}
                    src={heroImage}
                    alt="Studio interior"
                    className="w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/30 to-neutral-950/95" />
            </div>

            {/* Floating audio waveform decoration */}
            <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-center gap-1 opacity-[0.06]">
                    {[...Array(60)].map((_, i) => (
                        <div
                            key={i}
                            className="w-1 bg-brand rounded-full"
                            style={{
                                height: `${20 + Math.sin(i * 0.3) * 80 + Math.random() * 40}px`,
                                animationDelay: `${i * 0.05}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-6 mt-16">
                <div data-hero-reveal className="h-px w-24 bg-brand mb-4 opacity-50" />
                <h2 data-hero-reveal className="text-white/70 font-body text-sm md:text-base uppercase tracking-[0.3em] font-bold">
                    {hero.subtitle}
                </h2>
                <h1 data-hero-reveal className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-tight tracking-tight">
                    {hero.headline} <span className="italic text-brand">{hero.headlineAccent}</span>
                </h1>
                <p data-hero-reveal className="font-display text-xl md:text-2xl text-white/60 italic max-w-2xl font-medium">
                    {hero.tagline}
                </p>
                <div data-hero-reveal className="mt-8 flex flex-col sm:flex-row gap-4">
                    <a
                        className="group px-8 py-4 bg-brand text-black font-bold text-sm uppercase tracking-widest hover:bg-brand-dark transition-all duration-300 min-w-[200px] text-center border border-brand relative overflow-hidden"
                        href={hero.ctaPrimary.href}
                    >
                        <span className="relative z-10">{hero.ctaPrimary.label}</span>
                        <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </a>
                    <a
                        className="group px-8 py-4 bg-transparent text-white font-bold text-sm uppercase tracking-widest hover:bg-brand hover:text-black transition-all duration-300 min-w-[200px] text-center border border-white/30 relative overflow-hidden"
                        href={hero.ctaSecondary.href}
                    >
                        <span className="relative z-10">{hero.ctaSecondary.label}</span>
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block text-white/40">
                <span className="material-symbols-outlined text-4xl">keyboard_arrow_down</span>
            </div>
        </section>
    )
}
