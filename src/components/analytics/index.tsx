import GAScript from "@/components/analytics/GoogleAnalytics"

const isProduction = process.env.NODE_ENV === 'production'

const Analytics = () => {
  return (
    <>
      {isProduction && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && ( <GAScript /> )}
    </>
  )
}

export default Analytics
