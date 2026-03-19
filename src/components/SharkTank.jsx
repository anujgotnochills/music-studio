import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import stiLogo from '../assets/sti.png'
import stiBg from '../assets/stibg.png'

gsap.registerPlugin(ScrollTrigger)

export default function SharkTank() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.st-text', {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                }
            })

            // Add a subtle parallax effect to the huge background text
            gsap.fromTo('.st-bg-text',
                { x: '10%' },
                {
                    x: '-20%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative py-24 md:py-32 bg-black text-white overflow-hidden min-h-[60vh]">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full z-0">
                <img src={stiBg} alt="Shark Tank Background" className="w-full h-full object-cover opacity-90" />
                <div className="absolute inset-0 w-full h-full bg-brand/40 mix-blend-multiply" />
            </div>

            {/* Inner Flex Wrapper for Content to prevent absolute bg bugs */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

                {/* Massive background text */}
                <div className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap opacity-10 pointer-events-none st-bg-text z-0">
                    <span className="font-display text-[15vw] font-bold uppercase tracking-tighter mix-blend-overlay">SHARK TANK INDIA SHARK TANK</span>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
                    <div className="max-w-3xl mx-auto flex flex-col items-center">
                        <p className="st-text font-bold text-lg md:text-2xl uppercase tracking-[0.3em] mb-6 text-white/80 drop-shadow-md">
                            Proudly Featured On
                        </p>
                        <div className="st-text h-px w-24 bg-white/50 mx-auto mb-12" />

                        {/* Centered Logo */}
                        <div className="st-text w-80 md:w-96 lg:w-[32rem] xl:w-[40rem] max-w-full mx-auto pointer-events-none">
                            <img src={stiLogo} alt="Shark Tank India Logo" className="w-full h-auto drop-shadow-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
