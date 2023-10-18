import Script from "next/script";

const GAScript = () => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />

      <Script strategy="lazyOnload" id="ga-script">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}',
            {page_path: window.location.pathname,});
        `}
      </Script>
    </>
  );
};

export default GAScript;

interface IEvent {
  action: string;
  category: string;
  label: string;
  value: number;
}

// Augment the Window interface with gtag
declare global {
  interface Window {
    gtag: (
      type: "event",
      action: string,
      options: {
        event_category: string;
        event_label: string;
        value: number;
      },
    ) => void;
  }
}

export const logEvent = ({ action, category, label, value }: IEvent) => {
  window.gtag?.("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
