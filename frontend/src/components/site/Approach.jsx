import { Reveal, SectionHeader } from "./Reveal";
import { useLang } from "@/i18n/LanguageContext";

export const Approach = () => {
  const { t } = useLang();
  return (
    <section id="approach" className="bg-[#F3F6F9] py-28 md:py-40" data-testid="approach-section">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader overline={t.approach.overline} title={t.approach.title} dark={false} />
        <Reveal className="max-w-2xl -mt-8 mb-16 font-serif-display italic text-lg md:text-xl text-[#071A33]/70">
          {t.approach.intro}
        </Reveal>

        <div className="grid md:grid-cols-5 gap-6">
          {t.approach.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} className="relative group" data-testid={`approach-step-0${i + 1}`}>
              <div className="border-t-2 border-[#071A33]/10 pt-8 group-hover:border-[#C9A227] transition-colors duration-500">
                <div className="font-serif-display text-4xl text-[#C9A227] mb-4">0{i + 1}</div>
                <h3 className="font-grotesk font-bold text-[#071A33] text-lg mb-3">{s.title}</h3>
                <p className="text-[#071A33]/55 text-sm leading-relaxed">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
