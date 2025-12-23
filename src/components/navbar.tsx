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

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-3">
                            <img src="/logo.png" alt="Fujimir" className="h-10 w-auto" />
                            <div className="flex flex-col">
                                <span className="font-bold text-lg tracking-tight text-primary-700 leading-none">
                                    {getSetting('site_name', 'Fujimir')}
                                </span>
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest leading-none mt-0.5">
                                    Online Photo Lab
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                        <Link href="/upload" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">
                            {t('nav.upload')}
                        </Link>
                        <Link href="/pricing" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">
                            {t('nav.pricing')}
                        </Link>
                        <Link href="/p/about" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">
                            {t('nav.about')}
                        </Link>
                        <Link href="/p/contact" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">
                            {t('nav.contact')}
                        </Link>

                        <div className="flex items-center space-x-2 border-l pl-4 ml-4">
                            <button onClick={() => setLang('uk')} className={`text-sm font-medium ${lang === 'uk' ? 'text-primary-600' : 'text-slate-400'}`}>UA</button>
                            <span className="text-slate-300">|</span>
                            <button onClick={() => setLang('ru')} className={`text-sm font-medium ${lang === 'ru' ? 'text-primary-600' : 'text-slate-400'}`}>RU</button>
                            <span className="text-slate-300">|</span>
                            <button onClick={() => setLang('en')} className={`text-sm font-medium ${lang === 'en' ? 'text-primary-600' : 'text-slate-400'}`}>EN</button>
                        </div>

                        <Button size="sm" className="hidden md:flex">
                            {t('nav.signin')}
                        </Button>
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="sm:hidden mobile-menu">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link href="/upload" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800">
                            {t('nav.upload')}
                        </Link>
                        <Link href="/pricing" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800">
                            {t('nav.pricing')}
                        </Link>
                        <Link href="/about" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800">
                            {t('nav.about')}
                        </Link>
                        <Link href="/contact" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800">
                            {t('nav.contact')}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
