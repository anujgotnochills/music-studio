import { useClient } from '../context/ClientContext'

export default function Footer() {
    const { footer } = useClient()

    return (
        <footer className="bg-neutral-900 py-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-white/30 text-xs">{footer.copyright}</p>
                <div className="flex gap-6">
                    {footer.links.map((link) => (
                        <a key={link.label} className="text-white/30 hover:text-brand text-xs transition-colors" href={link.href}>{link.label}</a>
                    ))}
                </div>
            </div>
        </footer>
    )
}
