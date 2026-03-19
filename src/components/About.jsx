import { useClient, resolveImage } from '../context/ClientContext'

export default function About() {
    const { about } = useClient()
    const aboutImage = resolveImage(about.image)

    return (
        <section className="py-24 px-6 md:px-12 bg-neutral-900 border-y border-white/5" id="about">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                {/* Image */}
                <div className="flex-1 order-2 md:order-1 relative">
                    <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-brand/50" />
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-brand/50" />
                    <img
                        alt="Studio interior"
                        className="w-full aspect-[4/5] object-cover brightness-90 hover:brightness-100 transition-all duration-700"
                        src={aboutImage}
                    />
                </div>
                {/* Text */}
                <div className="flex-1 order-1 md:order-2">
                    <h3 className="text-brand text-sm uppercase tracking-[0.2em] mb-4">{about.sectionLabel}</h3>
                    <h2 className="font-display text-4xl md:text-6xl text-white mb-8 leading-tight">
                        {about.title} <span className="italic text-brand/90">{about.titleAccent}</span>
                    </h2>
                    <div className="space-y-6 text-white/50 text-lg font-light leading-relaxed">
                        {about.paragraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                    <div className="mt-10 flex gap-12">
                        {about.stats.map((stat) => (
                            <div key={stat.label}>
                                <p className="font-display text-4xl text-brand">{stat.value}</p>
                                <p className="text-xs text-white/40 uppercase tracking-wider mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
