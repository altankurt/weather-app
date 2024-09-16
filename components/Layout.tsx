import React from 'react'
import Head from 'next/head'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>
          Hava Durumu Uygulaması | Türkiye Şehirleri İçin Güncel Hava Durumu
        </title>
        <meta
          name="description"
          content="Türkiye'nin tüm şehirleri için güncel hava durumu tahminleri. Saatlik ve 5 günlük hava durumu raporları."
        />
        <meta
          name="keywords"
          content="hava durumu, Türkiye hava durumu, şehir hava durumu, hava tahmini"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Hava Durumu Uygulaması | Türkiye Şehirleri"
        />
        <meta
          property="og:description"
          content="Türkiye'nin tüm şehirleri için güncel hava durumu tahminleri."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-background text-foreground">
        {children}
      </main>
    </>
  )
}

export default Layout
