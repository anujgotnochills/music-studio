import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const frameCount = 120
// Make sure path leads to /animation/ezgif-frame-001.jpg
const currentFrame = (index) => `/animation/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`

export default function CanvasScroll() {
    const canvasRef = useRef(null)
    const containerRef = useRef(null)
    const [imagesLoaded, setImagesLoaded] = useState(0)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const context = canvas.getContext('2d', { alpha: false }) // Performance opt
        const images = []
        let loaded = 0
        const animationObj = { frame: 0 }

        const render = (img) => {
            if (!img || !canvas) return
            const hRatio = canvas.width / img.width
            const vRatio = canvas.height / img.height
            const ratio = Math.max(hRatio, vRatio)
            const centerShift_x = (canvas.width - img.width * ratio) / 2
            const centerShift_y = (canvas.height - img.height * ratio) / 2
            
            context.fillStyle = '#0a0a0f'
            context.fillRect(0, 0, canvas.width, canvas.height)
            context.drawImage(img, 0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio)
        }

        // Set canvas size to window size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            if (images.length > 0 && images[Math.round(animationObj.frame)]) {
                render(images[Math.round(animationObj.frame)])
            }
        }

        // Preload images
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image()
            img.src = currentFrame(i)
            img.onload = () => {
                loaded++
                setImagesLoaded(loaded)
                if (i === 1) render(img) // initial draw
            }
            images.push(img)
        }

        const ctx = gsap.context(() => {
            gsap.to(animationObj, {
                frame: frameCount - 1,
                snap: 'frame',
                ease: 'none', // linear scrub
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=400%', // 4 times height for scroll depth
                    scrub: 0.5,    // smooth scrubbing
                    pin: true,     // pin section
                },
                onUpdate: () => render(images[Math.round(animationObj.frame)])
            })
        }, containerRef)

        window.addEventListener('resize', resizeCanvas)
        resizeCanvas()

        return () => {
            ctx.revert()
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [])

    return (
        <section ref={containerRef} className="relative h-screen bg-black w-full overflow-hidden z-10 border-b border-white/5" id="studio">
            {imagesLoaded < frameCount && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-neutral-950 text-brand font-display text-sm tracking-widest uppercase">
                    <span>Loading Studio... {Math.round((imagesLoaded / frameCount) * 100)}%</span>
                </div>
            )}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 text-center z-10">
                <h2 className="text-white font-display text-6xl md:text-8xl lg:text-9xl font-bold mix-blend-overlay opacity-90 tracking-tighter filter drop-shadow-2xl">
                    THE STUDIO
                </h2>
                <p className="text-white mt-4 text-xs md:text-sm tracking-[0.4em] mix-blend-overlay uppercase">
                    Scroll to Explore
                </p>
            </div>
        </section>
    )
}
