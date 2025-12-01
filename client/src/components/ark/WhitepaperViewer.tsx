import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  ExternalLink,
  FileText,
  BookOpen,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// Configure PDF.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf-js/pdf.worker.min.mjs";

const whitepaperSections = [
  { title: "0. PREFACE - The Birth of a Kindness Economy", page: 1 },
  { title: "1. WHAT IS ARK?", page: 1 },
  { title: "2. THE PROBLEM", page: 2 },
  { title: "3. MISSION & VISION", page: 2 },
  { title: "4. THE $ACT TOKEN", page: 3 },
  { title: "5. TOKEN ECONOMICS", page: 3 },
  { title: "6. THE ARK ECOSYSTEM", page: 5 },
  { title: "7. UTILITY CASES", page: 6 },
  { title: "8. ROADMAP", page: 7 },
  { title: "9. GOVERNANCE (CONCEPTUAL)", page: 9 },
  { title: "10. GOVERNANCE (CONCEPTUAL)", page: 9 },
  { title: "11. THE CALL - JOIN THE KINDNESSECONOMY", page: 10 },
];

export default function WhitepaperViewer() {
  // Update this path to your actual PDF location
  const pdfUrl = "/ARK ($ACT) WHITEPAPER.pdf";

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error("Error loading PDF:", error);
    setError("Failed to load PDF. Please check the file path.");
    setLoading(false);
  };

  const goToPage = (page) => {
    setPageNumber(page);
    // Scroll to PDF viewer
    const viewer = document.getElementById("pdf-viewer");
    if (viewer) {
      viewer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "ARK ($ACT) WHITEPAPER.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <section
      className="py-20 md:py-28 bg-white"
      data-testid="whitepaper-viewer-section"
    >
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
            Dive deep into the ARK ecosystem, tokenomics, technology, and
            vision.
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                ARK Whitepaper
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Last updated: November 2025
                <br />
                38 pages
              </p>
              <div className="space-y-3">
                <Button
                  onClick={handleDownload}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  data-testid="button-download-pdf"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button
                  onClick={handleOpenNewTab}
                  variant="outline"
                  className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
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
                <FileText className="w-5 h-5 text-orange-500" />
                Table of Contents
              </h4>
              <div className="space-y-2">
                {whitepaperSections.map((section, index) => (
                  <div
                    key={index}
                    onClick={() => goToPage(section.page)}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors group"
                    data-testid={`whitepaper-section-${index}`}
                  >
                    <span className="text-foreground group-hover:text-orange-500 transition-colors">
                      {section.title}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      p. {section.page}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-orange-50 rounded-xl">
                <h4 className="font-semibold text-foreground mb-3">
                  Quick Summary
                </h4>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    The ARK Movement is a revolutionary Web3 social impact
                    ecosystem built on Binance Smart Chain. Our $ACT token
                    creates a sustainable funding mechanism for charitable
                    missions worldwide.
                  </p>
                  <p>
                    Key innovations include transparent on-chain donation
                    tracking, community governance for mission selection, and a
                    tokenomics model that rewards holders while funding impact.
                  </p>
                  <p>
                    Our goal is to prove that cryptocurrency can be a force for
                    good - building the world's largest decentralized charitable
                    network.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* PDF Viewer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
          id="pdf-viewer"
        >
          <Card className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <h4 className="font-semibold text-foreground">PDF Preview</h4>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                  disabled={pageNumber <= 1 || loading}
                  className="px-3"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-muted-foreground min-w-[80px] text-center">
                  {loading ? "..." : `${pageNumber} / ${numPages || "?"}`}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPageNumber(Math.min(numPages || 1, pageNumber + 1))
                  }
                  disabled={pageNumber >= (numPages || 1) || loading}
                  className="px-3"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex justify-center bg-gray-100 rounded-lg p-4 min-h-[600px] items-center">
              {loading && !error && (
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                  <span>Loading PDF...</span>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center gap-3 text-red-500">
                  <FileText className="w-12 h-12" />
                  <p className="text-center max-w-md">{error}</p>
                  <p className="text-sm text-muted-foreground">
                    Make sure the PDF file is in your public folder
                  </p>
                </div>
              )}

              {!error && (
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading=""
                  className="flex justify-center"
                >
                  <Page
                    pageNumber={pageNumber}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    width={Math.min(
                      800,
                      typeof window !== "undefined"
                        ? window.innerWidth - 100
                        : 800,
                    )}
                  />
                </Document>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
