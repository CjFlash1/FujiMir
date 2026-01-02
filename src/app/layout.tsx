import type { Metadata } from "next";
import { Manrope, Caveat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});

const caveat = Caveat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-caveat",
});

import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  const siteName = await prisma.setting.findUnique({ where: { key: 'site_name' } });
  const siteNameValue = siteName?.value || "FUJI-Світ";

  // Fetch verification codes from settings
  const googleVerification = await prisma.setting.findUnique({ where: { key: 'google_verification' } });
  const yandexVerification = await prisma.setting.findUnique({ where: { key: 'yandex_verification' } });
  const bingVerification = await prisma.setting.findUnique({ where: { key: 'bing_verification' } });

  // Fetch SEO Translations (Default UK)
  const seoTitle = await prisma.translation.findUnique({
    where: { lang_key: { lang: 'uk', key: 'home.seo.title' } }
  });
  const seoDesc = await prisma.translation.findUnique({
    where: { lang_key: { lang: 'uk', key: 'home.seo.offer' } }
  });

  const pageTitle = seoTitle?.value || `${siteNameValue} | Друк фотографій онлайн у Дніпрі`;
  const pageDesc = seoDesc?.value?.substring(0, 160) + '...' || "Професійний друк фотографій онлайн у Дніпрі. Висока якість, швидка доставка.";

  return {
    title: {
      default: pageTitle,
      template: `%s | ${siteNameValue}`,
    },
    description: pageDesc,
    keywords: [
      // Ukrainian
      "друк фотографій", "друк фото онлайн", "фотодрук Дніпро", "фото на магніті",
      "фото на документи", "фоторамки", "фотоплівка", "проявка плівки",
      // Russian
      "печать фотографий", "печать фото онлайн", "фотопечать Днепр", "фото на магните",
      "фото на документы", "фоторамки", "фотопленка", "проявка пленки",
      // English
      "photo printing", "photo print online", "Dnipro photo lab", "photo magnets",
      "passport photos", "photo frames", "film development",
      // Brand
      "Fuji", "FUJI-Світ", "FUJI-Мір", "Fujimir", "Frontier 500",
    ],
    authors: [{ name: siteNameValue }],
    creator: siteNameValue,
    publisher: siteNameValue,
    formatDetection: {
      email: false,
      telephone: false,
    },
    metadataBase: new URL('https://fujimir.com.ua'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'uk_UA',
      url: 'https://fujimir.com.ua',
      siteName: siteNameValue,
      title: pageTitle,
      description: pageDesc,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: siteNameValue,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: googleVerification?.value || undefined,
      yandex: yandexVerification?.value || undefined,
      other: bingVerification?.value ? { 'msvalidate.01': bingVerification.value } : undefined,
    },
  };
}

import { TranslationProvider } from "@/lib/i18n";
import { SettingsProvider } from "@/lib/settings-context";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${manrope.variable} ${caveat.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <SettingsProvider>
          <TranslationProvider>
            <Navbar />
            {children}
            <Footer />
            <Toaster richColors position="top-center" />
          </TranslationProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
