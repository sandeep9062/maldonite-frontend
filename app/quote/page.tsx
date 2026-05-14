"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
import {
  Upload,
  FileText,
  Phone,
  Mail,
  CheckCircle,
  User,
  AtSign,
  Clock,
  DollarSign,
  FileCode,
  ChevronRight,
  Sparkles,
  X,
  AlertCircle,
  ArrowRight,
  Send,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { useAddQuoteRequestMutation } from "@/services/quoteRequestApi";
import { generateProjectBriefPDF } from "@/components/PdfGenerator";

// Services + Site Settings
import { useGetServicesQuery } from "@/services/servicesApi";
import { useGetSiteSettingsQuery } from "@/services/siteSettingsApi";

// ── Step definitions for the progress indicator ──
const STEPS = [
  { label: "Contact Info", icon: User },
  { label: "Project Details", icon: FileCode },
  { label: "Review & Submit", icon: Send },
];

const QuoteFormContent = () => {
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

  const [currentStep, setCurrentStep] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // ── Validate a step before moving forward ──
  const validateStep = useCallback(
    (step: number): boolean => {
      if (step === 0) {
        if (!formData.name.trim()) {
          toast.error("Please enter your full name.");
          return false;
        }
        if (!formData.email.trim()) {
          toast.error("Please enter your email.");
          return false;
        }
        if (!formData.phone) {
          toast.error("Please enter your phone number.");
          return false;
        }
        return true;
      }
      if (step === 1) {
        if (!formData.projectType) {
          toast.error("Please select a project type.");
          return false;
        }
        if (!formData.description.trim()) {
          toast.error("Please provide a project description.");
          return false;
        }
        if (!formData.timeline) {
          toast.error("Please select a timeline.");
          return false;
        }
        return true;
      }
      return true;
    },
    [formData],
  );

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.projectType || !formData.timeline) {
      toast.error("Please select both Project Type and Timeline.");
      return;
    }

    try {
      if (!executeRecaptcha) {
        toast.error("reCAPTCHA is not ready yet. Please try again.");
        return;
      }

      const recaptchaToken = await executeRecaptcha("submit_quote_request");

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "files") formDataToSend.append(key, value as string);
      });
      formDataToSend.append("recaptchaToken", recaptchaToken);
      formData.files.forEach((file) => {
        formDataToSend.append("files", file);
      });

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
      setCurrentStep(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
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

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  // ── Drag & drop handlers ──
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...droppedFiles],
    }));
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

  const timelineOptions = [
    { value: "rush", label: "Rush (1-2 weeks)", icon: Clock },
    { value: "standard", label: "1-2 months", icon: Clock },
    { value: "flexible", label: "2-3 months", icon: Clock },
    { value: "planning", label: "3+ months", icon: Clock },
  ];

  // ── Helper to render the step indicator ──
  const renderStepIndicator = () => (
    <div className="mb-10">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {STEPS.map((step, idx) => {
          const StepIcon = step.icon;
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;
          return (
            <div key={idx} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shadow-lg transition-all duration-300 ${
                    isActive ? "ring-4 ring-gold/30 scale-110" : "scale-100"
                  }`}
                  style={{
                    backgroundColor: isCompleted
                      ? "#d4af37"
                      : isActive
                        ? "#d4af37"
                        : "rgb(55, 65, 81)",
                    color: "#fff",
                  }}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <StepIcon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`text-xs mt-2 font-medium transition-colors duration-300 ${
                    isActive || isCompleted
                      ? "text-gold"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mx-4 relative mt-[-1.5rem]">
                  <div className="absolute inset-0 bg-gray-700 rounded" />
                  <div
                    className={`absolute inset-0 bg-gold rounded transition-all duration-500 ${
                      isCompleted ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── Render form fields per step ──
  const renderFormFields = () => {
    switch (currentStep) {
      case 0:
        return (
          <div
            key="step0"
            className="space-y-5 animate-in fade-in slide-in-from-right-5 duration-300"
          >
            <div className="space-y-1">
              <Label
                htmlFor="name"
                className="text-sm font-medium flex items-center gap-2"
              >
                <User className="w-4 h-4 text-gold" />
                Full Name <span className="text-red-500">*</span>
              </Label>
              <div className="relative group">
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className="pl-10 h-12 bg-gray-50 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300 rounded-xl"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gold transition-colors" />
              </div>
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="email"
                className="text-sm font-medium flex items-center gap-2"
              >
                <AtSign className="w-4 h-4 text-gold" />
                Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative group">
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="pl-10 h-12 bg-gray-50 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300 rounded-xl"
                />
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gold transition-colors" />
              </div>
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="phone"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-gold" />
                Phone <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <PhoneInput
                  country={"in"}
                  value={formData.phone}
                  onChange={(phone) => handleInputChange("phone", phone)}
                  inputStyle={{
                    width: "100%",
                    height: "48px",
                    border: "1px solid #d1d5db",
                    borderRadius: "12px",
                    paddingLeft: "50px",
                    fontSize: "14px",
                    backgroundColor: "var(--phone-input-bg, #f9fafb)",
                    color: "var(--phone-input-color, #111827)",
                  }}
                  containerStyle={{
                    width: "100%",
                  }}
                  buttonStyle={{
                    border: "1px solid #d1d5db",
                    borderRight: "none",
                    borderRadius: "12px 0 0 12px",
                    backgroundColor: "var(--phone-btn-bg, #fff)",
                  }}
                  dropdownStyle={{
                    borderRadius: "12px",
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="button"
                onClick={handleNextStep}
                className="bg-gold hover:bg-gold/90 text-black font-semibold px-8 h-12 rounded-xl shadow-lg shadow-gold/25 hover:shadow-gold/40 transition-all duration-300"
              >
                Next Step
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case 1:
        return (
          <div
            key="step1"
            className="space-y-5 animate-in fade-in slide-in-from-right-5 duration-300"
          >
            <div className="space-y-1">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gold" />
                Project Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.projectType}
                onValueChange={(value) =>
                  handleInputChange("projectType", value)
                }
              >
                <SelectTrigger className="h-12 bg-gray-50 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 focus:border-gold focus:ring-2 focus:ring-gold/20 rounded-xl">
                  <SelectValue placeholder="What service do you need?" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {services.map((service) => (
                    <SelectItem key={service.slug} value={service.slug}>
                      {service.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="description"
                className="text-sm font-medium flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-gold" />
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Tell us about your project, goals, and any specific requirements..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                required
                className="bg-gray-50 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300 rounded-xl resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gold" />
                  Budget
                </Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => handleInputChange("budget", value)}
                >
                  <SelectTrigger className="h-12 bg-gray-50 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 focus:border-gold focus:ring-2 focus:ring-gold/20 rounded-xl">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {budgetOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold" />
                  Timeline <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.timeline}
                  onValueChange={(value) =>
                    handleInputChange("timeline", value)
                  }
                >
                  <SelectTrigger className="h-12 bg-gray-50 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 focus:border-gold focus:ring-2 focus:ring-gold/20 rounded-xl">
                    <SelectValue placeholder="When do you need this?" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {timelineOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Improved file upload */}
            <div className="space-y-1">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Upload className="w-4 h-4 text-gold" />
                Upload Reference Files{" "}
                <span className="text-gray-400 font-normal">(Optional)</span>
              </Label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                  isDragging
                    ? "border-gold bg-gold/5 scale-[1.02]"
                    : "border-gray-300 dark:border-gray-600 hover:border-gold/50 hover:bg-gray-50 dark:hover:bg-gray-800/40"
                }`}
              >
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
                <div>
                  <Upload className="mx-auto mb-3 w-8 h-8 text-gray-400" />
                  <p className="text-sm font-medium">
                    {isDragging
                      ? "Drop files here..."
                      : "Drag & drop files here, or click to browse"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PDF, ZIP, JPG, PNG, AI, Sketch (max 10MB each)
                  </p>
                </div>
              </div>
              {/* File previews */}
              {formData.files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {formData.files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/60 rounded-xl px-4 py-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="w-4 h-4 text-gold shrink-0" />
                        <span className="text-sm truncate">{file.name}</span>
                        <span className="text-xs text-gray-400 shrink-0">
                          ({(file.size / 1024).toFixed(0)} KB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(idx);
                        }}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-colors"
                      >
                        <X className="w-3.5 h-3.5 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                className="h-12 px-8 rounded-xl border-gray-300 dark:border-gray-600"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={handleNextStep}
                className="bg-gold hover:bg-gold/90 text-black font-semibold px-8 h-12 rounded-xl shadow-lg shadow-gold/25 hover:shadow-gold/40 transition-all duration-300"
              >
                Review & Submit
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div
            key="step2"
            className="space-y-5 animate-in fade-in slide-in-from-right-5 duration-300"
          >
            {/* Summary card */}
            <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" />
                Review Your Request
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Name:</span>
                  <p className="font-medium">{formData.name}</p>
                </div>
                <div>
                  <span className="text-gray-500">Email:</span>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <span className="text-gray-500">Phone:</span>
                  <p className="font-medium">+{formData.phone}</p>
                </div>
                <div>
                  <span className="text-gray-500">Project Type:</span>
                  <p className="font-medium">
                    {services.find((s) => s.slug === formData.projectType)
                      ?.title || formData.projectType}
                  </p>
                </div>
                {formData.budget && (
                  <div>
                    <span className="text-gray-500">Budget:</span>
                    <p className="font-medium">
                      {budgetOptions.find((o) => o.value === formData.budget)
                        ?.label || formData.budget}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-gray-500">Timeline:</span>
                  <p className="font-medium">
                    {timelineOptions.find((o) => o.value === formData.timeline)
                      ?.label || formData.timeline}
                  </p>
                </div>
              </div>
              {formData.description && (
                <div>
                  <span className="text-gray-500 text-sm">Description:</span>
                  <p className="text-sm mt-1 leading-relaxed">
                    {formData.description}
                  </p>
                </div>
              )}
              {formData.files.length > 0 && (
                <div>
                  <span className="text-gray-500 text-sm">Files attached:</span>
                  <p className="text-sm mt-1">
                    {formData.files.length} file(s)
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                className="h-12 px-8 rounded-xl border-gray-300 dark:border-gray-600"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-black font-bold px-10 h-12 rounded-xl shadow-lg shadow-gold/30 hover:shadow-gold/50 transition-all duration-300 disabled:opacity-60 relative overflow-hidden group"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full inline-block animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Submit Quote Request
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
                {/* Shimmer effect on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-[#0D1321] text-black dark:text-white min-h-screen transition-colors duration-300 relative overflow-hidden">
      {/* ── Background decorative elements ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* ── Hero Section ── */}
        <div className="text-center mb-10 mt-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Get Your <span className="text-gold">Custom Quote</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Tell us about your project and we'll provide you with a detailed,
            tailored quote within 24 hours.
          </p>
        </div>

        {/* ── Step Progress Indicator ── */}
        {renderStepIndicator()}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* ── Form Card ── */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-[#1a1a1a] backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-xl shadow-black/5 dark:shadow-black/20 rounded-2xl overflow-hidden transition-all duration-300">
              <div className="h-1.5 bg-gradient-to-r from-gold via-yellow-400 to-gold" />
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  {currentStep === 0 && "Contact Information"}
                  {currentStep === 1 && "Project Details"}
                  {currentStep === 2 && "Final Review"}
                  <span className="text-sm font-normal text-gray-400 ml-auto">
                    Step {currentStep + 1} of 3
                  </span>
                </CardTitle>
                <CardDescription>
                  {currentStep === 0 && "We'll never share your information."}
                  {currentStep === 1 &&
                    "Help us understand your project better."}
                  {currentStep === 2 &&
                    "Double-check everything before submitting."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {renderFormFields()}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            {/* What You Get */}
            <Card className="dark:bg-[#1a1a1a] backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-1 bg-gradient-to-r from-gold via-yellow-400 to-gold" />
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Sparkles className="h-5 w-5 mr-2 text-gold" />
                  What You Get
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Quick Response */}
            <Card className="relative dark:bg-[#1a1a1a] backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="h-5 w-5 mr-2 text-gold" />
                  Quick Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-6 h-6 text-gold" />
                  </div>
                  <p className="text-sm leading-relaxed">
                    We typically respond within{" "}
                    <strong className="text-gold">24 hours</strong> on business
                    days.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card className="dark:bg-[#1a1a1a] backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <AlertCircle className="h-5 w-5 mr-2 text-gold" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a
                  href={`tel:+91${siteSettings?.contactNo1}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-all group/link"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0 group-hover/link:bg-gold/20 transition-colors">
                    <Phone className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Call us</p>
                    <span className="text-sm font-medium">
                      +91 {siteSettings?.contactNo1}
                    </span>
                  </div>
                </a>
                <a
                  href={`mailto:${siteSettings?.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-all group/link"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0 group-hover/link:bg-gold/20 transition-colors">
                    <Mail className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email us</p>
                    <span className="text-sm font-medium break-all">
                      {siteSettings?.email}
                    </span>
                  </div>
                </a>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="w-full h-12 rounded-xl border-gold/30 text-gold hover:bg-gold hover:text-black transition-all duration-300 group/btn"
                  >
                    <FileText className="h-4 w-4 mr-2 group-hover/btn:animate-gold-bounce" />
                    Download Project Brief
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const Quote = () => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!siteKey) {
    return (
      <div className="bg-white dark:bg-[#0D1321] text-black dark:text-white min-h-screen transition-colors duration-300 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-gold" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Quote Request Temporarily Unavailable
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            We're experiencing technical issues with our quote request form.
            Please try again later or contact us directly.
          </p>
        </div>
      </div>
    );
  }

  if (!isClient) {
    return (
      <div className="bg-white dark:bg-[#0D1321] text-black dark:text-white min-h-screen transition-colors duration-300 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      <QuoteFormContent />
    </GoogleReCaptchaProvider>
  );
};

export default Quote;
