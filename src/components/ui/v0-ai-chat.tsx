"use client";

import { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
    TrendingUp,
    Target,
    BarChart3,
    Building2,
    DollarSign,
    ArrowUpIcon,
    Paperclip,
    PlusIcon,
    ExternalLink,
} from "lucide-react";

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            // Temporarily shrink to get the right scrollHeight
            textarea.style.height = `${minHeight}px`;

            // Calculate new height
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        // Set initial height
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    // Adjust height on window resize
    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

export function PrivateEquityAIChat() {
    const [value, setValue] = useState("");
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });

    const handleQuery = (query: string) => {
        if (query.trim()) {
            const encodedQuery = encodeURIComponent(query.trim());
            window.open(`https://frondex.co?q=${encodedQuery}`, '_blank');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (value.trim()) {
                handleQuery(value);
                setValue("");
                adjustHeight(true);
            }
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    What can I help with?
                </h2>
                <p className="text-white/70 text-lg max-w-2xl">
                    Your business copilot for smarter insights, sharper strategy, seamless execution
                </p>
                <div className="flex items-center justify-center gap-2 text-green-300/60 text-sm">
                    <span>Powered by</span>
                    <span className="font-semibold text-green-400">frondex.co</span>
                    <ExternalLink className="w-3 h-3" />
                </div>
            </div>

            <div className="w-full">
                <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl border border-green-500/30">
                    <div className="overflow-y-auto">
                        <Textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                adjustHeight();
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask me anything... (opens frondex.co in new tab)"
                            className={cn(
                                "w-full px-4 py-3",
                                "resize-none",
                                "bg-transparent",
                                "border-none",
                                "text-white text-sm",
                                "focus:outline-none",
                                "focus-visible:ring-0 focus-visible:ring-offset-0",
                                "placeholder:text-green-300/50 placeholder:text-sm",
                                "min-h-[60px]"
                            )}
                            style={{
                                overflow: "hidden",
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="group p-2 hover:bg-gray-800/50 rounded-lg transition-colors flex items-center gap-1"
                            >
                                <Paperclip className="w-4 h-4 text-green-400" />
                                <span className="text-xs text-green-300/70 hidden group-hover:inline transition-opacity">
                                    Attach
                                </span>
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="px-2 py-1 rounded-lg text-sm text-green-300/70 transition-colors border border-dashed border-green-500/30 hover:border-green-400/50 hover:bg-gray-800/50 flex items-center justify-between gap-1"
                            >
                                <PlusIcon className="w-4 h-4" />
                                Portfolio
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    if (value.trim()) {
                                        handleQuery(value);
                                        setValue("");
                                        adjustHeight(true);
                                    }
                                }}
                                title="Continue on frondex.co (opens in new tab)"
                                className={cn(
                                    "px-1.5 py-1.5 rounded-lg text-sm transition-colors border border-green-500/30 hover:border-green-400/50 hover:bg-gray-800/50 flex items-center justify-between gap-1",
                                    value.trim()
                                        ? "bg-green-500 text-black hover:bg-green-400"
                                        : "text-green-300/70"
                                )}
                            >
                                <div className="flex items-center gap-1">
                                    <ArrowUpIcon
                                        className={cn(
                                            "w-3 h-3",
                                            value.trim()
                                                ? "text-black"
                                                : "text-green-300/70"
                                        )}
                                    />
                                    <ExternalLink
                                        className={cn(
                                            "w-3 h-3",
                                            value.trim()
                                                ? "text-black"
                                                : "text-green-300/70"
                                        )}
                                    />
                                </div>
                                <span className="sr-only">Continue on frondex.co</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
                    <ActionButton
                        icon={<TrendingUp className="w-4 h-4" />}
                        label="Market Analysis"
                        onClick={() => handleQuery("Provide market analysis for private equity deals")}
                    />
                    <ActionButton
                        icon={<Target className="w-4 h-4" />}
                        label="Deal Sourcing"
                        onClick={() => handleQuery("Help me with deal sourcing strategies")}
                    />
                    <ActionButton
                        icon={<BarChart3 className="w-4 h-4" />}
                        label="Portfolio Performance"
                        onClick={() => handleQuery("Analyze portfolio performance metrics")}
                    />
                    <ActionButton
                        icon={<Building2 className="w-4 h-4" />}
                        label="Due Diligence"
                        onClick={() => handleQuery("Create a due diligence checklist")}
                    />
                    <ActionButton
                        icon={<DollarSign className="w-4 h-4" />}
                        label="Valuation Models"
                        onClick={() => handleQuery("Show me valuation models for private equity")}
                    />
                </div>
                
                <div className="text-center mt-4">
                    <p className="text-green-300/40 text-xs">
                        All interactions continue on frondex.co • Opens in new tab
                    </p>
                </div>
            </div>
        </div>
    );
}

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}

function ActionButton({ icon, label, onClick }: ActionButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            title="Continue on frondex.co"
            className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 hover:bg-gray-800/70 rounded-full border border-green-500/30 text-green-300/70 hover:text-green-300 hover:border-green-400/50 transition-all duration-300 group"
        >
            {icon}
            <span className="text-xs">{label}</span>
            <ExternalLink className="w-3 h-3 opacity-40 group-hover:opacity-70 transition-opacity" />
        </button>
    );
}