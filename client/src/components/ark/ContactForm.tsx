import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send, Check } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-20 md:py-28 bg-ark-cream" data-testid="contact-form-section">
        <div className="max-w-xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-ark-orange/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-ark-orange" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
              <p className="text-muted-foreground mb-6">
                We'll get back to you as soon as possible.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", subject: "", message: "" });
                }}
                variant="outline"
                className="border-ark-orange text-ark-orange hover:bg-ark-orange/10"
                data-testid="button-send-another"
              >
                Send Another Message
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-ark-cream" data-testid="contact-form-section">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 md:p-8 h-full">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Your name"
                    data-testid="input-contact-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="your@email.com"
                    data-testid="input-contact-email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    placeholder="How can we help?"
                    data-testid="input-contact-subject"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Your message..."
                    rows={5}
                    data-testid="input-contact-message"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-ark-orange hover:bg-ark-orange/90"
                  data-testid="button-send-message"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-ark-orange/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-ark-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    For general inquiries and support
                  </p>
                  <a href="mailto:hello@arkmovement.io" className="text-ark-orange hover:underline" data-testid="link-email">
                    hello@arkmovement.io
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-ark-orange/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-ark-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Community</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Join our active community channels
                  </p>
                  <div className="flex gap-3">
                    <a href="#" className="text-ark-orange hover:underline text-sm" data-testid="link-telegram">
                      Telegram
                    </a>
                    <a href="#" className="text-ark-orange hover:underline text-sm" data-testid="link-discord">
                      Discord
                    </a>
                    <a href="#" className="text-ark-orange hover:underline text-sm" data-testid="link-twitter">
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-ark-orange/5 to-ark-magenta/5">
              <h3 className="font-semibold text-foreground mb-2">Partnerships</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Interested in partnering with ARK? We're always looking to collaborate with like-minded organizations.
              </p>
              <a href="mailto:partnerships@arkmovement.io" className="text-ark-orange hover:underline text-sm" data-testid="link-partnerships">
                partnerships@arkmovement.io
              </a>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
