import { useClient } from '../context/ClientContext'

const socialIcons = {
    youtube: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
    ),
    instagram: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.944 2.013 9.284 2 11.714 2h.601z" /></svg>
    ),
    facebook: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
    ),
    soundcloud: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.05-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.282c.013.06.045.094.104.094.057 0 .09-.038.104-.094l.2-1.282-.2-1.332c-.014-.057-.047-.094-.104-.094m1.8-1.16c-.067 0-.12.062-.12.126l-.2 2.448.2 2.397c0 .066.053.12.12.12.062 0 .114-.054.12-.12l.226-2.397-.226-2.448c-.006-.064-.058-.126-.12-.126m.92-.442c-.077 0-.138.067-.138.143l-.188 2.89.188 2.82c0 .078.06.14.138.14.075 0 .136-.062.142-.14l.21-2.82-.21-2.89c-.006-.076-.067-.143-.142-.143m.938-.388c-.085 0-.157.076-.157.16l-.17 3.278.17 3.126c0 .085.07.153.156.153.083 0 .15-.068.153-.153l.194-3.126-.194-3.278c-.003-.084-.07-.16-.153-.16m.995-.226c-.096 0-.173.084-.173.175l-.156 3.504.156 3.31c0 .096.077.168.173.168.093 0 .164-.072.17-.168l.173-3.31-.174-3.504c-.006-.091-.077-.175-.17-.175m1.05-.237c-.104 0-.187.088-.187.19l-.14 3.741.14 3.355c0 .101.083.187.186.187.1 0 .182-.086.186-.187l.162-3.355-.163-3.741c-.004-.103-.086-.19-.186-.19m1.03-.113c-.114 0-.2.098-.2.207l-.128 3.854.126 3.38c0 .11.086.2.2.2.11 0 .196-.09.2-.2l.143-3.38-.142-3.854c-.004-.109-.09-.207-.2-.207m1.067-.076c-.12 0-.213.104-.213.222l-.114 3.93.114 3.39c0 .118.093.217.213.217.117 0 .209-.1.213-.218l.128-3.39-.128-3.929c-.004-.118-.096-.222-.213-.222m1.072-.003c-.127 0-.228.112-.228.237l-.1 3.934.1 3.396c0 .126.101.228.228.228.124 0 .224-.102.228-.228l.114-3.396-.114-3.934c-.004-.125-.104-.237-.228-.237m3.39.16c-.095 0-.188.013-.276.038-.157-1.773-1.663-3.16-3.49-3.16-.447 0-.88.089-1.272.247-.147.06-.186.12-.186.24v6.5c0 .125.096.23.218.24H20.8c1.767 0 3.2-1.433 3.2-3.2 0-1.77-1.433-3.2-3.2-3.2" /></svg>
    ),
}

export default function Contact() {
    const { contact, client } = useClient()

    return (
        <section className="py-24 px-6 md:px-12 bg-neutral-950" id="contact">
            <div className="max-w-7xl mx-auto bg-neutral-900/50 rounded-lg overflow-hidden flex flex-col lg:flex-row border border-white/10 shadow-xl backdrop-blur-sm">
                {/* Booking Form */}
                <div className="flex-1 p-8 md:p-12 lg:p-16">
                    <h3 className="text-brand text-sm uppercase tracking-[0.2em] mb-3">{contact.formHeading}</h3>
                    <h2 className="font-display text-3xl text-white mb-8">{contact.formTitle}</h2>
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-white/40">Name</label>
                                <input className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-brand transition-colors placeholder:text-white/20" placeholder="Your Name" type="text" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-white/40">Phone</label>
                                <input className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-brand transition-colors placeholder:text-white/20" placeholder="+91" type="tel" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-white/40">Service</label>
                            <select className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-brand transition-colors [&>option]:bg-neutral-900 [&>option]:text-white">
                                {contact.serviceOptions.map(opt => (<option key={opt}>{opt}</option>))}
                            </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-white/40">Preferred Date</label>
                                <input className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-brand transition-colors" type="date" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-white/40">Preferred Time</label>
                                <select className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-brand transition-colors [&>option]:bg-neutral-900 [&>option]:text-white">
                                    {contact.timeSlots.map(slot => (<option key={slot}>{slot}</option>))}
                                </select>
                            </div>
                        </div>
                        <div className="pt-6">
                            <button className="px-8 py-4 bg-brand w-full md:w-auto text-black font-bold text-sm uppercase tracking-widest hover:bg-brand-dark transition-all duration-300 rounded-sm" type="submit">
                                {contact.submitLabel}
                            </button>
                        </div>
                    </form>
                </div>
                {/* Contact Info */}
                <div className="lg:w-1/3 bg-neutral-800/50 p-8 md:p-12 lg:p-16 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between">
                    <div>
                        <h3 className="text-white font-display text-xl mb-8">{contact.info.heading}</h3>
                        <div className="space-y-8">
                            {contact.info.address && (
                                <div className="flex gap-4">
                                    <span className="material-symbols-outlined text-brand mt-1">location_on</span>
                                    <div>
                                        <p className="text-white font-medium mb-1">Address</p>
                                        <p className="text-white/40 text-sm leading-relaxed">{contact.info.address}</p>
                                    </div>
                                </div>
                            )}
                            <div className="flex gap-4">
                                <span className="material-symbols-outlined text-brand mt-1">call</span>
                                <div>
                                    <p className="text-white font-medium mb-1">Contact</p>
                                    <p className="text-white/40 text-sm leading-relaxed">
                                        {contact.info.phone}
                                        {contact.info.email && <><br />{contact.info.email}</>}
                                    </p>
                                </div>
                            </div>
                            {contact.info.whatsapp && (
                                <div className="flex gap-4">
                                    <span className="material-symbols-outlined text-brand mt-1">chat</span>
                                    <div>
                                        <p className="text-white font-medium mb-1">WhatsApp</p>
                                        <a
                                            className="text-brand/80 hover:text-brand text-sm transition-colors"
                                            href={`https://wa.me/${contact.info.whatsapp.replace(/[^0-9]/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Message us on WhatsApp
                                        </a>
                                    </div>
                                </div>
                            )}
                            <div className="flex gap-4">
                                <span className="material-symbols-outlined text-brand mt-1">schedule</span>
                                <div>
                                    <p className="text-white font-medium mb-1">Studio Hours</p>
                                    <p className="text-white/40 text-sm leading-relaxed">
                                        {contact.info.hours.map((h, i) => (<span key={i}>{h}{i < contact.info.hours.length - 1 && <br />}</span>))}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {contact.socials.length > 0 && (
                        <div className="mt-12">
                            <p className="text-xs uppercase tracking-wider text-white/30 mb-4">{contact.socialLabel}</p>
                            <div className="flex gap-4">
                                {contact.socials.map((s) => (
                                    <a key={s.platform} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-brand hover:border-brand transition-all" href={s.url} target="_blank" rel="noopener noreferrer">
                                        {socialIcons[s.platform] || null}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
