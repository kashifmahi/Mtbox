import Marquee from "react-fast-marquee";
import { useLang } from "@/i18n/LanguageContext";

export const EditorialMarquee = () => {
  const { t } = useLang();
  return (
    <div className="bg-[#04101f] border-y border-[#C9A227]/15 py-8 overflow-hidden" data-testid="editorial-marquee">
      <div className="relative z-10">
        <Marquee speed={28} gradient={false} autoFill>
          {t.marquee.map((item) => (
            <div key={item} className="flex items-center">
              <span className="font-serif-display italic text-2xl md:text-3xl text-white/70 font-light px-12 md:px-16">{item}</span>
              <span className="w-2 h-2 rotate-45 bg-[#C9A227]/70 inline-block" />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};
