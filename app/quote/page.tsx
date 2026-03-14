"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileText, Phone, Mail, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAddQuoteRequestMutation } from "@/services/quoteRequestApi";
import { generateProjectBriefPDF } from "@/components/PdfGenerator";

// Services + Site Settings
import { useGetServicesQuery } from "@/services/servicesApi";
import { useGetSiteSettingsQuery } from "@/services/siteSettingsApi";

const Quote = () => {
  const { data: services = [] } = useGetServicesQuery();
  const { data: siteSettings } = useGetSiteSettingsQuery();

  const [addQuoteRequest, { isLoading }] = useAddQuoteRequestMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    description: "",
    budget: "",
    timeline: "",
    files: [] as File[],
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Manual validation for Select fields
    if (!formData.projectType || !formData.timeline) {
      toast.error("Please select both Project Type and Timeline.");
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "files") formDataToSend.append(key, value as string);
    });

    formData.files.forEach((file) => {
      formDataToSend.append("files", file);
    });

    try {
      await addQuoteRequest(formDataToSend).unwrap();
      toast.success("Quote request submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        description: "",
        budget: "",
        timeline: "",
        files: [],
      });
      if (fileInputRef.current) fileInputRef.current.value = ""; // reset input
    } catch {
      toast.error("An error occurred while submitting the quote request.");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDownload = () => {
    if (!siteSettings) {
      toast.error("Site settings not available yet.");
      return;
    }
    generateProjectBriefPDF(siteSettings);
  };

  const benefits = [
    "Free consultation & strategy session",
    "Expert technical recommendations",
    "Tailored solutions for your business goals",
    "Clear communication & project management",
    "Competitive and transparent pricing",
    "Long-term partnership & support",
  ];

  const budgetOptions = [
    { value: "500-2500", label: "$500 - $2,500" },
    { value: "2500-5000", label: "$2,500 - $5,000" },
    { value: "5000-10000", label: "$5,000 - $10,000" },
    { value: "10000-25000", label: "$10,000 - $25,000" },
    { value: "over-25000", label: "Over $25,000" },
    { value: "not-sure", label: "Not sure" },
  ];

  return (
    <div className="bg-white mt-10 pb-20 dark:bg-darkbg1 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 mt-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get Your <span className="text-gradient">Custom Quote</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tell us about your project and we&apos;ll provide you with a detailed quote.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <motion.div className="lg:col-span-2">
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Project Details</CardTitle>
                <CardDescription>
                  Provide as much detail as possible for an accurate quote.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <PhoneInput
                      country={"in"}
                      value={formData.phone}
                      onChange={(phone) => handleInputChange("phone", phone)}
                      inputStyle={{
                        width: "100%",
                        height: "40px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        paddingLeft: "48px",
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                      buttonStyle={{
                        border: "1px solid #d1d5db",
                        borderRight: "none",
                      }}
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <Label>Project Type *</Label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) => handleInputChange("projectType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.slug} value={service.slug}>
                            {service.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      required
                    />
                  </div>

                  {/* Budget & Timeline */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Budget</Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => handleInputChange("budget", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Timeline *</Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) => handleInputChange("timeline", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="When do you need this?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rush">Rush (1-2 weeks)</SelectItem>
                          <SelectItem value="standard">1-2 months</SelectItem>
                          <SelectItem value="flexible">2-3 months</SelectItem>
                          <SelectItem value="planning">3+ months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <Label>Upload Reference Files (Optional)</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="mx-auto mb-2 text-gray-400" />
                      <Input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        accept=".pdf,.zip,.jpg,.jpeg,.png,.ai,.sketch"
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            files: Array.from(e.target.files || []),
                          }));
                        }}
                        className="hidden"
                      />
                      <Button type="button" onClick={() => fileInputRef.current?.click()}>
                        Choose Files
                      </Button>
                    </div>
                    {formData.files.length > 0 && (
                      <ul className="mt-2 text-sm list-disc pl-5">
                        {formData.files.map((file, idx) => (
                          <li key={idx}>{file.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Submit */}
                  <Button type="submit" disabled={isLoading} className="w-full bg-gold text-black">
                    {isLoading ? "Submitting..." : "Submit Quote Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div className="space-y-6 ">
            <Card className="dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-gold" />
                  What You Get
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-gold mr-2" />
                      {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-900">
              <CardHeader>
                <CardTitle>Quick Response</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">We typically respond within 24h (business days).</p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-900">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a href={`tel:+91${siteSettings?.contactNo1}`} className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gold" />
                  <span>+91 {siteSettings?.contactNo1}</span>
                </a>
                <a href={`mailto:${siteSettings?.email}`} className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gold" />
                  <span>{siteSettings?.email}</span>
                </a>
                <Button onClick={handleDownload} variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2 text-gold" />
                  Download Project Brief
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
