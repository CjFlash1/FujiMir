"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Trash2, Edit2, Save, X, Eye, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { PageBuilder } from "@/components/admin/page-builder/builder";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Types
interface PageData {
    id?: number;
    title: string;
    content: string;
    description: string;
    isActive: boolean;
    lang: string;
}

interface PageGroup {
    slug: string;
    translations: Record<string, PageData>; // uk, ru, en
}

const LANGUAGES = ["uk", "ru", "en"] as const;

export default function CMSPages() {
    const [pageGroups, setPageGroups] = useState<PageGroup[]>([]);
    const [loading, setLoading] = useState(true);

    // Editor State
    const [isEditing, setIsEditing] = useState(false);
    const [currentSlug, setCurrentSlug] = useState("");
    const [translations, setTranslations] = useState<Record<string, PageData>>({});

    // View Mode per language
    const [editorModes, setEditorModes] = useState<Record<string, "simple" | "builder">>({
        uk: "simple", ru: "simple", en: "simple"
    });

    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            const res = await fetch("/api/fujiadmin/cms/pages");
            const data: any[] = await res.json();

            // Group by slug
            const groups: Record<string, PageGroup> = {};
            data.forEach(page => {
                if (!groups[page.slug]) {
                    groups[page.slug] = { slug: page.slug, translations: {} };
                }
                groups[page.slug].translations[page.lang] = {
                    id: page.id,
                    title: page.title,
                    content: page.content,
                    description: page.description,
                    isActive: page.isActive,
                    lang: page.lang
                };
            });

            setPageGroups(Object.values(groups));
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const startEditing = (group?: PageGroup) => {
        if (group) {
            // Edit existing
            setCurrentSlug(group.slug);
            const tr: Record<string, PageData> = {};

            // Fill existing + defaults for missing
            LANGUAGES.forEach(lang => {
                if (group.translations[lang]) {
                    tr[lang] = { ...group.translations[lang] };
                } else {
                    tr[lang] = { title: "", content: "", description: "", isActive: true, lang };
                }
            });
            setTranslations(tr);
        } else {
            // Create New
            setCurrentSlug("");
            const tr: Record<string, PageData> = {};
            LANGUAGES.forEach(lang => {
                tr[lang] = { title: "", content: "", description: "", isActive: true, lang };
            });
            setTranslations(tr);
        }
        setIsEditing(true);
    };

    const updateTranslation = (lang: string, field: keyof PageData, value: any) => {
        setTranslations(prev => ({
            ...prev,
            [lang]: { ...prev[lang], [field]: value }
        }));
    };

    const handleSave = async () => {
        if (!currentSlug) {
            toast.error("Slug is required");
            return;
        }

        setIsSaving(true);
        try {
            // Check if slug changed (if needed) - simplified: assuming slug is managed via state

            // Save each translation
            const promises = LANGUAGES.map(async (lang) => {
                const data = translations[lang];
                // Only save if it has at least a title (or if it's an update to existing ID)
                if (!data.title && !data.id) return;

                const payload = {
                    ...data,
                    slug: currentSlug,
                    lang
                };

                // Determine method
                const method = data.id ? "PUT" : "POST";

                const res = await fetch("/api/fujiadmin/cms/pages", {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                if (!res.ok) throw new Error(`Failed to save ${lang}`);
            });

            await Promise.all(promises);

            setIsEditing(false);
            fetchPages();
            toast.success("Pages saved successfully");
        } catch (e) {
            console.error(e);
            toast.error("Error saving pages. Check console.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm(`Are you sure you want to delete ALL translations for page "${slug}"?`)) return;

        // Start deleting all IDs associated with this slug
        // We need the IDs from the group
        const group = pageGroups.find(g => g.slug === slug);
        if (!group) return;

        try {
            const promises = Object.values(group.translations).map(p => {
                if (p.id) return fetch(`/api/fujiadmin/cms/pages?id=${p.id}`, { method: "DELETE" });
            });
            await Promise.all(promises);
            fetchPages();
        } catch (e) {
            console.error(e);
        }
    };

    if (loading) return <div className="p-12 text-center text-slate-400"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div>;

    if (isEditing) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        {currentSlug ? `Editing: ${currentSlug}` : "New Page"}
                    </h1>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                            <X className="w-4 h-4 mr-2" /> Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={isSaving} className="bg-[#009846] hover:bg-[#009846]/90">
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                            Save All Changes
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6">
                    {/* Common Settings */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid gap-2">
                                <Label>URL Slug (Identifier)</Label>
                                <Input
                                    value={currentSlug}
                                    onChange={e => setCurrentSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                                    placeholder="e.g. privacy-policy"
                                    className="font-mono"
                                />
                                <p className="text-xs text-slate-500">This will determine the URL: /p/{currentSlug}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Translations */}
                    <Tabs defaultValue="uk" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="uk">🇺🇦 Українська</TabsTrigger>
                            <TabsTrigger value="ru">🇷🇺 Русский</TabsTrigger>
                            <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
                        </TabsList>

                        {LANGUAGES.map(lang => (
                            <TabsContent key={lang} value={lang} className="mt-4 space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg flex justify-between items-center">
                                            <span>Content ({lang.toUpperCase()})</span>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={translations[lang]?.isActive ?? true}
                                                    onChange={(e) => updateTranslation(lang, 'isActive', e.target.checked)}
                                                    className="w-4 h-4"
                                                />
                                                <span className="text-sm font-normal text-slate-500">Active</span>
                                            </div>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label>Page Title</Label>
                                            <Input
                                                value={translations[lang]?.title || ""}
                                                onChange={(e) => updateTranslation(lang, "title", e.target.value)}
                                                placeholder="Page Title"
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <div className="flex justify-between items-end mb-2">
                                                <Label>Page Content</Label>
                                                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditorModes(prev => ({ ...prev, [lang]: "simple" }))}
                                                        className={cn(
                                                            "px-3 py-1 text-xs font-bold rounded-md transition-all",
                                                            editorModes[lang] === "simple" ? "bg-white text-slate-700 shadow-sm" : "text-slate-400 hover:text-slate-600"
                                                        )}
                                                    >
                                                        Code / Classic
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditorModes(prev => ({ ...prev, [lang]: "builder" }))}
                                                        className={cn(
                                                            "px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1",
                                                            editorModes[lang] === "builder" ? "bg-gradient-to-r from-blue-500 to-[#009846] text-white shadow-sm" : "text-slate-400 hover:text-slate-600"
                                                        )}
                                                    >
                                                        <span>✨ Page Builder</span>
                                                    </button>
                                                </div>
                                            </div>

                                            {editorModes[lang] === "simple" ? (
                                                <RichTextEditor
                                                    value={translations[lang]?.content || ""}
                                                    onChange={(val) => updateTranslation(lang, "content", val)}
                                                />
                                            ) : (
                                                <div className="border rounded-xl p-4 bg-slate-50/50">
                                                    <PageBuilder
                                                        initialHtml={translations[lang]?.content || ""}
                                                        onChange={(html) => updateTranslation(lang, "content", html)}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid gap-2">
                                            <Label>Meta Description</Label>
                                            <Input
                                                value={translations[lang]?.description || ""}
                                                onChange={(e) => updateTranslation(lang, "description", e.target.value)}
                                                placeholder="SEO Description"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">CMS Pages</h1>
                <Button onClick={() => startEditing()}>
                    <Plus className="w-4 h-4 mr-2" /> New Page
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="divide-y divide-slate-100">
                        {pageGroups.map((group) => (
                            <div key={group.slug} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                        <Globe size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                            /{group.slug}
                                            <div className="flex gap-1">
                                                {LANGUAGES.map(l => (
                                                    <span key={l} className={cn(
                                                        "px-1.5 py-0.5 rounded text-[10px] uppercase font-bold border",
                                                        group.translations[l] ? "bg-green-50 text-green-700 border-green-200" : "bg-slate-50 text-slate-300 border-slate-100"
                                                    )}>
                                                        {l}
                                                    </span>
                                                ))}
                                            </div>
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            {group.translations['uk']?.title || group.translations['ru']?.title || group.translations['en']?.title || "No Title"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <a href={`/p/${group.slug}`} target="_blank" rel="noopener noreferrer">
                                        <Button variant="ghost" size="icon" title="View Public Page">
                                            <Eye className="w-4 h-4 text-slate-400" />
                                        </Button>
                                    </a>
                                    <Button variant="ghost" size="icon" onClick={() => startEditing(group)}>
                                        <Edit2 className="w-4 h-4 text-slate-400" />
                                    </Button>
                                    {!['about', 'contact', 'delivery'].includes(group.slug) && (
                                        <Button variant="ghost" size="icon" className="hover:text-red-500" onClick={() => handleDelete(group.slug)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {pageGroups.length === 0 && (
                            <div className="p-8 text-center text-slate-500">
                                No pages created yet.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
