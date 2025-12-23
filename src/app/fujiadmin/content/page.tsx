"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Image as ImageIcon, FolderOpen, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MediaContentPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Media & Content</h1>
                <Button>
                    <Upload className="w-4 h-4 mr-2" /> Upload Assets
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-blue-500" />
                            Site Logo
                        </CardTitle>
                        <CardDescription>Main header and email logo.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-lg m-4">
                        <img src="/logo.png" alt="Current Logo" className="max-h-20 object-contain mb-4" />
                        <Button variant="outline" size="sm">Replace Logo</Button>
                    </CardContent>
                </Card>

                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FolderOpen className="w-5 h-5 text-amber-500" />
                            Recent Assets
                        </CardTitle>
                        <CardDescription>Shared images and files.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="p-12 text-center text-slate-400 italic">
                            Asset library implementation (Uploads management) coming soon...
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
