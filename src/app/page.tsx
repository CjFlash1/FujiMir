"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { useSettings } from "@/lib/settings-context";
import { Upload, ChevronRight, Check } from "lucide-react";

export default function Home() {
  const { t } = useTranslation();
  const { getSetting } = useSettings();
  const siteName = getSetting('site_name', 'Fujimir');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                {t('hero.title')} <br />
                <span className="text-primary-400 font-serif italic">{siteName}</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <Link href="/upload">
                  <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white text-lg px-8 py-7 rounded-full gap-2 shadow-xl shadow-primary-500/20">
                    <Upload size={20} />
                    {t('nav.upload')}
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 text-lg px-8 py-7 rounded-full gap-2">
                    {t('nav.pricing')}
                    <ChevronRight size={20} />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-md ml-auto">
                <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
                <img src="/logo.png" alt="Promo" className="relative z-10 w-full h-auto drop-shadow-2xl opacity-80" />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-900/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-800/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: "Premium Quality", desc: "Original Fuji Crystal Archive paper for brilliant colors and sharp details.", icon: <Check size={32} /> },
              { title: "Auto Discounts", desc: "Order more, pay less. Discounts are applied automatically in your cart.", icon: <Check size={32} /> },
              { title: "Fast Delivery", desc: "Production starts immediately after upload. Shipping across Ukraine.", icon: <Check size={32} /> }
            ].map((benefit, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-3xl flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
