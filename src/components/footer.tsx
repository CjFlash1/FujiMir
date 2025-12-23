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

    return (
        <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center space-x-6 md:order-2">
                    {instagram && (
                        <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-500">
                            <span className="sr-only">Instagram</span>
                            <Instagram className="h-6 w-6" />
                        </a>
                    )}
                    {facebook && (
                        <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-500">
                            <span className="sr-only">Facebook</span>
                            <Facebook className="h-6 w-6" />
                        </a>
                    )}
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8 md:order-1">
                    <p className="text-center text-base text-slate-500">
                        &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
                        <Link href="/p/about" className="hover:text-primary-600 transition-colors">{t('nav.about')}</Link>
                        <Link href="/p/contact" className="hover:text-primary-600 transition-colors">{t('nav.contact')}</Link>
                        <Link href="/pricing" className="hover:text-primary-600 transition-colors">{t('nav.pricing')}</Link>
                    </div>
                    <p className="text-sm font-bold text-primary-700">
                        {getSetting('contact_phone')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
