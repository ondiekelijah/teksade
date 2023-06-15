import "@/css/main.css"
export const metadata = {
  title: 'Teksade',
  description: 'Teksade Community Project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"  >
      <body>{children}</body>
    </html>
  )
}
