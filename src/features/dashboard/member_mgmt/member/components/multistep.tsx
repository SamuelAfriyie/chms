import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function MultiStepForm() {
    const [step, setStep] = useState(1);

    const next = () => setStep((prev) => Math.min(prev + 1, 3));
    const back = () => setStep((prev) => Math.max(prev - 1, 1));

    const progress = (step / 3) * 100;

    const StepWrapper = ({ children }: { children: any }) => (
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

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-xl shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">Multi-Step Form</CardTitle>
                </CardHeader>

                <CardContent>
                    {/* Step Tracker */}
                    <div className="flex items-center justify-between mb-6 relative">
                        {[1, 2, 3].map((num, idx) => (
                            <div key={num} className="flex flex-col items-center w-full relative">
                                {/* Connector Line */}
                                {idx < 2 && (
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: step > num ? "100%" : "0%" }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute top-5 left-[60%] h-1 bg-blue-500 rounded-full"
                                    />
                                )}

                                <div
                                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 z-10 ${step === num
                                            ? "border-blue-600 bg-blue-600 text-white"
                                            : step > num
                                                ? "border-green-600 bg-green-600 text-white"
                                                : "border-gray-300 bg-white text-gray-500"
                                        }`}
                                >
                                    {step > num ? "✔" : num}
                                </div>
                                <span className={`mt-2 text-sm ${step >= num ? "text-gray-800" : "text-gray-400"}`}>
                                    Step {num}
                                </span>
                            </div>
                        ))}
                    </div>

                    <Progress value={progress} className="mb-6" />

                    {step === 1 && (
                        <StepWrapper>
                            <div className="space-y-4">
                                <h2 className="text-lg font-medium text-gray-700">Step 1: Personal Info</h2>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full p-3 rounded-xl border focus:ring focus:ring-blue-300"
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full p-3 rounded-xl border focus:ring focus:ring-blue-300"
                                />
                            </div>
                        </StepWrapper>
                    )}

                    {step === 2 && (
                        <StepWrapper>
                            <div className="space-y-4">
                                <h2 className="text-lg font-medium text-gray-700">Step 2: Address Details</h2>
                                <input
                                    type="text"
                                    placeholder="Street Address"
                                    className="w-full p-3 rounded-xl border focus:ring focus:ring-blue-300"
                                />
                                <input
                                    type="text"
                                    placeholder="City"
                                    className="w-full p-3 rounded-xl border focus:ring focus:ring-blue-300"
                                />
                            </div>
                        </StepWrapper>
                    )}

                    {step === 3 && (
                        <StepWrapper>
                            <div className="space-y-4">
                                <h2 className="text-lg font-medium text-gray-700">Step 3: Confirmation</h2>
                                <p className="text-gray-600">Review your details and submit.</p>
                            </div>
                        </StepWrapper>
                    )}

                    <div className="flex justify-between mt-6">
                        <Button onClick={back} disabled={step === 1} variant="outline" className="rounded-xl px-6">
                            Back
                        </Button>
                        {step < 3 ? (
                            <Button onClick={next} className="rounded-xl px-6">
                                Next
                            </Button>
                        ) : (
                            <Button className="rounded-xl px-6">Submit</Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
