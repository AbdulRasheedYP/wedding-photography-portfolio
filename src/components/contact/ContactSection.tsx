import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ContactFormState } from "../../types";

const SHOOT_TYPES = [
  { value: "videography",  label: "Event & Commercial Videography" },
  { value: "photography",  label: "Photography & Editorial Portraits" },
  { value: "reels",        label: "Reel Editing & Short-Form Content" },
  { value: "fashion",      label: "Fashion & Bridal Campaigns" },
  { value: "colorgrading", label: "DaVinci Resolve Color Grading" },
  { value: "corporate",    label: "Corporate & Cultural Galas" },
  { value: "other",        label: "Other / Custom Project" },
];

const INITIAL_FORM: ContactFormState = {
  name: "", email: "", phone: "",
  project_type: "videography",
  budget_range: "",
  message: "",
};

type FormErrors = Partial<Record<keyof ContactFormState, string>>;
type FormTouched = Partial<Record<keyof ContactFormState, boolean>>;
type Status = "idle" | "sending" | "success" | "error";

interface Props { prefill?: Partial<ContactFormState> | null; }

const validateField = (name: keyof ContactFormState, value: string): string | undefined => {
  const val = value.trim();
  switch (name) {
    case "name":
      if (!val) return "Please enter your full name.";
      if (val.length < 2) return "Full name must be at least 2 characters.";
      if (!/^[\p{L}\s.'-]+$/u.test(val)) return "Please enter a valid name (letters only).";
      return undefined;

    case "email":
      if (!val) return "Please enter your email address.";
      // RFC-compliant email regex
      if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(val)) {
        return "Please enter a valid email address (e.g. name@domain.com).";
      }
      return undefined;

    case "phone":
      if (!val) return undefined; // Optional field
      const digitsOnly = val.replace(/\D/g, "");
      if (digitsOnly.length < 7 || digitsOnly.length > 15 || !/^[+]?[\d\s().-]{7,20}$/.test(val)) {
        return "Please enter a valid phone or WhatsApp number (min 7 digits, e.g. +971 50 123 4567).";
      }
      return undefined;

    case "message":
      if (!val) return "Please tell me about your project, dates, or deliverables.";
      if (val.length < 15) return `Please provide at least 15 characters (currently ${val.length}/15).`;
      if (val.length > 1500) return "Message is too long (maximum 1500 characters).";
      return undefined;

    default:
      return undefined;
  }
};

const ContactSection: React.FC<Props> = ({ prefill }) => {
  const sectionRef              = useRef<HTMLElement>(null);
  const [form, setForm]         = useState<ContactFormState>({ ...INITIAL_FORM, ...prefill });
  const [touched, setTouched]   = useState<FormTouched>({});
  const [status, setStatus]     = useState<Status>("idle");
  const [errors, setErrors]     = useState<FormErrors>({});

  useEffect(() => { if (prefill) setForm((f) => ({ ...f, ...prefill })); }, [prefill]);

  const validateAll = (): FormErrors => {
    const errs: FormErrors = {};
    (["name", "email", "phone", "message"] as (keyof ContactFormState)[]).forEach((field) => {
      const err = validateField(field, form[field] || "");
      if (err) errs[field] = err;
    });
    return errs;
  };

  const handleBlur = (field: keyof ContactFormState) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const err = validateField(field, form[field] || "");
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const field = name as keyof ContactFormState;
    setForm((f) => ({ ...f, [field]: value }));

    // Real-time validation if already touched or has error
    if (touched[field] || errors[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  }, [touched, errors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all required fields as touched
    setTouched({ name: true, email: true, phone: true, message: true });

    const allErrs = validateAll();
    if (Object.keys(allErrs).length > 0) {
      setErrors(allErrs);
      // Focus the first invalid field
      const firstErrorField = Object.keys(allErrs)[0];
      const element = document.getElementById(firstErrorField);
      element?.focus();
      return;
    }

    setStatus("sending");

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "032e1406-c71b-44a7-ad05-5167fb9f8f0e";

      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("from_name", "Adil Mubarak Portfolio");
      formData.append("subject", `New Project Enquiry: ${form.name} [${form.project_type}]`);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone || "Not provided");
      formData.append("project_type", form.project_type);
      formData.append("message", form.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setForm(INITIAL_FORM);
        setTouched({});
      } else {
        console.error("Web3Forms error response:", data);
        setStatus("error");
      }
    } catch (err) {
      console.error("Web3Forms submission error:", err);
      setStatus("error");
    }
  };

  const inputCls = (field: keyof ContactFormState) => {
    const hasError = !!errors[field];
    const isSuccess = touched[field] && !hasError && form[field] && form[field]!.trim().length > 0;

    let borderState = "border-white/10 focus:border-white/30";
    if (hasError) {
      borderState = "border-red-500/70 bg-red-950/10 focus:border-red-500 focus:ring-1 focus:ring-red-500/30";
    } else if (isSuccess) {
      borderState = "border-emerald-500/30 focus:border-emerald-500/50";
    }

    return `w-full bg-[#141414] border ${borderState} px-4 py-3.5 rounded-xl text-[#F1EDE3] placeholder-[#67685D] focus:outline-none transition-all duration-200 text-base sm:text-sm`;
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-5 sm:px-8 bg-black text-[#F1EDE3] relative overflow-hidden scroll-mt-20">

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Sidebar */}
          <div className="lg:col-span-5 space-y-7">
            <div>
              <p className="text-[11px] font-display font-bold uppercase tracking-widest text-[#8D8B82] mb-3">Enquire &amp; Connect</p>
              <h2 className="font-serif text-5xl sm:text-6xl tracking-tight leading-[0.95] mb-4 font-normal">
                Let's Create<br />
                <span className="text-[#D8D1C2] italic">Something Real</span>
              </h2>
              <p className="text-[#8D8B82] text-[15px] leading-relaxed max-w-sm">
                Based in Dubai — available for events, fashion, and content projects worldwide. I'll personally get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-5 pt-6 border-t border-[#F1EDE3]/8">
              <div>
                <p className="text-[10px] font-display font-bold uppercase tracking-widest text-[#67685D] mb-1">Email</p>
                <a href="mailto:adilmubarack03@gmail.com" className="font-display font-semibold text-[15px] text-[#D8D1C2] hover:text-[#F1EDE3] transition-colors">
                  adilmubarack03@gmail.com
                </a>
              </div>

              <div>
                <p className="text-[10px] font-display font-bold uppercase tracking-widest text-[#67685D] mb-1">Instagram</p>
                <a href="https://instagram.com/adilmubarackk" target="_blank" rel="noopener noreferrer" className="font-display font-semibold text-[15px] text-[#D8D1C2] hover:text-[#F1EDE3] transition-colors">
                  @adilmubarackk
                </a>
              </div>

              <div>
                <p className="text-[10px] font-display font-bold uppercase tracking-widest text-[#67685D] mb-1">Base &amp; Availability</p>
                <p className="font-display font-semibold text-[15px] text-[#D8D1C2]">Dubai, UAE · Available Worldwide</p>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-2">
                <a
                  href="https://wa.me/971568709412?text=Hi%20Adil,%20I'd%20like%20to%20enquire%20about%20your%20work."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-all font-display text-xs font-semibold tracking-wider group"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="contact-form">
              {status === "success" ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#F1EDE3] text-black text-2xl flex items-center justify-center mx-auto font-bold">✓</div>
                  <h3 className="font-display font-extrabold text-xl text-[#F1EDE3]">Enquiry Received!</h3>
                  <p className="text-[#8D8B82] text-xs max-w-xs mx-auto">Thank you. I have received your project details and will personally get back to you within 24 hours.</p>
                  <button onClick={() => setStatus("idle")} className="bg-[#F1EDE3] text-black px-6 py-2 rounded-full font-bold text-xs mt-4 hover:bg-[#D8D1C2] transition-colors">
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Web3Forms Honeypot Spam Protection */}
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="name" className="block text-[11px] font-display font-bold uppercase tracking-widest text-[#A8A499] mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur("name")}
                        placeholder="e.g. Rahul Sharma"
                        className={inputCls("name")}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="flex items-center gap-1.5 text-red-400 text-[11px] font-sans mt-1.5">
                          <svg className="w-3.5 h-3.5 flex-shrink-0 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-[11px] font-display font-bold uppercase tracking-widest text-[#A8A499] mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        placeholder="you@example.com"
                        className={inputCls("email")}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="flex items-center gap-1.5 text-red-400 text-[11px] font-sans mt-1.5">
                          <svg className="w-3.5 h-3.5 flex-shrink-0 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone / WhatsApp */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="phone" className="block text-[11px] font-display font-bold uppercase tracking-widest text-[#A8A499]">
                          Phone / WhatsApp
                        </label>
                        <span className="text-[10px] text-[#67685D] font-sans">Optional</span>
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        onBlur={() => handleBlur("phone")}
                        placeholder="+971 … / +91 …"
                        className={inputCls("phone")}
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && (
                        <p className="flex items-center gap-1.5 text-red-400 text-[11px] font-sans mt-1.5">
                          <svg className="w-3.5 h-3.5 flex-shrink-0 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Project / Shoot Type */}
                    <div>
                      <label htmlFor="project_type" className="block text-[11px] font-display font-bold uppercase tracking-widest text-[#A8A499] mb-2">
                        Project / Shoot Type <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="project_type"
                        name="project_type"
                        value={form.project_type}
                        onChange={handleChange}
                        className={`${inputCls("project_type")} appearance-none cursor-pointer`}
                      >
                        {SHOOT_TYPES.map((t) => (
                          <option key={t.value} value={t.value} className="bg-[#141414] text-[#F1EDE3]">
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Concept & Details */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="message" className="block text-[11px] font-display font-bold uppercase tracking-widest text-[#A8A499]">
                        Project Concept &amp; Details <span className="text-red-400">*</span>
                      </label>
                      <span className={`text-[10px] font-sans transition-colors ${form.message.trim().length >= 15 ? "text-emerald-400/90 font-medium" : "text-[#67685D]"}`}>
                        {form.message.trim().length}/1500 chars {form.message.trim().length >= 15 ? "✓" : "(min. 15)"}
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      onBlur={() => handleBlur("message")}
                      placeholder="Tell me about your project concept, dates, location, deliverables, or story… (minimum 15 characters)"
                      className={`${inputCls("message")} resize-none`}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="flex items-center gap-1.5 text-red-400 text-[11px] font-sans mt-1.5">
                        <svg className="w-3.5 h-3.5 flex-shrink-0 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {status === "error" && (
                    <div className="text-center space-y-2 p-3.5 rounded-xl bg-red-950/20 border border-red-500/20">
                      <p className="text-red-400 text-xs">Submission failed. You can reach out directly:</p>
                      <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
                        <a href="mailto:adilmubarack03@gmail.com" className="text-[#F1EDE3] underline hover:text-white">Email: adilmubarack03@gmail.com</a>
                        <span className="text-white/20">•</span>
                        <a href={`https://wa.me/971568709412?text=${encodeURIComponent(`Hi Adil, I'm ${form.name || "Client"}. I'd like to enquire about ${form.project_type}: ${form.message || ""}`)}`} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline font-semibold">WhatsApp (+971 56 870 9412)</a>
                      </div>
                    </div>
                  )}

                  <button type="submit" disabled={status === "sending"}
                    className="w-full bg-[#F1EDE3] text-black py-3.5 rounded-full font-display font-bold text-sm hover:bg-[#D8D1C2] transition-colors disabled:opacity-60 mt-4">
                    {status === "sending" ? "Sending Enquiry…" : "Send Request →"}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
