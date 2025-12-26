"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { MapPin, Package, Search, ChevronDown, X, Building2, Box } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface City {
    ref: string;
    deliveryCity: string;
    name: string;
    mainDescription: string;
    area: string;
}

interface Warehouse {
    ref: string;
    number: string;
    description: string;
    shortAddress: string;
    type: "postomat" | "branch" | "other";
}

interface NovaPoshtaSelectorProps {
    value: string;
    onChange: (value: string) => void;
    error?: string | null;
    onClearError?: () => void;
}

export function NovaPoshtaSelector({ value, onChange, error, onClearError }: NovaPoshtaSelectorProps) {
    const { t } = useTranslation();

    // State
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);

    const [cityQuery, setCityQuery] = useState("");
    const [warehouseQuery, setWarehouseQuery] = useState("");

    const [cities, setCities] = useState<City[]>([]);
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [showWarehouseDropdown, setShowWarehouseDropdown] = useState(false);

    const [loadingCities, setLoadingCities] = useState(false);
    const [loadingWarehouses, setLoadingWarehouses] = useState(false);

    const cityInputRef = useRef<HTMLInputElement>(null);
    const warehouseInputRef = useRef<HTMLInputElement>(null);
    const cityDropdownRef = useRef<HTMLDivElement>(null);
    const warehouseDropdownRef = useRef<HTMLDivElement>(null);

    // Debounced city search
    useEffect(() => {
        if (cityQuery.length < 2) {
            setCities([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoadingCities(true);
            try {
                const res = await fetch(`/api/novaposhta?action=cities&query=${encodeURIComponent(cityQuery)}`);
                const data = await res.json();
                setCities(data.cities || []);
            } catch (e) {
                console.error("City search error:", e);
            } finally {
                setLoadingCities(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [cityQuery]);

    // Load warehouses when city selected or search changes
    useEffect(() => {
        if (!selectedCity) {
            setWarehouses([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoadingWarehouses(true);
            try {
                const res = await fetch(
                    `/api/novaposhta?action=warehouses&cityRef=${selectedCity.deliveryCity}&query=${encodeURIComponent(warehouseQuery)}`
                );
                const data = await res.json();
                setWarehouses(data.warehouses || []);
            } catch (e) {
                console.error("Warehouse search error:", e);
            } finally {
                setLoadingWarehouses(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [selectedCity, warehouseQuery]);


    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (cityDropdownRef.current && !cityDropdownRef.current.contains(e.target as Node) &&
                cityInputRef.current && !cityInputRef.current.contains(e.target as Node)) {
                setShowCityDropdown(false);
            }
            if (warehouseDropdownRef.current && !warehouseDropdownRef.current.contains(e.target as Node) &&
                warehouseInputRef.current && !warehouseInputRef.current.contains(e.target as Node)) {
                setShowWarehouseDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCitySelect = (city: City) => {
        setSelectedCity(city);
        setCityQuery(city.mainDescription);
        setShowCityDropdown(false);
        setSelectedWarehouse(null);
        setWarehouseQuery("");
        onChange(city.mainDescription); // Update parent with city name
        onClearError?.();
        // Focus warehouse input
        setTimeout(() => warehouseInputRef.current?.focus(), 100);
    };

    const handleWarehouseSelect = (warehouse: Warehouse, city: City | null) => {
        setSelectedWarehouse(warehouse);
        setWarehouseQuery(warehouse.description);
        setShowWarehouseDropdown(false);
        // Update parent with full address (city + warehouse)
        if (city) {
            onChange(`${city.mainDescription}, ${warehouse.description}`);
        }
        onClearError?.();
    };

    const clearCity = () => {
        setSelectedCity(null);
        setSelectedWarehouse(null);
        setCityQuery("");
        setWarehouseQuery("");
        onChange("");
    };

    const clearWarehouse = () => {
        setSelectedWarehouse(null);
        setWarehouseQuery("");
    };

    const getWarehouseIcon = (type: string) => {
        switch (type) {
            case "postomat": return <Box className="w-4 h-4 text-purple-500" />;
            case "branch": return <Building2 className="w-4 h-4 text-blue-500" />;
            default: return <Package className="w-4 h-4 text-slate-400" />;
        }
    };

    return (
        <div className="space-y-3">
            {/* City Search */}
            <div className="relative">
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                    {t('np.city')}
                </label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        ref={cityInputRef}
                        placeholder={t('np.city_placeholder')}
                        value={cityQuery}
                        onChange={(e) => {
                            setCityQuery(e.target.value);
                            setShowCityDropdown(true);
                            if (selectedCity) setSelectedCity(null);
                        }}
                        onFocus={() => cityQuery.length >= 2 && setShowCityDropdown(true)}
                        className={`pl-10 pr-10 ${error ? "border-red-500" : ""}`}
                    />
                    {selectedCity && (
                        <button
                            type="button"
                            onClick={clearCity}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                    {loadingCities && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                </div>

                {/* City Dropdown */}
                {showCityDropdown && cities.length > 0 && (
                    <div
                        ref={cityDropdownRef}
                        className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    >
                        {cities.map((city) => (
                            <button
                                key={city.ref}
                                type="button"
                                onClick={() => handleCitySelect(city)}
                                className="w-full px-4 py-2.5 text-left hover:bg-slate-50 border-b border-slate-100 last:border-b-0 flex items-center gap-2"
                            >
                                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm leading-snug">{city.name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Warehouse Search - Only show after city selected */}
            {selectedCity && (
                <div className="relative animate-in slide-in-from-top-2 duration-200">
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                        {t('np.warehouse')}
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            ref={warehouseInputRef}
                            placeholder={t('np.warehouse_placeholder')}
                            value={warehouseQuery}
                            onChange={(e) => {
                                setWarehouseQuery(e.target.value);
                                setShowWarehouseDropdown(true);
                                if (selectedWarehouse) setSelectedWarehouse(null);
                            }}
                            onFocus={() => setShowWarehouseDropdown(true)}
                            className={`pl-10 pr-10 ${error && !selectedWarehouse ? "border-red-500" : ""}`}
                        />
                        {selectedWarehouse && (
                            <button
                                type="button"
                                onClick={clearWarehouse}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                        {loadingWarehouses && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                        )}
                    </div>

                    {/* Warehouse Dropdown */}
                    {showWarehouseDropdown && warehouses.length > 0 && (
                        <div
                            ref={warehouseDropdownRef}
                            className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-72 overflow-y-auto"
                        >
                            {warehouses.map((wh) => (
                                <button
                                    key={wh.ref}
                                    type="button"
                                    onClick={() => handleWarehouseSelect(wh, selectedCity)}
                                    className="w-full px-4 py-2.5 text-left hover:bg-slate-50 border-b border-slate-100 last:border-b-0 flex items-start gap-2"
                                >
                                    {getWarehouseIcon(wh.type)}
                                    <div className="flex-1">
                                        <div className="text-sm font-medium leading-snug">{wh.description}</div>
                                        <div className="text-xs text-slate-500 leading-snug mt-0.5">{wh.shortAddress}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* No results message */}
                    {showWarehouseDropdown && !loadingWarehouses && warehouses.length === 0 && warehouseQuery.length > 0 && (
                        <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg p-4 text-center text-sm text-slate-500">
                            {t('np.no_results')}
                        </div>
                    )}
                </div>
            )}

            {/* Error message */}
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
