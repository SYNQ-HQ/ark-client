import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, FileText, BookOpen } from "lucide-react";

// todo: remove mock functionality - this would link to actual PDF
const whitepaperSections = [
  { title: "1. Executive Summary", page: 3 },
  { title: "2. The Problem", page: 5 },
  { title: "3. Our Solution", page: 8 },
  { title: "4. Token Economics", page: 12 },
  { title: "5. Technology", page: 18 },
  { title: "6. Governance", page: 24 },
  { title: "7. Roadmap", page: 28 },
  { title: "8. Team", page: 32 },
  { title: "9. Legal Disclaimer", page: 35 },
];

export default function WhitepaperViewer() {
  const handleDownload = () => {
    console.log("Downloading whitepaper PDF...");
  };

  return (
    <section className="py-20 md:py-28 bg-white" data-testid="whitepaper-viewer-section">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Whitepaper
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive deep into the ARK ecosystem, tokenomics, technology, and vision.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 sticky top-24">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ark-orange to-ark-magenta flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">ARK Whitepaper v2.0</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Last updated: November 2024<br />
                38 pages
              </p>
              <div className="space-y-3">
                <Button
                  onClick={handleDownload}
                  className="w-full bg-ark-orange hover:bg-ark-orange/90"
                  data-testid="button-download-pdf"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-ark-orange text-ark-orange hover:bg-ark-orange/10"
                  data-testid="button-open-new-tab"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in New Tab
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 md:p-8">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-ark-orange" />
                Table of Contents
              </h4>
              <div className="space-y-2">
                {whitepaperSections.map((section, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-ark-cream cursor-pointer transition-colors group"
                    data-testid={`whitepaper-section-${index}`}
                  >
                    <span className="text-foreground group-hover:text-ark-orange transition-colors">
                      {section.title}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      p. {section.page}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-ark-cream rounded-xl">
                <h4 className="font-semibold text-foreground mb-3">Quick Summary</h4>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    The ARK Movement is a revolutionary Web3 social impact ecosystem built on
                    Binance Smart Chain. Our $ACT token creates a sustainable funding mechanism
                    for charitable missions worldwide.
                  </p>
                  <p>
                    Key innovations include transparent on-chain donation tracking, community
                    governance for mission selection, and a tokenomics model that rewards
                    holders while funding impact.
                  </p>
                  <p>
                    Our goal is to prove that cryptocurrency can be a force for good—building
                    the world's largest decentralized charitable network.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
