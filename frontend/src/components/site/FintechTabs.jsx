import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "@phosphor-icons/react";
import { useLang } from "@/i18n/LanguageContext";

export const FintechTabs = () => {
  const { t } = useLang();
  const tabs = t.fintech;
  return (
    <Tabs defaultValue="personal" className="w-full" data-testid="fintech-tabs">
      <TabsList className="flex flex-wrap gap-2 bg-transparent h-auto p-0 justify-start mb-8">
        {Object.entries(tabs).map(([key, tab]) => (
          <TabsTrigger key={key} value={key} className="fintech-tab-trigger" data-testid={`fintech-tab-${key}`}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.entries(tabs).map(([key, tab]) => (
        <TabsContent key={key} value={key} className="mt-0" data-testid={`fintech-panel-${key}`}>
          <p className="font-serif-display italic text-lg text-white/80 mb-6">{tab.tagline}</p>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {tab.items.map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/60 text-sm">
                <CheckCircle size={18} weight="duotone" className="text-[#00B8D9] shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
