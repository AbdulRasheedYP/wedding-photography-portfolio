import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ContactFormState } from "../../types";

const SHOOT_TYPES = [
  { value: "wedding",       label: "Wedding Cinema"     },
  { value: "corporate",     label: "Commercial / Brand" },
  { value: "music_video",   label: "Music Video"        },
  { value: "advertisement", label: "Social Campaign"    },
  { value: "event",         label: "Live Event"         },
  { value: "other",         label: "Custom Shoot"       },
];

const INITIAL_FORM: ContactFormState = {
  name: "", email: "", phone: "",
  project_type: "wedding",
  budget_range: "₹50,000 – ₹1,00,000",
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
    setTimeout(() => { setStatus("success"); setForm(INITIAL_FORM); }, 1000);
  };

  const inputCls = (field: keyof ContactFormState) =>
    `w-full bg-[#111412] border ${errors[field] ? "border-red-500/50" : "border-[#F1EDE3]/8 focus:border-[#F1EDE3]/30"} px-4 py-3.5 rounded-xl text-[#F1EDE3] placeholder-[#67685D] focus:outline-none transition-colors text-base sm:text-sm`;

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-5 sm:px-8 bg-[#080B09] text-[#F1EDE3] relative overflow-hidden scroll-mt-20">

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "120px" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-7"
          >
            <div>
              <p className="text-[11px] font-display font-bold uppercase tracking-widest text-[#8D8B82] mb-3">Book A Shoot</p>
              <h2 className="font-serif text-5xl sm:text-6xl tracking-tight leading-[0.95] mb-4 font-normal">
                Let's Create<br />
                <span className="text-[#D8D1C2] italic">Your Story</span>
              </h2>
              <p className="text-[#8D8B82] text-[15px] leading-relaxed max-w-sm">
                Fill in the details below. I will personally review your brief and get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-[#F1EDE3]/8">
              {[
                { label: "Direct Email",    val: "contact@adilmubarak.com", href: "mailto:contact@adilmubarak.com" },
                { label: "WhatsApp & Call", val: "+91 98765 43210",         href: "https://wa.me/919876543210"      },
                { label: "Location",        val: "Calicut, Kerala — India Wide"                                     },
              ].map((c) => (
                <div key={c.label}>
                  <p className="text-[10px] font-display font-bold uppercase tracking-widest text-[#67685D] mb-1">{c.label}</p>
                  {c.href
                    ? <a href={c.href} target="_blank" rel="noopener noreferrer" className="font-display font-semibold text-[15px] text-[#D8D1C2] hover:text-[#F1EDE3] transition-colors">{c.val}</a>
                    : <p className="font-display font-semibold text-[15px] text-[#D8D1C2]">{c.val}</p>
                  }
                </div>
              ))}
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
                  <div className="w-14 h-14 rounded-full bg-[#F1EDE3] text-[#080B09] text-2xl flex items-center justify-center mx-auto font-bold">✓</div>
                  <h3 className="font-display font-extrabold text-xl text-[#F1EDE3]">Request Received!</h3>
                  <p className="text-[#8D8B82] text-xs max-w-xs mx-auto">I'll review your brief and get back to you within 24 hours.</p>
                  <button onClick={() => setStatus("idle")} className="bg-[#F1EDE3] text-[#080B09] px-6 py-2 rounded-full font-bold text-xs mt-4 hover:bg-[#D8D1C2] transition-colors">
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
                      <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 …" className={inputCls("phone")} />
                    </div>
                    <div>
                      <label htmlFor="project_type" className="block text-[11px] font-display font-bold uppercase tracking-widest text-[#A8A499] mb-2">Shoot Category</label>
                      <select id="project_type" name="project_type" value={form.project_type} onChange={handleChange} className={`${inputCls("project_type")} appearance-none`}>
                        {SHOOT_TYPES.map((t) => <option key={t.value} value={t.value} className="bg-[#111412]">{t.label}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[11px] font-display font-bold uppercase tracking-widest text-[#A8A499] mb-2">Shoot Brief *</label>
                    <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Dates, location, and what you have in mind…" className={`${inputCls("message")} resize-none`} />
                    {errors.message && <p className="text-red-400 text-[10px] mt-1">{errors.message}</p>}
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-xs text-center">Submission failed. Please email <a href="mailto:contact@adilmubarak.com" className="underline">contact@adilmubarak.com</a>.</p>
                  )}

                  <button type="submit" disabled={status === "sending"}
                    className="w-full bg-[#F1EDE3] text-[#080B09] py-3.5 rounded-full font-display font-bold text-sm hover:bg-[#D8D1C2] transition-colors disabled:opacity-60 mt-4">
                    {status === "sending" ? "Sending…" : "Send Request →"}
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
