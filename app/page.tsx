'use client'
import useBlobity from 'blobity/lib/react/useBlobity'
import { Suspense, useEffect, useState } from 'react'
import PreLoader from './animations/PreLoader/PreLoader'
import Hero from './hero-section/Hero'
import NavBar from './navbar/NavBar'
import { initialBlobityOptions } from './utils/BlobityConfig'
import ContactFormModal from './contact-section/ContactFormModal'
import ServiceDeepLink from './contact-section/ServiceDeepLink'

import dynamic from 'next/dynamic'
import Reviews from './reviews-section/ReviewGrid'
import ServicesSection from './services-section/ServicesSection'
const Work = dynamic(() => import('./work-section/Work'))
const About = dynamic(() => import('./about-section/About'))
const Contact = dynamic(() => import('./contact-section/Contact'))
const Footer = dynamic(() => import('./footer/Footer'))

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialService, setInitialService] = useState<string | undefined>()
  const blobityInstance = useBlobity(initialBlobityOptions)

  useEffect(() => {
    if (blobityInstance.current) {
      // @ts-ignore for debugging purposes or playing around
      window.blobity = blobityInstance.current
    }
  }, [blobityInstance])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    })
  }, [])

  return (
    <>
      <PreLoader />
      <Suspense fallback={null}>
        <ServiceDeepLink
          onService={(service) => {
            setInitialService(service)
            setIsModalOpen(true)
          }}
        />
      </Suspense>
      <NavBar />

      <main className="flex flex-col items-center justify-center">
        <Hero onContactClick={() => setIsModalOpen(true)} />
        <Work />
        <ServicesSection />
        <Reviews />
        <About />
        <Contact onContactClick={() => setIsModalOpen(true)} />
        <Footer />
      </main>

      <ContactFormModal
        isOpen={isModalOpen}
        initialService={initialService}
        onClose={() => {
          setIsModalOpen(false)
          setInitialService(undefined)
        }}
      />
    </>
  )
}
