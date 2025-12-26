"use client";

import Link from "next/link";
import { Settings, Maximize, FileText, PlusCircle, Globe, Gift, Percent, Magnet, Truck } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ConfigLayout({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation();
    const pathname = usePathname();

    const navItems = [
        { name: t('config.sizes'), href: '/fujiadmin/config/sizes', icon: Maximize },
        { name: t('config.paper'), href: '/fujiadmin/config/paper', icon: FileText },
        { name: t('config.options'), href: '/fujiadmin/config/options', icon: PlusCircle },
        { name: t('config.magnets'), href: '/fujiadmin/config/magnets', icon: Magnet },
        { name: t('config.delivery'), href: '/fujiadmin/config/delivery', icon: Truck },
        { name: t('config.gifts'), href: '/fujiadmin/config/gifts', icon: Gift },
        { name: t('config.discounts'), href: '/fujiadmin/config/discounts', icon: Percent },
        { name: t('admin.translations'), href: '/fujiadmin/config/translations', icon: Globe },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-8">
                <Settings className="w-8 h-8 text-slate-400" />
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">{t('config.system_title')}</h1>
            </div>

            <div className="flex gap-4 border-b border-slate-200 overflow-x-auto pb-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2",
                                isActive
                                    ? "text-primary-600 border-primary-600"
                                    : "text-slate-600 border-transparent hover:text-primary-600 hover:border-primary-600"
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </Link>
                    )
                })}
            </div>

            <div className="pt-4">
                {children}
            </div>
        </div>
    );
}
