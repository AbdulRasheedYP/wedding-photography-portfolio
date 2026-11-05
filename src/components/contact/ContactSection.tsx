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
type Status = "idle" | "sending" | "success" | "error";

interface Props { prefill?: Partial<ContactFormState> | null; }

const ContactSection: React.FC<Props> = ({ prefill }) => {
  const sectionRef              = useRef<HTMLElement>(null);
  const [form, setForm]         = useState<ContactFormState>({ ...INITIAL_FORM, ...prefill });
  const [status, setStatus]     = useState<Status>("idle");
  const [errors, setErrors]     = useState<FormErrors>({});

  useEffect(() => { if (prefill) setForm((f) => ({ ...f, ...prefill })); }, [prefill]);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim())  e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Required";
    return e;
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((f) => ({ ...f, [name]: undefined }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("sending");

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";
      if (!accessKey) {
        // Fallback if access key is not yet set: open pre-filled mailto
        const subject = encodeURIComponent(`Project Enquiry from ${form.name} (${form.project_type})`);
        const body = encodeURIComponent(
          `Hi Adil,\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "N/A"}\nProject Type: ${form.project_type}\n\nProject Details:\n${form.message}\n`
        );
        window.open(`mailto:adilmubarack03@gmail.com?subject=${subject}&body=${body}`, "_blank");
        setStatus("success");
        setForm(INITIAL_FORM);
        return;
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: "Adil Mubarak Portfolio",
          subject: `New Project Enquiry: ${form.name} [${form.project_type}]`,
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          project_type: form.project_type,
          message: form.message,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setForm(INITIAL_FORM);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Web3Forms submission error:", err);
      setStatus("error");
    }
  };

  const inputCls = (field: keyof ContactFormState) =>
    `w-full bg-[#141414] border ${errors[field] ? "border-red-500/50" : "border-white/10 focus:border-white/30"} px-4 py-3.5 rounded-xl text-[#F1EDE3] placeholder-[#67685D] focus:outline-none focus:bg-[#181818] transition-colors text-base sm:text-sm`;

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-5 sm:px-8 bg-black text-[#F1EDE3] relative overflow-hidden scroll-mt-20">

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "120px" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-7"
          >
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
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "120px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { name: "name" as const,  label: "Full Name *", type: "text",  placeholder: "e.g. Rahul Sharma" },
                      { name: "email" as const, label: "Email *",      type: "email", placeholder: "you@example.com" },
                    ].map((f) => (
                      <div key={f.name}>
                        <label htmlFor={f.name} className="block text-[11px] font-display font-bold uppercase tracking-widest text-[#A8A499] mb-2">{f.label}</label>
                        <input id={f.name} name={f.name} type={f.type} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} className={inputCls(f.name)} />
                        {errors[f.name] && <p className="text-red-400 text-[10px] mt-1">{errors[f.name]}</p>}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-[11px] font-display font-bold uppercase tracking-widest text-[#A8A499] mb-2">Phone / WhatsApp</label>
                      <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+971 … / +91 …" className={inputCls("phone")} />
                    </div>
                    <div>
                      <label htmlFor="project_type" className="block text-[11px] font-display font-bold uppercase tracking-widest text-[#A8A499] mb-2">Project / Shoot Type</label>
                      <select id="project_type" name="project_type" value={form.project_type} onChange={handleChange} className={`${inputCls("project_type")} appearance-none`}>
                        {SHOOT_TYPES.map((t) => <option key={t.value} value={t.value} className="bg-[#141414]">{t.label}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[11px] font-display font-bold uppercase tracking-widest text-[#A8A499] mb-2">Project Concept &amp; Details *</label>
                    <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Tell me about your project concept, dates, location, deliverables, or story…" className={`${inputCls("message")} resize-none`} />
                    {errors.message && <p className="text-red-400 text-[10px] mt-1">{errors.message}</p>}
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
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
