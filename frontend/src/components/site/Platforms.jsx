import { Reveal, SectionHeader } from "./Reveal";
import { GeometricBackground } from "./GeometricBackground";
import { FintechTabs } from "./FintechTabs";

const platforms = [
  {
    num: "01",
    title: "Real Estate & Urban Development",
    tagline: "From strategic planning to complete city development.",
    text: "We participate in the development of integrated communities, districts, destinations and cities designed around economic, social, residential, commercial and recreational needs — from master planning and infrastructure through construction to long-term asset management.",
    points: ["Master Planning & City Development", "Residential, Commercial & Mixed-Use", "Hospitality & Tourism Developments", "Infrastructure & Project Execution", "Property & Asset Management", "Investment & Project Structuring"],
    quote: "Developing Places. Creating Destinations. Building Cities.",
    image: "https://images.pexels.com/photos/5435079/pexels-photo-5435079.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    accent: "#C9A227",
  },
  {
    num: "02",
    title: "Fintech & Digital Financial Infrastructure",
    tagline: "One Technology Ecosystem. Every Financial Journey.",
    text: "Financial technology infrastructure designed to connect individuals, businesses, merchants, developers and financial institutions through one integrated digital ecosystem.",
    quote: "One Infrastructure. Multiple Financial Experiences.",
    image: "https://images.pexels.com/photos/32299941/pexels-photo-32299941.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    accent: "#00B8D9",
    fintech: true,
    disclaimer: "All financial products and services are subject to applicable laws, regulations, licensing and regulatory requirements in the jurisdictions in which they are offered.",
  },
  {
    num: "03",
    title: "Sports Infrastructure, Events & Development",
    tagline: "Building the Future of Sport.",
    text: "Sport is an engine for infrastructure development, economic activity, youth development, education, tourism and international cooperation. Our platform covers sports-related infrastructure, events, commercial activities and educational initiatives.",
    points: ["Sports Infrastructure & Academies", "Event Organization & Promotion", "Sports Goods & Equipment Supply", "Sports Education Programs", "Strategic Sponsorship"],
    quote: "Sport as Infrastructure for Human Development.",
    image: "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=1200",
    accent: "#C9A227",
  },
  {
    num: "04",
    title: "Global Commodities Trading",
    tagline: "Connecting Producers, Suppliers and Global Markets.",
    text: "We connect qualified suppliers and buyers across strategic global markets, built around market intelligence, reliable sourcing, structured transactions and long-term commercial relationships.",
    points: ["Precious Metals — Gold", "Copper Cathodes & Aluminium Oxide", "Sugar & Agricultural Products", "Petroleum Products", "Fertilizers & Granular Sulphur", "Sports Goods & Related Products"],
    quote: "Trade Without Borders. Relationships Without Limits.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
    accent: "#C9A227",
  },
  {
    num: "05",
    title: "Sustainable & Green Brands",
    tagline: "Bringing Sustainable Innovation to Global Markets.",
    text: "We identify, develop, introduce and market green and sustainable brands with the potential to address evolving consumer, industrial and environmental needs — helping innovative products reach international consumers and commercial channels.",
    points: ["Brand Development & Positioning", "International Market Introduction", "Distribution Development", "Commercial Partnerships", "Sustainable Product Commercialization"],
    quote: "From Green Innovation to Global Markets.",
    image: "https://images.unsplash.com/photo-1521292270410-a8c4d716d518?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    accent: "#00B8D9",
  },
];

const Chapter = ({ p, index }) => (
  <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-16 py-20 md:py-28 border-t border-white/10" data-testid={`platform-chapter-${p.num}`}>
    <div className="lg:col-span-4">
      <div className="lg:sticky lg:top-32">
        <Reveal>
          <div className="chapter-num text-8xl md:text-9xl mb-6">{p.num}</div>
          <div className="gold-rule w-24 mb-6" />
          <h3 className="font-serif-display font-medium text-2xl md:text-3xl text-white leading-tight mb-4">{p.title}</h3>
          <p className="font-grotesk text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: p.accent }}>{p.tagline}</p>
        </Reveal>
      </div>
    </div>

    <div className="lg:col-span-8 space-y-10">
      <Reveal delay={0.1}>
        <div className="img-clip rounded-sm border border-white/10 relative">
          <img src={p.image} alt={p.title} className="w-full h-[300px] md:h-[380px] object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/70 to-transparent pointer-events-none" />
          <div className="absolute bottom-5 left-6 font-serif-display italic text-lg md:text-xl text-white/95">{p.quote}</div>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="text-white/60 leading-relaxed text-sm md:text-base max-w-2xl">{p.text}</p>
      </Reveal>

      {p.fintech ? (
        <Reveal delay={0.2}>
          <FintechTabs />
          <p className="text-white/30 text-xs mt-8 leading-relaxed max-w-2xl">{p.disclaimer}</p>
        </Reveal>
      ) : (
        <Reveal delay={0.2} className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
          {p.points.map((pt) => (
            <div key={pt} className="flex items-start gap-3 text-white/60 text-sm">
              <span className="w-1.5 h-1.5 rotate-45 mt-1.5 shrink-0" style={{ background: p.accent }} />
              {pt}
            </div>
          ))}
        </Reveal>
      )}
    </div>
  </div>
);

export const Platforms = () => (
  <section id="what-we-do" className="relative bg-[#04101f] py-28 md:py-36 overflow-hidden" data-testid="platforms-section">
    <GeometricBackground className="opacity-60" />
    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
      <SectionHeader overline="What We Do" title="Five principal business platforms. One unified purpose." />
      {platforms.map((p, i) => (
        <Chapter key={p.num} p={p} index={i} />
      ))}
    </div>
  </section>
);
