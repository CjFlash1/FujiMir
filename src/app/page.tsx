"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { useSettings } from "@/lib/settings-context";
import { Upload, ChevronRight, Check, Camera, ShoppingCart, Package } from "lucide-react";

export default function Home() {
  const { t } = useTranslation();
  const { getSetting } = useSettings();
  const siteName = getSetting('site_name', 'FUJI-Світ');
  const [giftThreshold, setGiftThreshold] = useState<number>(1200);

  useEffect(() => {
    fetch('/api/gifts/threshold')
      .then(res => res.json())
      .then(data => {
        if (data.hasGift && data.minAmount) {
          setGiftThreshold(data.minAmount);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#00b352] via-[#009846] to-[#0d4829] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
                {t('hero.title')} <br />
                <span className="text-[#e31e24] italic drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">{siteName}</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mb-10 font-bold">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <Link href="/upload">
                  <Button size="lg" className="bg-[#e31e24] hover:bg-[#c31a1f] text-white text-xl px-10 py-8 rounded-xl gap-3 shadow-2xl shadow-red-900/40 font-black uppercase tracking-tighter transition-transform hover:scale-105 active:scale-95">
                    <Upload size={24} />
                    {t('nav.upload')}
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" className="bg-white text-[#009846] hover:bg-white/90 text-xl px-10 py-8 rounded-xl gap-2 font-black uppercase tracking-tighter shadow-xl">
                    {t('nav.pricing')}
                    <ChevronRight size={24} />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-md ml-auto">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <img src="/logo.png" alt="Promo" className="relative z-10 w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </section>

      {/* How It Works Section - SEO important */}
      <section className="py-20 bg-white border-b border-[#c5b98e]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-center text-[#4c4c4c] mb-16 uppercase tracking-tighter">
            {t('Як замовити друк фотографій онлайн')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative bg-[#f3f1e9] p-8 rounded-3xl border border-[#c5b98e]/20">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#009846] text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg">
                1
              </div>
              <div className="flex items-center gap-4 mb-4 mt-4">
                <Camera className="w-8 h-8 text-[#009846]" />
                <h3 className="text-xl font-black text-[#4c4c4c] uppercase">{t('Завантажте фотографії')}</h3>
              </div>
              <p className="text-[#4c4c4c]/80 leading-relaxed">
                {t('Для того, щоб зробити замовлення фотографій онлайн, завантажте їх на наш сайт. Файли приймаються у форматі JPG, PNG та інших популярних форматах. Максимальний розмір одного файлу — 100 MB.')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-[#f3f1e9] p-8 rounded-3xl border border-[#c5b98e]/20">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#e31e24] text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg">
                2
              </div>
              <div className="flex items-center gap-4 mb-4 mt-4">
                <ShoppingCart className="w-8 h-8 text-[#e31e24]" />
                <h3 className="text-xl font-black text-[#4c4c4c] uppercase">{t('Оформіть замовлення')}</h3>
              </div>
              <p className="text-[#4c4c4c]/80 leading-relaxed mb-3">
                {t('gift.step2_desc')}
              </p>
              <div className="bg-gradient-to-r from-[#009846]/10 to-[#e31e24]/10 p-3 rounded-xl border border-[#009846]/30">
                <p className="text-[#009846] font-black text-sm flex items-center gap-2">
                  <span className="text-lg">🎁</span>
                  <span>
                    {t('gift.promo_text').replace('{amount}', String(giftThreshold))}
                  </span>
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative bg-[#f3f1e9] p-8 rounded-3xl border border-[#c5b98e]/20">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#4c4c4c] text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg">
                3
              </div>
              <div className="flex items-center gap-4 mb-4 mt-4">
                <Package className="w-8 h-8 text-[#4c4c4c]" />
                <h3 className="text-xl font-black text-[#4c4c4c] uppercase">{t('Отримайте фотографії')}</h3>
              </div>
              <p className="text-[#4c4c4c]/80 leading-relaxed">
                {t('Фотографії ви можете забрати самостійно за адресою вул. Європейська, 8, або замовити доставку кур\'єром по м. Дніпро чи у будь-яке місто України службою доставки «Нова Пошта».')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-[#f3f1e9] border-b border-[#c5b98e]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: t("benefits.quality.title") || "Premium Quality", desc: t("benefits.quality.desc") || "Original Fuji Crystal Archive paper for brilliant colors and sharp details.", icon: <Check size={32} /> },
              { title: t("benefits.discounts.title") || "Auto Discounts", desc: t("benefits.discounts.desc") || "Order more, pay less. Discounts are applied automatically in your cart.", icon: <Check size={32} /> },
              { title: t("benefits.delivery.title") || "Fast Delivery", desc: t("benefits.delivery.desc") || "Production starts immediately after upload. Shipping across Ukraine.", icon: <Check size={32} /> }
            ].map((benefit, i) => (
              <div key={i} className="flex flex-col items-center text-center group bg-white p-10 rounded-3xl shadow-sm border border-[#c5b98e]/20 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-16 h-16 bg-[#009846] text-white rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-12 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-black text-[#4c4c4c] mb-4 uppercase tracking-tighter">{benefit.title}</h3>
                <p className="text-[#4c4c4c]/80 leading-relaxed font-bold">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Text Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-[#009846] mb-8 text-center uppercase tracking-tighter">
            {t('Послуги цифрового фотодруку через інтернет у м. Дніпро')}
          </h2>
          <div className="prose prose-lg max-w-none text-[#4c4c4c]/80 leading-relaxed">
            <p className="mb-6">
              {t('Як ви думаєте, для чого потрібні фотографії? Фотографії потрібні для того, щоб зафіксувати унікальні моменти життя, які, можливо, ніколи не повторяться!')}
            </p>
            <p className="mb-6">
              {t('Саме це і пропонує своїм клієнтам служба друку фотографій онлайн «FUJI-Світ» — друк фотографій у Дніпрі. Ви скажете, що друк фото у Дніпрі пропонують багато хто, і, звісно ж, маєте рацію! Але відчути себе на крок попереду всіх, скориставшись послугою друку фотографій через інтернет у Дніпрі, допоможемо вам саме ми!')}
            </p>
            <p className="mb-6 font-semibold text-[#4c4c4c]">
              {t('У нас ви можете замовити ряд дизайнерських послуг таких як:')}
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>{t('сканування фотографій та плівок')}</li>
              <li>{t('реставрація та комп\'ютерна обробка фотографій')}</li>
              <li>{t('усунення ефекту червоних очей')}</li>
              <li>{t('розробка різноманітних макетів та колажів')}</li>
              <li>{t('а також зробити фотографію на документи')}</li>
              <li>{t('продаж фотоплівки та проявка плівок')}</li>
              <li>{t('продаж фоторамок різних розмірів')}</li>
            </ul>
            <p className="text-xl font-bold text-[#009846] text-center mt-8">
              {t('Наш сервіс для тих людей, хто цінує свій час та гроші!')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
