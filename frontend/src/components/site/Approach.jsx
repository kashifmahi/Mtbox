import { Reveal, SectionHeader } from "./Reveal";

const steps = [
  { num: "01", title: "Identify", text: "We identify emerging opportunities, underserved markets and high-potential sectors." },
  { num: "02", title: "Structure", text: "We transform opportunities into clearly defined business models, projects and partnerships." },
  { num: "03", title: "Connect", text: "We bring together the appropriate investors, developers, technology providers, suppliers and institutions." },
  { num: "04", title: "Execute", text: "We focus on disciplined implementation, professional management and measurable outcomes." },
  { num: "05", title: "Scale", text: "We seek to expand successful businesses and platforms across international markets." },
];

export const Approach = () => (
  <section id="approach" className="bg-[#F3F6F9] py-28 md:py-40" data-testid="approach-section">
    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
      <SectionHeader overline="Our Approach" title="Think Globally. Build Strategically. Execute Responsibly." dark={false} />
      <Reveal className="max-w-2xl -mt-8 mb-16 font-serif-display italic text-lg md:text-xl text-[#071A33]/70">
        Every opportunity begins with a question: can we create sustainable value by bringing together
        the right people, technology, capital, infrastructure and markets?
      </Reveal>

      <div className="grid md:grid-cols-5 gap-6">
        {steps.map((s, i) => (
          <Reveal key={s.num} delay={i * 0.1} className="relative group" data-testid={`approach-step-${s.num}`}>
            <div className="border-t-2 border-[#071A33]/10 pt-8 group-hover:border-[#C9A227] transition-colors duration-500">
              <div className="font-serif-display text-4xl text-[#C9A227] mb-4">{s.num}</div>
              <h3 className="font-grotesk font-bold text-[#071A33] text-lg mb-3">{s.title}</h3>
              <p className="text-[#071A33]/55 text-sm leading-relaxed">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
