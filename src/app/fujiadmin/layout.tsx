import { AdminSidebar } from "@/components/admin-sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-100">
            <AdminSidebar />
            <main className="flex-1 p-4 md:p-8 overflow-x-auto min-w-0 pt-[60px] md:pt-8">
                {children}
            </main>
        </div>
    );
}
