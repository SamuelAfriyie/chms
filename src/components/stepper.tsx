import { motion } from "framer-motion"
import { Button } from "./ui/button";
import type { JSX } from "react";
import { cn } from "@/lib/utils";

interface StepTrackerType {
    step: number,
    items: any[],
    className?: string,
}

export const StepTracker = ({ step, items, className }: StepTrackerType) => {
    return (
        <div className={cn("flex items-center justify-between relative", className)}>
            {items.map((num, idx) => (
                <div key={num} className="flex flex-col items-center w-full relative">
                    {/* Connector Line */}
                    {idx < 4 && (
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: step > num ? "100%" : "0%" }}
                            transition={{ duration: 0.4 }}
                            className="absolute top-[15px] left-[60%] h-1 bg-blue-500 rounded-full"
                        />
                    )}

                    <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 z-10 text-xs ${step === num
                            ? "border-blue-600 bg-blue-600 text-white"
                            : step > num
                                ? "border-green-600 bg-green-600 text-white"
                                : "border-gray-300 bg-white text-gray-500"
                            }`}
                    >
                        {step > num ? "✔" : num}
                    </div>
                    <span className={`mt-2 text-xs ${step >= num ? "text-gray-800" : "text-gray-400"}`}>
                        Step {num}
                    </span>
                </div>
            ))}
        </div>
    )
}

export const StepWrapper = ({ children, step }: { children: any, step: number }) => (
    <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full"
    >
        {children}
    </motion.div>
);

interface StepFooterType {
    step: number,
    onBack: () => void,
    onNext: () => void,
    children?: JSX.Element
}

export const StepFooter = ({ step, onBack, onNext, children }: StepFooterType) => {
    return (
        <div className="flex justify-between mt-6">
            <Button onClick={onBack} disabled={step === 1} variant="outline" className="rounded-xl px-6">
                Back
            </Button>
            {step < 5 ? (
                <Button onClick={onNext} className="rounded-xl px-6">
                    Next
                </Button>
            ) : (
                children
            )}
        </div>
    );
}