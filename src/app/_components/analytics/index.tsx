import GAScript from "./GoogleAnalytics";

const isProduction = process.env.NODE_ENV === "production";

const GAnalytics = () => {
  return (
    <>
      {isProduction && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
        <GAScript />
      )}
    </>
  );
};

export default GAnalytics;
