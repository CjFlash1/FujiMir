import { AdminSidebar } from "@/components/admin-sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-100">
            <AdminSidebar />
            <main className="flex-1 p-4 md:p-8 overflow-x-auto min-w-0 md:pt-8">
                {children}
            </main>
        </div>
    );
}
