import React from 'react'
import Head from 'next/head'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Hava Durumu Uygulaması</title>
        <meta name="description" content="Hava durumu uygulaması" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-background text-foreground">
        {children}
      </main>
    </>
  )
}

export default Layout
