"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Settings,
    Image,
    FileText,
    LogOut,
    Globe,
    HelpCircle
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useState, useCallback, useEffect } from "react";

export function AdminSidebar() {
    const pathname = usePathname();
    const { t } = useTranslation();
    const [width, setWidth] = useState(260);
    const [isResizing, setIsResizing] = useState(false);

    const startResizing = useCallback(() => setIsResizing(true), []);
    const stopResizing = useCallback(() => setIsResizing(false), []);

    const resize = useCallback(
        (mouseMoveEvent: MouseEvent) => {
            if (isResizing) {
                const newWidth = mouseMoveEvent.clientX;
                if (newWidth > 64 && newWidth < 600) { // Min 64 (icon width approx) or higher
                    setWidth(newWidth);
                }
            }
        },
        [isResizing]
    );

    useEffect(() => {
        if (isResizing) {
            window.addEventListener("mousemove", resize);
            window.addEventListener("mouseup", stopResizing);
        } else {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        }
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [isResizing, resize, stopResizing]);

    const navigation = [
        { name: t("admin.dashboard"), href: "/fujiadmin", icon: LayoutDashboard },
        { name: t("admin.orders"), href: "/fujiadmin/orders", icon: ShoppingBag },
        { name: t("admin.content"), href: "/fujiadmin/content", icon: Image },
        { name: t("admin.users"), href: "/fujiadmin/users", icon: Users },
        { name: t("admin.help", "Help Center"), href: "/fujiadmin/help", icon: HelpCircle },
        { name: t("admin.pages"), href: "/fujiadmin/pages", icon: FileText },
        { name: t("admin.translations"), href: "/fujiadmin/config/translations", icon: Globe },
        { name: t("admin.settings"), href: "/fujiadmin/settings", icon: Settings },
        { name: t("admin.config"), href: "/fujiadmin/config/sizes", icon: Settings },
    ];

    return (
        <div
            className="relative flex flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6 pb-4 min-h-screen text-white shrink-0"
            style={{ width: width }}
        >
            <div className="flex h-16 shrink-0 items-center overflow-hidden whitespace-nowrap">
                <span className="text-xl font-bold tracking-tight">Fujimir Admin</span>
            </div>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                isActive
                                                    ? "bg-slate-800 text-white"
                                                    : "text-slate-400 hover:bg-slate-800 hover:text-white",
                                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 whitespace-nowrap overflow-hidden"
                                            )}
                                        >
                                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                    <li className="mt-auto">
                        <Link
                            href="/"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-slate-400 hover:bg-slate-800 hover:text-white whitespace-nowrap overflow-hidden"
                        >
                            <LogOut className="h-6 w-6 shrink-0" aria-hidden="true" />
                            {t('admin.signout')}
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Resize Handle */}
            <div
                onMouseDown={startResizing}
                className={`absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary-500 transition-colors z-50 ${isResizing ? 'bg-primary-600 w-1.5' : 'bg-slate-800/50'}`}
            />
        </div>
    );
}
