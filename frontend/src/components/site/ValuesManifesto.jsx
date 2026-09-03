import { Reveal, SectionHeader } from "./Reveal";
import { GeometricBackground } from "./GeometricBackground";
import { Shield, Trophy, Lightbulb, Handshake, Leaf, Globe } from "@phosphor-icons/react";
import { useLang } from "@/i18n/LanguageContext";

const icons = [Shield, Trophy, Lightbulb, Handshake, Leaf, Globe];

export const ValuesManifesto = () => {
  const { t } = useLang();
  const values = icons.map((icon, i) => ({ icon, ...t.values.cards[i] }));
  return (
    <section id="values" className="relative bg-[#071A33] py-28 md:py-40 overflow-hidden" data-testid="values-section">
      <GeometricBackground variant="grid" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader overline={t.values.overline} title={t.values.title} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08} className="border border-white/10 bg-white/[0.03] p-8 rounded-sm card-lift card-lift-dark" data-testid={`value-card-${i}`}>
              <v.icon size={34} weight="light" className="text-[#C9A227] mb-6" />
              <h3 className="font-grotesk font-bold text-white text-lg mb-3">{v.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{v.text}</p>
            </Reveal>
          ))}
        </div>

        <div className="max-w-4xl" data-testid="manifesto-block">
          <Reveal>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-px bg-[#00B8D9]" />
              <span className="overline-label text-[#00B8D9]">{t.values.msgOverline}</span>
            </div>
            <h3 className="font-serif-display font-medium text-3xl md:text-5xl text-white leading-[1.1] mb-12">
              {t.values.msgTitle} <span className="italic text-[#C9A227]">{t.values.msgAccent}</span>
            </h3>
          </Reveal>
          <div className="space-y-4 mb-12">
            {t.values.manifesto.map((line, i) => (
              <Reveal key={line} delay={i * 0.1}>
                <p className="font-serif-display italic text-lg md:text-2xl text-white/60 border-l border-[#C9A227]/40 pl-6">{line}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="font-grotesk font-bold text-white text-xl md:text-2xl tracking-tight">
              {t.values.closing} <span className="text-[#C9A227]">{t.values.closingAccent}</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
