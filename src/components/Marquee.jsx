import { useClient } from '../context/ClientContext'

export default function Marquee() {
    const { marquee } = useClient()

    // Interleave items with separator
    const items = marquee.flatMap((item, i) =>
        i < marquee.length - 1 ? [item, '✦'] : [item, '✦']
    )

    return (
        <div className="bg-brand py-4 overflow-hidden whitespace-nowrap">
            <div className="flex animate-[marquee_30s_linear_infinite]">
                {[...items, ...items].map((item, i) => (
                    <span
                        key={i}
                        className={`text-black text-sm uppercase tracking-widest mx-6 font-bold ${item === '✦' ? 'text-black/50' : ''}`}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    )
}
