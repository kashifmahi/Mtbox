import { Reveal, SectionHeader } from "./Reveal";
import { Compass, Globe, Cpu, Buildings, Handshake, TrendUp } from "@phosphor-icons/react";

const cards = [
  { icon: Compass, title: "Integrated Business Perspective", text: "Our diversified platform enables us to understand opportunities from multiple perspectives — development, finance, technology, trade, infrastructure and market access." },
  { icon: Globe, title: "International Connectivity", text: "We build relationships across markets and connect international companies, investors, institutions, suppliers and strategic partners." },
  { icon: Cpu, title: "Technology-Driven Approach", text: "Technology is embedded in our business model, particularly through our financial technology ecosystem and digital infrastructure initiatives." },
  { icon: Buildings, title: "Development & Execution", text: "We are focused not only on identifying opportunities, but on transforming them into structured, executable projects and businesses." },
  { icon: Handshake, title: "Strategic Partnerships", text: "We work with specialized companies, investors, institutions, governments, developers, technology providers and market leaders." },
  { icon: TrendUp, title: "Long-Term Value Creation", text: "We build businesses and platforms capable of generating sustainable value over the long term, rather than focusing on short-term transactions." },
];

export const WhyMbtex = () => (
  <section id="why-mbtex" className="bg-[#F3F6F9] py-28 md:py-40" data-testid="why-mbtex-section">
    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
      <SectionHeader overline="Why MBtex Group" title="One Group. Multiple Platforms. Global Reach." dark={false} />
      <Reveal className="max-w-2xl -mt-8 mb-16 text-[#071A33]/60 leading-relaxed text-sm md:text-base">
        In an increasingly interconnected global economy, opportunities rarely exist within a single
        sector. A real estate project may require financial technology. A city requires infrastructure,
        commerce and services. MBtex Group brings these capabilities together.
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
