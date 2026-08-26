import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "@phosphor-icons/react";

const tabs = {
  personal: { label: "Personal", tagline: "Digital financial tools designed around the needs of individuals.", items: ["Personal Wallet", "Transfers", "Cards", "Foreign Exchange (FX)", "Remittances", "Digital Assets"] },
  business: { label: "Business", tagline: "Financial infrastructure supporting modern businesses locally and internationally.", items: ["Business Accounts", "Business Wallet", "Domestic & International Transfers", "Corporate Cards", "Foreign Exchange", "Treasury Functions"] },
  merchants: { label: "Merchants", tagline: "Integrated payment and collection infrastructure for merchants and businesses.", items: ["Payment Gateway", "SoftPOS", "QR Payments", "Request to Pay", "Settlement", "Reporting"] },
  developers: { label: "Developers", tagline: "Technology enabling developers to integrate financial functionality into their platforms.", items: ["APIs", "Sandbox Environment", "SDKs", "Webhooks", "Developer Portal"] },
  institutions: { label: "Institutions", tagline: "Infrastructure enabling institutions to deploy customized financial solutions.", items: ["White-Label Wallet", "Payment Gateway", "SoftPOS", "Merchant Portal", "Administrative Infrastructure"] },
};

export const FintechTabs = () => (
  <Tabs defaultValue="personal" className="w-full" data-testid="fintech-tabs">
    <TabsList className="flex flex-wrap gap-2 bg-transparent h-auto p-0 justify-start mb-8">
      {Object.entries(tabs).map(([key, t]) => (
        <TabsTrigger key={key} value={key} className="fintech-tab-trigger" data-testid={`fintech-tab-${key}`}>
          {t.label}
        </TabsTrigger>
      ))}
    </TabsList>
    {Object.entries(tabs).map(([key, t]) => (
      <TabsContent key={key} value={key} className="mt-0" data-testid={`fintech-panel-${key}`}>
        <p className="font-serif-display italic text-lg text-white/80 mb-6">{t.tagline}</p>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
          {t.items.map((item) => (
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
