import { Reveal, SectionHeader } from "./Reveal";
import { GeometricBackground } from "./GeometricBackground";

export const WhoWeAre = () => (
  <section id="who-we-are" className="relative bg-[#071A33] py-28 md:py-40 overflow-hidden" data-testid="who-we-are-section">
    <GeometricBackground variant="grid" />
    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
      <SectionHeader overline="Who We Are" title="A Swiss-based international group with a global perspective" />

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <Reveal>
          <div className="img-clip rounded-sm border border-[#C9A227]/25">
            <img
              src="https://images.pexels.com/photos/38967250/pexels-photo-38967250.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Swiss headquarters, Lucerne"
              className="w-full h-[420px] object-cover"
            />
          </div>
          <div className="flex items-center gap-3 mt-5">
            <span className="w-2 h-2 rotate-45 bg-[#C9A227]" />
            <span className="font-grotesk text-[0.68rem] uppercase tracking-[0.2em] text-white/40">Switzerland · Incorporated & Headquartered</span>
          </div>
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={0.1}>
            <p className="text-white/70 leading-relaxed text-base md:text-lg">
              MBtex Group is a Switzerland-incorporated international group established to develop, manage
              and connect businesses across strategic sectors with strong long-term growth potential. Our
              model combines strategic investment, project development, technology, international trade,
              business partnerships and market expansion.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <blockquote className="border-l-2 border-[#C9A227] pl-6 font-serif-display italic text-xl md:text-2xl text-white/90 leading-snug">
              "The next generation of global business will be driven not by isolated companies, but by
              interconnected ecosystems capable of creating value across multiple markets."
            </blockquote>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-white/60 leading-relaxed text-sm md:text-base">
              Our international outlook enables us to identify opportunities across geographical markets,
              establish strategic partnerships and develop solutions adapted to the evolving needs of
              governments, corporations, financial institutions, investors and consumers.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6 pt-4">
            <Reveal delay={0.35} className="border border-white/10 bg-white/[0.03] p-7 rounded-sm card-lift card-lift-dark" data-testid="vision-card">
              <div className="overline-label text-[#00B8D9] mb-4">Vision</div>
              <p className="font-serif-display text-lg text-white leading-snug">
                To build a globally connected ecosystem for sustainable economic growth.
              </p>
            </Reveal>
            <Reveal delay={0.45} className="border border-white/10 bg-white/[0.03] p-7 rounded-sm card-lift card-lift-dark" data-testid="mission-card">
              <div className="overline-label text-[#C9A227] mb-4">Mission</div>
              <p className="font-serif-display text-lg text-white leading-snug">
                Turning strategic opportunities into sustainable, scalable businesses.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  </section>
);
