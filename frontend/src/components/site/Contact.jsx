import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Reveal, SectionHeader } from "./Reveal";
import { GeometricBackground } from "./GeometricBackground";
import { EnvelopeSimple, MapPin, PaperPlaneTilt } from "@phosphor-icons/react";
import { useLang } from "@/i18n/LanguageContext";

const API = `${import.meta.env.REACT_APP_BACKEND_URL || ""}/api`;

export const Contact = () => {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", company: "", interest: "", message: "" });
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error(t.contact.form.validationToast);
      return;
    }
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success(t.contact.form.successToast);
      setForm({ name: "", email: "", company: "", interest: "", message: "" });
    } catch {
      toast.error(t.contact.form.errorToast);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative bg-[#04101f] py-28 md:py-40 overflow-hidden" data-testid="contact-section">
      <GeometricBackground className="opacity-50" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <SectionHeader overline={t.contact.overline} title={t.contact.title} />
            <Reveal className="-mt-8 space-y-8">
              <p className="text-white/60 leading-relaxed text-sm md:text-base max-w-md">{t.contact.body}</p>
              <div className="space-y-5 pt-4">
                <div className="flex items-center gap-4" data-testid="contact-email-info">
                  <EnvelopeSimple size={22} weight="light" className="text-[#C9A227]" />
                  <span className="text-white/80 text-sm">info@mbtexgroup.com</span>
                </div>
                <div className="flex items-center gap-4" data-testid="contact-location-info">
                  <MapPin size={22} weight="light" className="text-[#C9A227]" />
                  <span className="text-white/80 text-sm">{t.contact.location}</span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <form onSubmit={submit} className="border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 md:p-10 rounded-sm space-y-5" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-5">
                <input className="glass-input rounded-sm px-4 py-3.5 text-sm w-full" placeholder={t.contact.form.name} value={form.name} onChange={set("name")} data-testid="contact-input-name" />
                <input className="glass-input rounded-sm px-4 py-3.5 text-sm w-full" type="email" placeholder={t.contact.form.email} value={form.email} onChange={set("email")} data-testid="contact-input-email" />
              </div>
              <input className="glass-input rounded-sm px-4 py-3.5 text-sm w-full" placeholder={t.contact.form.company} value={form.company} onChange={set("company")} data-testid="contact-input-company" />
              <select className="glass-input rounded-sm px-4 py-3.5 text-sm w-full appearance-none" value={form.interest} onChange={set("interest")} data-testid="contact-select-interest" style={{ colorScheme: "dark" }}>
                <option value="" className="bg-[#071A33]">{t.contact.form.interest}</option>
                {t.contact.form.interests.map((i) => (
                  <option key={i} value={i} className="bg-[#071A33]">{i}</option>
                ))}
              </select>
              <textarea className="glass-input rounded-sm px-4 py-3.5 text-sm w-full min-h-[130px] resize-none" placeholder={t.contact.form.message} value={form.message} onChange={set("message")} data-testid="contact-input-message" />
              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full font-grotesk text-[0.72rem] uppercase tracking-[0.22em] px-8 py-4 rounded-full flex items-center justify-center gap-3 disabled:opacity-60"
                data-testid="contact-submit-button"
              >
                <PaperPlaneTilt size={16} />
                {sending ? t.contact.form.sending : t.contact.form.submit}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
