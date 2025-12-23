"use client";

import { useSettings } from "@/lib/settings-context";
import { useTranslation } from "@/lib/i18n";
import { Instagram, Facebook } from "lucide-react";
import Link from "next/link";

export function Footer() {
    const { getSetting } = useSettings();
    const { t } = useTranslation();
    const instagram = getSetting('social_instagram');
    const facebook = getSetting('social_facebook');
    const siteName = getSetting('site_name', 'Fujimir');
    const viberActive = getSetting('viber_active') === 'true';
    const telegramActive = getSetting('telegram_active') === 'true';
    const viberLink = getSetting('viber_link');
    const telegramLink = getSetting('telegram_link');

    return (
        <footer className="bg-[#c5b98e] border-t border-[#a69269]/30 mt-auto shadow-inner text-[#4c4c4c]">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center space-x-6 md:order-2">
                    {instagram && (
                        <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-[#4c4c4c]/70 hover:text-white transition-colors">
                            <span className="sr-only">Instagram</span>
                            <Instagram className="h-6 w-6" />
                        </a>
                    )}
                    {facebook && (
                        <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-[#4c4c4c]/70 hover:text-white transition-colors">
                            <span className="sr-only">Facebook</span>
                            <Facebook className="h-6 w-6" />
                        </a>
                    )}
                    {viberActive && viberLink && (
                        <a href={viberLink} className="text-[#4c4c4c]/70 hover:text-white transition-colors" title="Viber">
                            <span className="sr-only">Viber</span>
                            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                                <path d="M17.57 1.54C16.94.88 15.9 0 14.54 0c-1.37 0-1.8.88-2.54 2-1.12 1.63-.44 2.82-.44 2.82l1.39 1.34s-.45 1.5-1.54 3.19C10.32 10.95 9 12.06 9 12.06l-1.4-1.34s-1.19-.68-2.82.44c-1.12.75-2 1.18-2 2.54 0 1.36.88 2.4 1.54 3.03 2.14 2.14 5.75 3.39 9.38 3.39 4.3 0 7.31-2.12 9.38-4.22.66-.64 1.54-1.68 1.54-3.04 0-1.36-.88-1.79-2-2.54-1.63-1.12-2.82-.44-2.82-.44l-1.34 1.4s-1.5-.45-3.19-1.54c-1.61-1.04-2.73-2.35-2.73-2.35l1.34-1.39s.68-1.2-.44-2.83C12.35 1.74 11.9.89 10.54.89c-1.36 0-1.79.88-2.54 2-.75 1.12-1.18 2.54-1.18 2.54s0 1.94.89 3.88c.89 1.93 2.12 3.81 3.56 5.25 1.44 1.44 3.32 2.67 5.25 3.56 1.94.89 3.88.89 3.88.89s1.42-.43 2.54-1.18c1.12-.75 2-1.18 2-2.54s-.88-1.8-2-2.54l-2.82-1.39s-1.22-.44-.45 1.12c.75 1.63-.44 2.82-.44 2.82z" />
                            </svg>
                        </a>
                    )}
                    {telegramActive && telegramLink && (
                        <a href={telegramLink} target="_blank" rel="noopener noreferrer" className="text-[#4c4c4c]/70 hover:text-white transition-colors" title="Telegram">
                            <span className="sr-only">Telegram</span>
                            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.3.26-.54.26l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                            </svg>
                        </a>
                    )}
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8 md:order-1">
                    <p className="text-center text-sm font-bold uppercase tracking-wider text-[#4c4c4c] opacity-60">
                        &copy; {new Date().getFullYear()} {siteName}.
                    </p>
                    <div className="flex items-center gap-6 text-xs font-black uppercase tracking-widest text-[#4c4c4c]/80">
                        <Link href="/p/about" className="hover:text-white transition-colors">{t('nav.about')}</Link>
                        <Link href="/p/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link>
                        <Link href="/pricing" className="hover:text-white transition-colors">{t('nav.pricing')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
