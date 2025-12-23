"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Camera } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "@/lib/i18n";
import { useSettings } from "@/lib/settings-context";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { t, lang, setLang } = useTranslation();
    const { getSetting } = useSettings();

    const navLinks = [
        { href: "/upload", label: t('nav.upload'), primary: true },
        { href: "/pricing", label: t('nav.pricing') },
        { href: "/p/about", label: t('nav.about') },
        { href: "/p/contact", label: t('nav.contact') },
        { href: "/p/help", label: t('nav.help') },
    ];

    return (
        <nav className="sticky top-0 z-50 flex flex-col shadow-md">
            {/* Top Tier: Green Gradient Header */}
            <div className="bg-gradient-to-b from-[#00b352] to-[#009846] text-white py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="bg-white p-1 rounded-sm shadow-sm transition-transform group-hover:scale-105">
                            <img src="/logo.png" alt="Fujimir" className="h-10 w-auto" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-2xl tracking-tighter leading-none">
                                <span className="text-white">FUJI</span>
                                <span className="text-white/90 font-light">.MIR</span>
                            </span>
                            <span className="text-[10px] text-white/80 uppercase tracking-[0.2em] font-bold mt-1">
                                {t('hero.title') || 'Online Photo Lab'}
                            </span>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-sm font-bold">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <span className="text-lg">📞</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white/70 text-[10px] uppercase leading-none mb-1">Contact Us</span>
                                <span className="leading-none">{getSetting('contact_phone', '(099) 215-03-17')}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setLang('uk')} className={`hover:text-white transition-colors ${lang === 'uk' ? 'text-white underline underline-offset-4' : 'text-white/60'}`}>UA</button>
                            <button onClick={() => setLang('ru')} className={`hover:text-white transition-colors ${lang === 'ru' ? 'text-white underline underline-offset-4' : 'text-white/60'}`}>RU</button>
                            <button onClick={() => setLang('en')} className={`hover:text-white transition-colors ${lang === 'en' ? 'text-white underline underline-offset-4' : 'text-white/60'}`}>EN</button>
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-white hover:bg-white/10 rounded-md"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Tier: Tan Menu Bar */}
            <div className="bg-[#c5b98e] border-b border-[#a69269]/30 hidden md:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-11">
                        <div className="flex space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "px-5 h-11 flex items-center text-sm font-bold transition-all uppercase tracking-wide",
                                        link.primary
                                            ? "bg-[#e31e24] text-white hover:bg-[#c31a1f] shadow-inner"
                                            : "text-[#4c4c4c] hover:bg-[#a69269]/20 hover:text-black"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <Link href="/fujiadmin" className="text-[10px] items-center text-[#4c4c4c]/50 hover:text-black font-bold uppercase transition-colors">
                            Admin Panel
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[#f3f1e9] border-b border-tan-dark overflow-hidden transition-all">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "block px-3 py-3 rounded-md text-base font-bold uppercase tracking-wide",
                                    link.primary
                                        ? "bg-accent text-white"
                                        : "text-[#4c4c4c] hover:bg-tan/20"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
