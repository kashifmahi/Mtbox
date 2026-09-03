import { Reveal, SectionHeader } from "./Reveal";
import { Compass, Globe, Cpu, Buildings, Handshake, TrendUp } from "@phosphor-icons/react";
import { useLang } from "@/i18n/LanguageContext";

const icons = [Compass, Globe, Cpu, Buildings, Handshake, TrendUp];

export const WhyMbtex = () => {
  const { t } = useLang();
  const cards = icons.map((icon, i) => ({ icon, ...t.why.cards[i] }));
  return (
    <section id="why-mbtex" className="bg-[#F3F6F9] py-28 md:py-40" data-testid="why-mbtex-section">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader overline={t.why.overline} title={t.why.title} dark={false} />
        <Reveal className="max-w-2xl -mt-8 mb-16 text-[#071A33]/60 leading-relaxed text-sm md:text-base">
          {t.why.intro}
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 0.08}
              className="group bg-white border border-[#071A33]/8 p-8 md:p-10 rounded-sm card-lift"
              data-testid={`why-card-${i}`}
            >
              <c.icon size={40} weight="duotone" className="text-[#1557B0] mb-8" />
              <div className="font-grotesk text-[0.65rem] uppercase tracking-[0.24em] text-[#C9A227] mb-3">0{i + 1}</div>
              <h3 className="font-grotesk font-bold text-lg text-[#071A33] mb-4 leading-snug">{c.title}</h3>
              <p className="text-[#071A33]/55 text-sm leading-relaxed">{c.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
