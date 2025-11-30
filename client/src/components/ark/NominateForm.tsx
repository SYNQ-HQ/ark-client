import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, FileText, Check } from "lucide-react";

const categories = [
  { value: "education", label: "Education" },
  { value: "health", label: "Healthcare" },
  { value: "environment", label: "Environment" },
  { value: "poverty", label: "Poverty Relief" },
  { value: "disaster", label: "Disaster Relief" },
  { value: "community", label: "Community Development" },
  { value: "other", label: "Other" },
];

export default function NominateForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    causeName: "",
    category: "",
    location: "",
    description: "",
    reason: "",
    website: "",
    contactName: "",
    contactEmail: "",
  });
  const [files, setFiles] = useState<string[]>([]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = () => {
    const fileName = `document_${files.length + 1}.pdf`;
    setFiles([...files, fileName]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nomination submitted:", { ...formData, files });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-20 md:py-28 bg-white" data-testid="nominate-form-section">
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card className="p-8 md:p-12">
              <div className="w-20 h-20 rounded-full bg-ark-orange/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-ark-orange" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Nomination Submitted!
              </h2>
              <p className="text-muted-foreground mb-6">
                Thank you for nominating a cause. Our team will review your submission
                and get back to you within 7-10 business days.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    causeName: "",
                    category: "",
                    location: "",
                    description: "",
                    reason: "",
                    website: "",
                    contactName: "",
                    contactEmail: "",
                  });
                  setFiles([]);
                }}
                className="bg-ark-orange hover:bg-ark-orange/90"
                data-testid="button-nominate-another"
              >
                Nominate Another Cause
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-white" data-testid="nominate-form-section">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Nominate a Cause
          </h2>
          <p className="text-lg text-muted-foreground">
            Know a worthy cause? Submit it for community consideration.
          </p>
        </motion.div>

        <Card className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="causeName">Cause / Organization Name *</Label>
                <Input
                  id="causeName"
                  required
                  value={formData.causeName}
                  onChange={(e) => handleChange("causeName", e.target.value)}
                  placeholder="Name of the cause"
                  data-testid="input-cause-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleChange("category", value)}
                >
                  <SelectTrigger data-testid="select-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                required
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="City, Country"
                data-testid="input-location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe the cause and its mission..."
                rows={4}
                data-testid="input-description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Why Should ARK Fund This? *</Label>
              <Textarea
                id="reason"
                required
                value={formData.reason}
                onChange={(e) => handleChange("reason", e.target.value)}
                placeholder="Explain the impact and why this cause deserves support..."
                rows={4}
                data-testid="input-reason"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="https://..."
                data-testid="input-website"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Your Name *</Label>
                <Input
                  id="contactName"
                  required
                  value={formData.contactName}
                  onChange={(e) => handleChange("contactName", e.target.value)}
                  placeholder="Your full name"
                  data-testid="input-contact-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Your Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => handleChange("contactEmail", e.target.value)}
                  placeholder="your@email.com"
                  data-testid="input-contact-email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Supporting Documents</Label>
              <div
                className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-ark-orange/50 transition-colors"
                onClick={handleFileUpload}
                data-testid="upload-area"
              >
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload documents (PDF, images)
                </p>
              </div>
              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-ark-cream rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-ark-orange" />
                        <span className="text-sm">{file}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(index)}
                        className="h-8 w-8"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-ark-orange hover:bg-ark-orange/90"
              data-testid="button-submit-nomination"
            >
              Submit Nomination
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
