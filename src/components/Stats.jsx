import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useClient } from '../context/ClientContext'

gsap.registerPlugin(ScrollTrigger)

function Counter({ end, suffix = '', label }) {
    const numRef = useRef(null)
    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(() => {
        if (!numRef.current || hasAnimated) return
        const obj = { val: 0 }
        gsap.to(obj, {
            val: end,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: numRef.current,
                start: 'top 85%',
                onEnter: () => setHasAnimated(true),
            },
            onUpdate: () => {
                if (numRef.current) {
                    numRef.current.textContent = Math.floor(obj.val).toLocaleString() + suffix
                }
            },
        })
    }, [end, suffix, hasAnimated])

    return (
        <div className="text-center">
            <p ref={numRef} className="font-display text-5xl md:text-6xl text-brand mb-2">0</p>
            <p className="text-xs text-white/40 uppercase tracking-widest">{label}</p>
        </div>
    )
}

export default function Stats() {
    const { stats } = useClient()

    return (
        <section className="py-20 px-6 bg-neutral-900 border-y border-white/5">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <Counter key={i} end={stat.end} suffix={stat.suffix} label={stat.label} />
                ))}
            </div>
        </section>
    )
}
