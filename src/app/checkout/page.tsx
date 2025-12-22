"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
    const router = useRouter();
    const { items, clearCart } = useCartStore();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        deliveryAddress: "",
        deliveryMethod: "PICKUP", // PICKUP or POST
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState<string | null>(null);

    const totalPhotos = items.reduce((acc, item) => acc + item.options.quantity, 0);
    // Simple pricing logic for demo: $5 base + $0.50 per photo
    const estimatedTotal = 5 + (totalPhotos * 0.50);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer: formData,
                    items: items.map(item => ({
                        // We aren't sending the file blob, just metadata for this demo
                        id: item.id,
                        options: item.options,
                        fileName: item.file?.name
                    })),
                    total: estimatedTotal
                }),
            });

            if (!response.ok) throw new Error("Order failed");

            const data = await response.json();
            setOrderComplete(data.orderNumber);
            clearCart();
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderComplete) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md text-center p-6">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Order Confirmed!</h2>
                    <p className="text-slate-600 mb-6">
                        Your order <span className="font-mono font-medium text-slate-900">#{orderComplete}</span> has been placed successfully.
                    </p>
                    <Button onClick={() => router.push("/")} className="w-full">
                        Return Home
                    </Button>
                </Card>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <p className="text-slate-500 mb-4">Your cart is empty.</p>
                <Link href="/upload">
                    <Button>Upload Photos</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/upload" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Upload
                </Link>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Shipping & Contact</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Full Name</label>
                                            <Input
                                                required
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Phone Number</label>
                                            <Input
                                                required
                                                placeholder="+380..."
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email Address (Optional)</label>
                                        <Input
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Delivery Method</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, deliveryMethod: "PICKUP" })}
                                                className={`p-4 border rounded-lg text-center transition-colors ${formData.deliveryMethod === "PICKUP"
                                                        ? "border-primary-600 bg-primary-50 text-primary-900 font-medium"
                                                        : "border-slate-200 hover:border-slate-300"
                                                    }`}
                                            >
                                                Pickup
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, deliveryMethod: "POST" })}
                                                className={`p-4 border rounded-lg text-center transition-colors ${formData.deliveryMethod === "POST"
                                                        ? "border-primary-600 bg-primary-50 text-primary-900 font-medium"
                                                        : "border-slate-200 hover:border-slate-300"
                                                    }`}
                                            >
                                                Nova Poshta
                                            </button>
                                        </div>
                                    </div>

                                    {formData.deliveryMethod === "POST" && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Address / Branch</label>
                                            <Input
                                                required
                                                placeholder="City, Branch #3..."
                                                value={formData.deliveryAddress}
                                                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                                            />
                                        </div>
                                    )}
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Application Summary */}
                    <div className="md:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Total Photos</span>
                                    <span className="font-medium">{totalPhotos}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Print Cost</span>
                                    <span className="font-medium">${(totalPhotos * 0.50).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Base Fee</span>
                                    <span className="font-medium">$5.00</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between items-center">
                                    <span className="font-semibold text-lg">Total</span>
                                    <span className="font-bold text-xl text-primary-600">${estimatedTotal.toFixed(2)}</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    size="lg"
                                    type="submit"
                                    form="checkout-form"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing
                                        </>
                                    ) : (
                                        "Place Order"
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
