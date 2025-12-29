"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, ArrowUp, ArrowDown, ImageIcon, Type, LayoutGrid } from "lucide-react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

// --- Types ---
export type BlockType = "HERO" | "IMAGE_TEXT" | "FEATURES" | "RICH_TEXT" | "TABLE";

export interface Block {
    id: string;
    type: BlockType;
    data: any;
}

// --- HTML Generators ---
const generateHTML = (blocks: Block[]) => {
    return `<div class="prose max-w-none text-slate-800 space-y-12">
        ${blocks.map(block => {
        if (block.type === "HERO") {
            return `
                    <div class="mb-8">
                        <h1 class="text-3xl font-bold text-[#009846] mb-4">${block.data.title || ""}</h1>
                        ${block.data.subtitle ? `<p class="text-xl text-slate-600">${block.data.subtitle}</p>` : ""}
                    </div>
                `;
        }
        if (block.type === "RICH_TEXT") {
            return `<div class="mb-8">${block.data.content || ""}</div>`;
        }
        if (block.type === "IMAGE_TEXT") {
            const isRight = block.data.imagePosition === "right";
            const dirClass = isRight ? "md:flex-row-reverse" : "md:flex-row";

            return `
                    <div class="flex flex-col ${dirClass} gap-8 mb-12 items-center">
                        <div class="w-full md:w-1/3 flex-shrink-0">
                             <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                                <img src="${block.data.imageSrc || '/images/placeholder.png'}" alt="${block.data.title || 'Image'}" class="w-full h-auto object-contain mx-auto" />
                             </div>
                        </div>
                        <div class="flex-1">
                            ${block.data.title ? `<h3 class="text-2xl font-bold text-slate-900 mb-4">${block.data.title}</h3>` : ""}
                            <div class="text-slate-700 leading-relaxed">
                                ${block.data.content || ""}
                            </div>
                        </div>
                    </div>
                `;
        }
        if (block.type === "FEATURES") {
            const items = block.data.items || [];
            return `
                    <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        ${block.data.title ? `<h4 class="font-bold text-slate-800 mb-6 text-xl flex items-center gap-2"><span>⚡</span> ${block.data.title}</h4>` : ""}
                        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            ${items.map((item: string) => `
                                <li class="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                                    <div class="w-2 h-2 mt-2 rounded-full bg-[#009846] flex-shrink-0"></div>
                                    <span class="text-sm text-slate-700 font-medium">${item}</span>
                                </li>
                            `).join("")}
                        </ul>
                    </div>
                `;
        }
        if (block.type === "TABLE") {
            const csv = block.data.content || "";
            const rows = csv.split('\n').filter((r: string) => r.trim());
            if (rows.length === 0) return "";

            const header = rows[0].split(/[,\t;]/).map((h: string) => h.trim());
            const body = rows.slice(1).map((r: string) => r.split(/[,\t;]/).map((c: string) => c.trim()));

            return `
                    <div class="my-6">
                         ${block.data.title ? `<h4 class="font-bold text-slate-800 mb-4 text-lg">${block.data.title}</h4>` : ""}
                         <div class="overflow-x-auto border rounded-xl shadow-sm">
                            <table class="w-full text-left border-collapse text-sm">
                                <thead class="bg-slate-50">
                                    <tr>
                                        ${header.map((h: string) => `<th class="p-3 border-b font-semibold text-slate-700 whitespace-nowrap">${h}</th>`).join("")}
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-slate-100">
                                    ${body.map((row: string[]) => `
                                        <tr class="hover:bg-slate-50">
                                            ${row.map((cell: string) => `<td class="p-3 text-slate-600">${cell}</td>`).join("")}
                                        </tr>
                                    `).join("")}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
        }
        return "";
    }).join("")}
    </div>`;
};


// --- Components ---

interface PageBuilderProps {
    onChange: (html: string) => void;
    initialHtml?: string;
}

export function PageBuilder({ onChange, initialHtml }: PageBuilderProps) {
    const [blocks, setBlocks] = useState<Block[]>([]);

    // Use ref to avoid infinite loop when parent creates new onChange on every render
    const onChangeRef = React.useRef(onChange);
    useEffect(() => { onChangeRef.current = onChange; }, [onChange]);

    useEffect(() => {
        if (initialHtml && blocks.length === 0) {
            setBlocks([{ id: Date.now().toString(), type: "RICH_TEXT", data: { content: initialHtml } }]);
        }
    }, [initialHtml]); // Only on mount/initialHtml change (mostly mount since initialHtml is usually stable-ish)

    // Sync to parent
    useEffect(() => {
        if (blocks.length > 0) {
            onChangeRef.current(generateHTML(blocks));
        }
    }, [blocks]);

    const addBlock = (type: BlockType) => {
        const newBlock: Block = {
            id: Date.now().toString(),
            type,
            data: type === "FEATURES" ? { items: ["Feature 1", "Feature 2"] } : {}
        };
        setBlocks([...blocks, newBlock]);
    };

    const removeBlock = (id: string) => {
        setBlocks(blocks.filter(b => b.id !== id));
    };

    const moveBlock = (index: number, direction: -1 | 1) => {
        const newBlocks = [...blocks];
        if (index + direction < 0 || index + direction >= newBlocks.length) return;

        const temp = newBlocks[index];
        newBlocks[index] = newBlocks[index + direction];
        newBlocks[index + direction] = temp;
        setBlocks(newBlocks);
    };

    const updateBlockData = (id: string, data: any) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, data: { ...b.data, ...data } } : b));
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                <p className="text-sm text-blue-800">
                    <strong>Page Builder Mode:</strong> Add sections below to build your page. The system will automatically create the mobile-friendly layout for you.
                </p>
            </div>

            <div className="space-y-6">
                {blocks.map((block, index) => (
                    <Card key={block.id} className="relative group border-slate-300 shadow-sm hover:border-blue-400 transition-colors">
                        <div className="absolute top-2 right-2 flex gap-1 bg-white rounded-lg shadow border p-1 opacity-100 z-10">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600" onClick={() => moveBlock(index, -1)} disabled={index === 0}>
                                <ArrowUp size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600" onClick={() => moveBlock(index, 1)} disabled={index === blocks.length - 1}>
                                <ArrowDown size={16} />
                            </Button>
                            <div className="w-px h-8 bg-slate-200 mx-1"></div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50" onClick={() => removeBlock(block.id)}>
                                <Trash2 size={16} />
                            </Button>
                        </div>

                        <CardHeader className="bg-slate-50 border-b pb-3 pt-3">
                            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                {block.type === "HERO" && <Type size={16} />}
                                {block.type === "IMAGE_TEXT" && <ImageIcon size={16} />}
                                {block.type === "FEATURES" && <LayoutGrid size={16} />}
                                {block.type === "RICH_TEXT" && <Type size={16} />}
                                {block.type === "TABLE" && <LayoutGrid size={16} />}
                                {block.type} SECTION
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-6 space-y-4">
                            {/* --- HERO BLOCK --- */}
                            {block.type === "HERO" && (
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label>Main Title</Label>
                                        <Input
                                            value={block.data.title || ""}
                                            onChange={(e) => updateBlockData(block.id, { title: e.target.value })}
                                            placeholder="Page Title"
                                            className="font-bold text-lg"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Subtitle (Optional)</Label>
                                        <Textarea
                                            value={block.data.subtitle || ""}
                                            onChange={(e) => updateBlockData(block.id, { subtitle: e.target.value })}
                                            placeholder="Brief introduction..."
                                        />
                                    </div>
                                </div>
                            )}

                            {/* --- IMAGE + TEXT BLOCK --- */}
                            {block.type === "IMAGE_TEXT" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label>Image URL</Label>
                                            <Input
                                                value={block.data.imageSrc || ""}
                                                onChange={(e) => updateBlockData(block.id, { imageSrc: e.target.value })}
                                                placeholder="/images/help/example.jpg"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Image Position</Label>
                                            <Select
                                                value={block.data.imagePosition || "left"}
                                                onValueChange={(val) => updateBlockData(block.id, { imagePosition: val })}
                                            >
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="left">Left</SelectItem>
                                                    <SelectItem value="right">Right</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {block.data.imageSrc && (
                                            <div className="p-2 border rounded bg-slate-50">
                                                <img src={block.data.imageSrc} className="max-h-32 object-contain mx-auto" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label>Section Title</Label>
                                            <Input
                                                value={block.data.title || ""}
                                                onChange={(e) => updateBlockData(block.id, { title: e.target.value })}
                                                placeholder="Section Heading"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Content</Label>
                                            <RichTextEditor
                                                value={block.data.content || ""}
                                                onChange={(val) => updateBlockData(block.id, { content: val })}
                                                placeholder="Write description here..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* --- FEATURES BLOCK --- */}
                            {block.type === "FEATURES" && (
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label>Section Title</Label>
                                        <Input
                                            value={block.data.title || ""}
                                            onChange={(e) => updateBlockData(block.id, { title: e.target.value })}
                                            placeholder="Features & Benefits"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Features List</Label>
                                        <div className="space-y-2">
                                            {(block.data.items || []).map((item: string, i: number) => (
                                                <div key={i} className="flex gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-400 mt-2 shrink-0">{i + 1}</div>
                                                    <Input
                                                        value={item}
                                                        onChange={(e) => {
                                                            const newItems = [...(block.data.items || [])];
                                                            newItems[i] = e.target.value;
                                                            updateBlockData(block.id, { items: newItems });
                                                        }}
                                                    />
                                                    <Button variant="ghost" size="icon" onClick={() => {
                                                        const newItems = [...(block.data.items || [])];
                                                        newItems.splice(i, 1);
                                                        updateBlockData(block.id, { items: newItems });
                                                    }}><XIcon /></Button>
                                                </div>
                                            ))}
                                            <Button variant="outline" size="sm" onClick={() => updateBlockData(block.id, { items: [...(block.data.items || []), ""] })} className="mt-2 text-blue-600">
                                                <Plus size={14} className="mr-2" /> Add Feature
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* --- TABLE BLOCK --- */}
                            {block.type === "TABLE" && (
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label>Table Title (Optional)</Label>
                                        <Input
                                            value={block.data.title || ""}
                                            onChange={(e) => updateBlockData(block.id, { title: e.target.value })}
                                            placeholder="Price List"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Data (CSV Format)</Label>
                                        <p className="text-xs text-slate-500 mb-2">Enter data separated by commas. First line is Header.</p>
                                        <Textarea
                                            value={block.data.content || ""}
                                            onChange={(e) => updateBlockData(block.id, { content: e.target.value })}
                                            placeholder="Item, Price, Description&#10;Photo 10x15, 5 UAH, Glossy&#10;Photo A4, 20 UAH, Matte"
                                            className="font-mono text-sm min-h-[150px]"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* --- RICH TEXT BLOCK --- */}
                            {block.type === "RICH_TEXT" && (
                                <RichTextEditor
                                    value={block.data.content || ""}
                                    onChange={(val) => updateBlockData(block.id, { content: val })}
                                />
                            )}
                        </CardContent>
                    </Card>
                ))}

                {blocks.length === 0 && (
                    <div className="text-center p-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-500 mb-4">Your page is empty. Use the buttons below to add sections.</p>
                    </div>
                )}
            </div>

            {/* --- TOOLBAR --- */}
            <div className="flex flex-wrap gap-4 justify-center mt-8 pt-8 border-t border-slate-200">
                <Button onClick={() => addBlock("HERO")} variant="outline" className="h-auto py-3 px-4 flex flex-col gap-1 items-center hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
                    <Type size={20} />
                    <span className="text-xs font-semibold">Hero Title</span>
                </Button>
                <Button onClick={() => addBlock("IMAGE_TEXT")} variant="outline" className="h-auto py-3 px-4 flex flex-col gap-1 items-center hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
                    <ImageIcon size={20} />
                    <span className="text-xs font-semibold">Image + Text</span>
                </Button>
                <Button onClick={() => addBlock("FEATURES")} variant="outline" className="h-auto py-3 px-4 flex flex-col gap-1 items-center hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
                    <LayoutGrid size={20} />
                    <span className="text-xs font-semibold">Features Grid</span>
                </Button>
                <Button onClick={() => addBlock("TABLE")} variant="outline" className="h-auto py-3 px-4 flex flex-col gap-1 items-center hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
                    <LayoutGrid size={20} />
                    <span className="text-xs font-semibold">Data Table</span>
                </Button>
                <Button onClick={() => addBlock("RICH_TEXT")} variant="outline" className="h-auto py-3 px-4 flex flex-col gap-1 items-center hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
                    <Type size={20} />
                    <span className="text-xs font-semibold">Rich Text</span>
                </Button>
            </div>
        </div>
    );
}

// Simple Helper Icon
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
