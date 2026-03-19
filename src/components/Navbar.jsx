import { useState, useEffect } from 'react'
import { useClient } from '../context/ClientContext'

export default function Navbar() {
    const { brand, nav } = useClient()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > window.innerHeight * 0.8)
        }
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const closeMenu = () => setMenuOpen(false)

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${menuOpen ? 'bg-neutral-950/95 backdrop-blur-xl' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between h-20">
                        <div className={`flex-shrink-0 flex items-center gap-3 transition-opacity duration-500 ${scrolled ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full border-2 border-brand flex items-center justify-center">
                                    <span className="material-symbols-outlined text-brand text-sm">{brand.logo.icon}</span>
                                </div>
                                <span className="font-display text-lg font-bold text-white tracking-wider uppercase">
                                    {brand.logo.textBefore}<span className="text-brand">{brand.logo.textAccent}</span>
                                </span>
                            </div>
                        </div>
                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            {nav.links.map(l => (
                                <a key={l.label} className="text-sm font-bold uppercase tracking-widest transition-colors text-white/70 hover:text-brand" href={l.href}>{l.label}</a>
                            ))}
                            <a className="px-6 py-2 font-bold text-sm uppercase tracking-wider transition-colors duration-300 rounded-sm bg-brand text-black hover:bg-brand-dark" href={nav.cta.href}>
                                {nav.cta.label}
                            </a>
                        </div>
                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden transition-colors z-50 text-white hover:text-brand"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <span className="material-symbols-outlined text-3xl">
                                {menuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 bg-neutral-950/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}>
                {nav.links.map((l, i) => (
                    <a
                        key={l.label}
                        className="font-display text-3xl text-white hover:text-brand transition-colors uppercase tracking-widest"
                        href={l.href}
                        onClick={closeMenu}
                        style={{ transitionDelay: menuOpen ? `${i * 80}ms` : '0ms', transform: menuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: menuOpen ? 1 : 0 }}
                    >
                        {l.label}
                    </a>
                ))}
                <a
                    className="mt-4 px-10 py-4 bg-brand text-black font-bold text-sm uppercase tracking-widest hover:bg-brand-dark transition-all duration-300"
                    href={nav.cta.href}
                    onClick={closeMenu}
                    style={{ transitionDelay: menuOpen ? '240ms' : '0ms', transform: menuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: menuOpen ? 1 : 0 }}
                >
                    {nav.cta.label}
                </a>
            </div>
        </>
    )
}
