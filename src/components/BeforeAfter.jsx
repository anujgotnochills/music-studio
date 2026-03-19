import { useState, useRef } from 'react'
import beforeImg from '../assets/before.png'
import afterImg from '../assets/after.png'

const transformations = [
    {
        id: 1,
        title: 'Hair Transformation',
        subtitle: 'Keratin + Balayage',
        before: beforeImg,
        after: afterImg,
    },
    {
        id: 2,
        title: 'Bridal Makeover',
        subtitle: 'Complete Bridal Package',
        before: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvcETWVbplyfn9jqx41wztzUigCqrKMrUPZesR37E9J8m1yiPEDvwbtf8PH_gDTGWGDpy_r822ui0OQa4ay1MLK1lTR2Q3JAyxi7wjuje1rBnZNWGFA84Dowlznr5v4NxImWf_dDi39aqyZKpFR3Rto3BkC1u_OgHrtzPszuO5ctYf7dmUzDfhfa4LPkeHwmGYJ2XgBDQdrm0K--gYnBcxj1THGg6kf3CfrnKEziJ7IBn4pF_dqBHnoo4WJP862yCL7P9Wwa2Uz5Q',
        after: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtL2la1dHUU0ZYorvFS2m1fFaC9dMRPFB1s2T75HTKsUZ-n5SUldMjTgg4r8aiQ6eTo-ie5Fb2gLKFUyg_TmVb8sEr1IZMCEBGSWYHaUF9PmI_oEo6ltd86pRB2nob7pdhgVkKzR9V1jb2fFUtbbxGTu0AdDLqkpeq7fIGmzoN4kQsF8d7D6oTfXRWBoW_Br9nYcbdS5yjoMEdEMAD_nS_EF14uDYCAp4kfvDgZBfG5vOrKJ8Atte-keC4bbX1EzJnYPz0i-rHUi0',
    },
    {
        id: 3,
        title: 'Color Correction',
        subtitle: 'Global Color + Gloss',
        before: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALInl0d7TdqsueOSwppgcZvmjfDG8offkK_zN9jQDzYdBo6z_kC9DU3vhCR408eZqcftNGJBEWQ5NE8-Ps5zk4tL4I_epc6qf88Vf2vZiN88gyo6VKLobLBYfsnqbqQj3haTyCgaJgt3yn5QL0KrfR0fD1exrLVneOM8hgiA_cQfTyr3LWordsv4pxK1bnjQW5Pjlyq39oxXBPQYtpHpqYXaK02rwumsncAwtazUcBsVqe2buH8lrklWPlAe3Fpn9ERFgUGFGEnXk',
        after: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF5AbQGjMeUzlGYUQ_fGx8EA_GUWQfFAe-YBouf_bqBpJZUdIvkNaHSFRuooyvmCttEihHi-ub_iOXsAh9p1t7ZznPeIA-LDJjFDxz-S9wYhji39zAeL8520CVWuX_cnP2kqsWPCCutxyIQxJbLlgPjDW6fEPtAQirbenLv7Gq3UHcd1YZHhxJ4avJyLfu79p5ZmhIFw6sd-TZdpFC4CKm0kmfOJAeK7kaADXklRSr6hMrny47XkxH8W6LJ45scwe-aCqrPIoQCsg',
    },
]

function Slider({ before, after }) {
    const [sliderPos, setSliderPos] = useState(50)
    const containerRef = useRef(null)
    const isDragging = useRef(false)

    const handleMove = (clientX) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
        setSliderPos((x / rect.width) * 100)
    }

    const onMouseDown = () => { isDragging.current = true }
    const onMouseUp = () => { isDragging.current = false }
    const onMouseMove = (e) => { if (isDragging.current) handleMove(e.clientX) }
    const onTouchMove = (e) => { handleMove(e.touches[0].clientX) }

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-[3/4] max-h-[500px] overflow-hidden cursor-col-resize select-none"
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
            onTouchStart={onMouseDown}
            onTouchEnd={onMouseUp}
        >
            {/* After (full) */}
            <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />

            {/* Before (clipped) */}
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
                <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ width: `${100 / (sliderPos / 100)}%`, maxWidth: 'none' }} />
            </div>

            {/* Slider Line */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-brand z-10" style={{ left: `${sliderPos}%` }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-brand rounded-full flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-white text-lg">drag_handle</span>
                </div>
            </div>

            {/* Labels */}
            <span className="absolute top-4 left-4 bg-black/60 text-white text-xs uppercase tracking-widest px-3 py-1 z-20">Before</span>
            <span className="absolute top-4 right-4 bg-brand/90 text-white text-xs uppercase tracking-widest px-3 py-1 font-bold z-20">After</span>
        </div>
    )
}

export default function BeforeAfter() {
    const [active, setActive] = useState(0)

    return (
        <section className="py-24 px-6 md:px-12 bg-gray-50 border-y border-white/5" id="transformations">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h3 className="text-brand text-sm uppercase tracking-[0.2em] mb-3">Transformations</h3>
                    <h2 className="font-display text-4xl md:text-5xl text-black font-medium">Before & After</h2>
                    <p className="text-black/50 mt-4 max-w-xl mx-auto">Drag the slider to reveal the transformation. Every result is a testament to our artistry.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Slider */}
                    <div className="flex-1 w-full max-w-lg mx-auto border border-white/10 rounded-lg overflow-hidden">
                        <Slider before={transformations[active].before} after={transformations[active].after} />
                    </div>

                    {/* Transformation List */}
                    <div className="flex-1 space-y-4">
                        {transformations.map((t, i) => (
                            <button
                                key={t.id}
                                onClick={() => setActive(i)}
                                className={`w-full text-left p-6 border transition-all duration-300 group rounded-lg ${active === i
                                    ? 'border-brand/50 bg-white shadow-[0_0_30px_rgba(253,20,23,0.08)]'
                                    : 'border-white/10 bg-transparent hover:border-brand/30'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className={`font-display text-xl ${active === i ? 'text-brand' : 'text-black'}`}>
                                            {t.title}
                                        </h4>
                                        <p className="text-black/50 text-sm mt-1">{t.subtitle}</p>
                                    </div>
                                    <span className={`material-symbols-outlined transition-colors ${active === i ? 'text-brand' : 'text-black/30'}`}>
                                        arrow_forward
                                    </span>
                                </div>
                                {active === i && (
                                    <div className="mt-4 h-1 bg-black/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-brand rounded-full w-full" />
                                    </div>
                                )}
                            </button>
                        ))}

                        <div className="pt-4 flex gap-8">
                            <div>
                                <p className="font-display text-3xl text-brand">500+</p>
                                <p className="text-xs text-black/50 uppercase tracking-wider mt-1">Transformations</p>
                            </div>
                            <div>
                                <p className="font-display text-3xl text-brand">98%</p>
                                <p className="text-xs text-black/50 uppercase tracking-wider mt-1">Client Satisfaction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
