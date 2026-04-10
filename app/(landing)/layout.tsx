import HomePageNav from '@/components/HomePageNav'

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HomePageNav />
      {children}
    </>
  )
}
