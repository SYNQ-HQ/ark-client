import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, Wallet, Heart, PartyPopper } from "lucide-react";

const donationAmounts = [
  { value: "25", label: "$25", subtext: "Feeds 5 families" },
  { value: "50", label: "$50", subtext: "Clean water for 10" },
  { value: "100", label: "$100", subtext: "School supplies for 25" },
  { value: "250", label: "$250", subtext: "Medical care for 50" },
];

const steps = [
  { id: 1, title: "Amount", icon: Heart },
  { id: 2, title: "Details", icon: Wallet },
  { id: 3, title: "Complete", icon: Check },
];

export default function DonateForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [amount, setAmount] = useState("50");
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Donation submitted:", { amount: customAmount || amount, name, email, message });
    setCurrentStep(3);
  };

  return (
    <section className="py-20 md:py-28 bg-ark-cream" data-testid="donate-form-section">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Make a Donation
          </h2>
          <p className="text-lg text-muted-foreground">
            Your generosity directly funds life-changing missions around the world.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.id
                    ? "bg-ark-orange text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
                data-testid={`step-indicator-${step.id}`}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-20 h-1 mx-2 ${
                    currentStep > step.id ? "bg-ark-orange" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-6">Choose Amount</h3>
                
                <RadioGroup value={amount} onValueChange={setAmount} className="grid grid-cols-2 gap-4 mb-6">
                  {donationAmounts.map((option) => (
                    <Label
                      key={option.value}
                      htmlFor={option.value}
                      className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                        amount === option.value
                          ? "border-ark-orange bg-ark-orange/5"
                          : "border-gray-100 hover:border-ark-orange/30"
                      }`}
                      data-testid={`donation-option-${option.value}`}
                    >
                      <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                      <span className="text-2xl font-bold text-foreground">{option.label}</span>
                      <span className="text-xs text-muted-foreground text-center">{option.subtext}</span>
                    </Label>
                  ))}
                </RadioGroup>

                <div className="space-y-2">
                  <Label htmlFor="custom">Custom Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="custom"
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setAmount("");
                      }}
                      className="pl-7"
                      data-testid="input-custom-amount"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full mt-6 bg-ark-orange hover:bg-ark-orange/90"
                  data-testid="button-next-step"
                >
                  Continue
                </Button>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-6">Your Details</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name (Optional)</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      data-testid="input-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-testid="input-email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Leave a message of support..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      data-testid="input-message"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={handleBack} className="flex-1" data-testid="button-back">
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-ark-orange hover:bg-ark-orange/90"
                    data-testid="button-complete-donation"
                  >
                    Complete Donation
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 rounded-full bg-ark-orange/10 flex items-center justify-center mx-auto mb-6">
                  <PartyPopper className="w-10 h-10 text-ark-orange" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
                <p className="text-muted-foreground mb-6">
                  Your donation of ${customAmount || amount} will make a real difference.
                </p>
                <Button
                  onClick={() => setCurrentStep(1)}
                  variant="outline"
                  className="border-ark-orange text-ark-orange hover:bg-ark-orange/10"
                  data-testid="button-donate-again"
                >
                  Donate Again
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </section>
  );
}
