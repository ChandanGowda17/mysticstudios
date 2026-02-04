import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'



export const App: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out',
      })
    }

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        opacity: 1,
        duration: 0.3,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.3,
      })
    }

    const handleLinkHover = () => {
      gsap.to(cursor, {
        scale: 2.5,
        backgroundColor: 'rgba(236, 72, 153, 0.3)',
        borderColor: 'rgba(236, 72, 153, 0.5)',
        duration: 0.3,
      })
    }

    const handleLinkLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.4)',
        duration: 0.3,
      })
    }

    window.addEventListener('mousemove', moveCursor)
    document.body.addEventListener('mouseenter', handleMouseEnter)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleLinkHover)
      el.addEventListener('mouseleave', handleLinkLeave)
    })

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkHover)
        el.removeEventListener('mouseleave', handleLinkLeave)
      })
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[1000] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/10 opacity-0 transition-opacity duration-300 backdrop-blur-[2px]"
      />

      <div className="min-h-screen text-slate-50">
        {/* Full-screen landing hero */}
        <section
          id="hero"
          className="relative flex min-h-screen w-full items-start justify-start overflow-hidden bg-black"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/bg1.webp')"
            }}
          />
          {/* Gradient overlay to match reference */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/40" />

          {/* Content */}
          <div className="relative z-10 flex h-full w-full max-w-none flex-col px-6 pb-6 pt-[50px] md:px-12 lg:px-24 md:pt-[50px] md:pb-10">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-4">
              {/* Logo / brand */}
              <div className="group flex cursor-pointer items-center gap-2 md:gap-4 transition-transform hover:scale-105 shrink-0">
                <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center overflow-hidden rounded-full">
                  <img
                    src="/images/logo.png"
                    alt="Mystic Art Studios Logo"
                    className="h-full w-full object-contain filter drop-shadow-lg"
                  />
                </div>
                <span className="text-lg md:text-xl font-bold tracking-tight text-white drop-shadow-md whitespace-nowrap">
                  Mystic Art Studios
                </span>
              </div>

              {/* Navigation Bar */}
              <nav className="hidden md:block lg:pr-20 overflow-hidden">
                <ul className="flex items-center gap-4 lg:gap-10">
                  {[
                    { name: 'About', href: '#about' },
                    { name: 'Our Story', href: '#story' },
                    { name: 'What We Do', href: '#what-we-do' },
                    { name: 'Movies', href: '#clientele-movies' },
                    { name: 'Contact', href: '#contact' },
                  ].map((link) => (
                    <li key={link.name} className="shrink-0">
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault()
                          lenisRef.current?.scrollTo(link.href)
                        }}
                        className="text-xs lg:text-lg font-bold uppercase tracking-widest text-white/70 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] whitespace-nowrap"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Main heading */}
            <div className="mb-32 flex flex-col items-end pt-[100px]">
              <div className="max-w-2xl text-left">
                <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                  Where Cinema
                  <br />
                  Meets the Future
                  <br />
                  of Distribution
                </h1>
                <p className="mt-6 text-base font-medium text-slate-100 pt-[100px] md:text-lg">
                  Channel Partner &amp; A Production House
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rest of the page content */}
        <div className="relative">


          <main className="relative z-10 flex flex-col">

            {/* Who We Are section */}
            <section
              id="about"
              className="relative flex min-h-screen flex-col justify-start bg-cover bg-center px-6 py-16 md:px-12 lg:px-24 md:py-20"
              style={{ backgroundImage: "url('/images/bg2.png')" }}
            >
              <div className="mx-auto flex w-full max-w-none flex-col gap-10 lg:flex-row lg:items-start">
                {/* Left text column */}
                <div className="w-full lg:w-[70%]">
                  <h2 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-9xl">
                    Who We Are
                  </h2>
                  <div className="mt-10 space-y-8 text-xl leading-relaxed text-slate-100 lg:text-2xl">
                    <p>
                      A pioneering force in India&apos;s film and entertainment ecosystem,
                      strategically connecting film producers with leading OTT platforms
                      and digital distribution channels. Established in 2016, we emerged
                      at a defining moment for the industry, when traditional theatrical
                      markets were weakening and digital streaming was reshaping how
                      stories reached audiences.
                    </p>
                    <p>
                      With deep market understanding, early adoption of OTT distribution,
                      and trusted platform partnerships, Mystic Art Studios has played a
                      vital role in enabling producers to navigate change, unlock new
                      audiences, and maximize the value of their content.
                    </p>
                    <p>
                      Today, as we expand into film production, our focus remains clear:
                      to create, curate, and deliver compelling cinema with both creative
                      integrity and commercial strength.
                    </p>
                  </div>

                </div>

                {/* Right card / image grid */}
                <div className="w-full md:w-1/3 lg:w-[30%]">
                  <div className="grid grid-cols-2 grid-rows-3 gap-4 md:gap-5">
                    {/* Top-left image */}
                    <div className="row-span-2 overflow-hidden rounded-[50px] border border-white/15 bg-black/40 shadow-xl">
                      <img
                        src="/images/img1.webp"
                        alt="Camera setup"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Top-right 100+ card */}
                    <div className="flex items-center justify-center rounded-[50px] bg-gradient-to-br from-pink-500 to-fuchsia-500 text-center shadow-xl">
                      <div className="px-4 py-6 md:px-6 md:py-8">
                        <p className="text-3xl font-extrabold text-white md:text-4xl">
                          100+
                        </p>
                        <p className="mt-2 text-xs font-medium uppercase tracking-wide text-white/90 md:text-sm">
                          Successful Projects
                        </p>
                      </div>
                    </div>

                    {/* Middle-right image */}
                    <div className="row-span-2 overflow-hidden rounded-[50px] border border-white/15 bg-black/40 shadow-xl">
                      <img
                        src="/images/img2.webp"
                        alt="Production still"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Bottom-left stats card */}
                    <div className="flex flex-col justify-between rounded-[50px] bg-gradient-to-br from-fuchsia-600 to-pink-500 px-5 py-5 text-white shadow-xl">
                      <div className="flex items-center justify-between text-sm font-semibold">
                        <span>95%</span>
                      </div>
                      <div className="mt-3 h-2 w-full rounded-full bg-white/20">
                        <div className="h-2 w-[95%] rounded-full bg-white" />
                      </div>
                      <p className="mt-4 text-sm font-medium">Satisfied Clients</p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Our Story section */}
            <section
              id="story"
              className="relative flex min-h-screen flex-col justify-start bg-cover bg-center px-6 py-16 md:px-12 lg:px-24 md:py-20"
              style={{ backgroundImage: "url('/images/bg2.png')" }}
            >
              <div className="mx-auto flex w-full max-w-none flex-col">
                <h2 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-9xl">
                  Our Story
                </h2>

                <div className="mt-10 space-y-10 text-2xl leading-tight text-slate-50 lg:text-4xl">
                  <p>
                    Mystic Art Studios was founded in 2016 under the leadership of Managing
                    Director Venkkatesh K Achharya, with a clear vision to redefine film
                    distribution in an evolving entertainment landscape.
                  </p>
                  <p>
                    At a time when the theatrical market faced uncertainty and producers
                    depended on a limited number of distributors, Mystic Art Studios
                    recognized the transformative potential of OTT platforms early on. We
                    positioned ourselves as a reliable bridge between content creators and
                    emerging digital platforms, particularly across South India.
                  </p>
                  <p>
                    Within just one year of focused execution, we successfully delivered 18
                    films to OTT platforms, setting a strong benchmark for scale, speed, and
                    trust. Our work soon expanded across regions, languages, and platforms,
                    establishing Mystic Art Studios as a dependable industry partner.
                  </p>
                  <p>
                    Today, our journey continues as we step into content production,
                    combining years of distribution expertise with a strong creative vision
                    to build cinema designed for both theatrical and digital audiences.
                  </p>
                </div>

              </div>
            </section>

            {/* What We Do section */}
            <section
              id="what-we-do"
              className="relative flex min-h-screen flex-col justify-start bg-cover bg-center px-6 py-16 md:px-12 lg:px-24 md:py-20"
              style={{ backgroundImage: "url('/images/bg2.png')" }}
            >
              <div className="mx-auto w-full max-w-none">
                {/* Header */}
                <div className="mb-12 flex items-center justify-between">
                  <h2 className="text-5xl font-extrabold uppercase tracking-tight text-white sm:text-7xl lg:text-9xl">
                    What We Do
                  </h2>

                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Card 1 */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black/40 shadow-xl ring-1 ring-white/10">
                      <img
                        src="/images/img3.webp"
                        alt="Strategic OTT"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="flex h-24 w-full items-center justify-center rounded-2xl border border-pink-500/30 bg-black/40 px-4 text-center backdrop-blur-sm">
                      <span className="text-2xl font-bold leading-tight text-white">
                        Strategic OTT &amp; Digital Distribution
                      </span>
                    </div>
                    <button className="rounded-full bg-white/5 px-6 py-2 text-xs font-semibold tracking-wide text-white/70 shadow-inner transition hover:bg-white/10">
                      LEARN MORE
                    </button>
                  </div>

                  {/* Card 2 */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black/40 shadow-xl ring-1 ring-white/10">
                      <img
                        src="/images/img4.webp"
                        alt="Channel Partnerships"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="flex h-24 w-full items-center justify-center rounded-2xl border border-pink-500/30 bg-black/40 px-4 text-center backdrop-blur-sm">
                      <span className="text-2xl font-bold leading-tight text-white">
                        Channel Partnerships
                      </span>
                    </div>
                    <button className="rounded-full bg-white/5 px-6 py-2 text-xs font-semibold tracking-wide text-white/70 shadow-inner transition hover:bg-white/10">
                      LEARN MORE
                    </button>
                  </div>

                  {/* Card 3 */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black/40 shadow-xl ring-1 ring-white/10">
                      <img
                        src="/images/img5.webp"
                        alt="Producer Liaison"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="flex h-24 w-full items-center justify-center rounded-2xl border border-pink-500/30 bg-black/40 px-4 text-center backdrop-blur-sm">
                      <span className="text-2xl font-bold leading-tight text-white">
                        Producer Liaison &amp; Market Advisory
                      </span>
                    </div>
                    <button className="rounded-full bg-white/5 px-6 py-2 text-xs font-semibold tracking-wide text-white/70 shadow-inner transition hover:bg-white/10">
                      LEARN MORE
                    </button>
                  </div>

                  {/* Card 4 */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black/40 shadow-xl ring-1 ring-white/10">
                      <img
                        src="/images/img6.webp"
                        alt="Film Production"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="flex h-24 w-full items-center justify-center rounded-2xl border border-pink-500/30 bg-black/40 px-4 text-center backdrop-blur-sm">
                      <span className="text-2xl font-bold leading-tight text-white">
                        Film Production
                      </span>
                    </div>
                    <button className="rounded-full bg-white/5 px-6 py-2 text-xs font-semibold tracking-wide text-white/70 shadow-inner transition hover:bg-white/10">
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed Services Section */}
            <section
              id="detailed-services"
              className="relative flex min-h-screen flex-col justify-start overflow-hidden bg-cover bg-center px-6 py-20 md:px-12 lg:px-24 md:py-24"
              style={{ backgroundImage: "url('/images/bg2.png')" }}
            >

              {/* Top Right Pink Glow */}
              <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-pink-600/20 blur-3xl filter animate-pulse" />
              {/* Bottom Left Pink Glow */}
              <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl filter animate-pulse delay-700" />





              <div className="mx-auto w-full max-w-none space-y-24">
                {/* Block 1: Strategic OTT */}
                <div className="relative flex flex-col items-start gap-4 md:max-w-3xl lg:max-w-4xl">
                  <h3 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-7xl">
                    Strategic OTT &amp;
                    <br />
                    Digital Distribution
                  </h3>
                  <p className="max-w-2xl text-xl leading-relaxed text-slate-200 lg:text-2xl">
                    We work closely with film producers to position, package,
                    and place content across leading OTT platforms and digital
                    applications. Our role goes beyond facilitation, we act as
                    strategic partners, ensuring the right content reaches the
                    right platform at the right time.
                  </p>
                  {/* Cyan Accent Dot */}
                  <div className="mt-2 h-6 w-6 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                </div>

                {/* Block 2: Channel Partnerships */}
                <div className="relative flex flex-col items-start gap-4 md:ml-auto md:max-w-3xl lg:max-w-4xl">
                  <h3 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-7xl">
                    Channel Partnerships
                  </h3>
                  <div className="text-xl leading-relaxed text-slate-200 lg:text-2xl">
                    <p className="mb-4">Mystic Art Studio has served as:</p>
                    <ul className="mb-6 list-outside list-disc space-y-3 pl-8 text-slate-300">
                      <li>
                        The only channel partner for Amazon Prime Video and
                        SonyLIV across South India during critical growth phases
                      </li>
                      <li>
                        A trusted channel partner for multiple OTT platforms and
                        digital apps
                      </li>
                    </ul>
                    <p>
                      These relationships are built on credibility, delivery excellence,
                      and a deep understanding of platform expectations.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Production Services Section */}
            <section
              id="production-services"
              className="relative flex min-h-screen flex-col justify-start overflow-hidden bg-cover bg-center px-6 py-20 md:px-12 lg:px-24 md:py-24"
              style={{ backgroundImage: "url('/images/bg2.png')" }}
            >
              {/* Background Decorations */}
              {/* Top Right Pink Glow */}
              <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-pink-600/20 blur-3xl filter animate-pulse" />
              {/* Bottom Left Pink Glow */}
              <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl filter animate-pulse delay-1000" />



              {/* Bottom Left Dot Matrix Pattern */}
              <div className="absolute bottom-10 left-6 grid grid-cols-6 gap-2 md:left-12">
                {[...Array(24)].map((_, i) => (
                  <span key={i} className="h-1 w-1 rounded-full bg-white/30" />
                ))}
              </div>

              <div className="mx-auto w-full max-w-none space-y-24">
                {/* Block 1: Producer Liaison */}
                <div className="relative flex flex-col items-start gap-4 md:max-w-3xl lg:max-w-4xl">
                  <h3 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-7xl">
                    Producer Liaison &amp;
                    <br />
                    Market Advisory
                  </h3>
                  <p className="max-w-2xl text-xl leading-relaxed text-slate-200 lg:text-2xl">
                    From deal structuring to platform alignment, we support
                    producers through every stage of the OTT journey offering
                    market insights, negotiation support, and execution oversight.
                  </p>
                </div>

                {/* Block 2: Film Production */}
                <div className="relative flex flex-col items-start gap-4 md:ml-auto md:max-w-3xl lg:max-w-4xl md:items-end md:text-right">
                  <h3 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-7xl">
                    Film Production
                  </h3>
                  <p className="text-xl leading-relaxed text-slate-200 lg:text-2xl">
                    Leveraging years of hands-on experience in content distribution
                    and audience behavior, Mystic Art Studios is now expanding into
                    film production. Our production philosophy blends creative
                    storytelling with market-aware execution, ensuring content is
                    both artistically strong and commercially viable.
                  </p>
                </div>
              </div>
            </section>

            {/* Clientele & Movies Section */}
            <section
              id="clientele-movies"
              className="relative flex min-h-screen flex-col justify-start overflow-hidden bg-cover bg-center px-6 py-20 md:px-12 lg:px-24 md:py-24"
              style={{ backgroundImage: "url('/images/bg2.png')" }}
            >
              {/* Background Decorations */}
              {/* Top Right Pink Glow */}
              <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-pink-600/20 blur-3xl filter" />
              {/* Bottom Left Pink Glow */}
              <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl filter" />

              {/* Top Right Dots */}
              <div className="absolute top-10 right-10 hidden gap-4 md:flex">
                <span className="h-1.5 w-1.5 rounded-full ring-2 ring-white/60" />
                <span className="h-1.5 w-1.5 rounded-full ring-2 ring-white/60" />
                <span className="h-1.5 w-1.5 rounded-full ring-2 ring-white/60" />
                <span className="h-1.5 w-1.5 rounded-full ring-2 ring-white/60" />
              </div>

              {/* Bottom Left Dot Matrix Pattern */}
              <div className="absolute bottom-10 left-6 grid grid-cols-6 gap-2 md:left-12">
                {[...Array(24)].map((_, i) => (
                  <span key={i} className="h-1 w-1 rounded-full bg-white/30" />
                ))}
              </div>

              <div className="mx-auto w-full max-w-none space-y-20">
                {/* Clientele Row */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-bold text-white md:text-4xl">
                      Clientele
                    </h3>
                    <button className="group flex items-center justify-center rounded-full transition hover:bg-white/10 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="h-8 w-8 text-cyan-500 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:flex md:flex-wrap md:gap-8">
                    {[
                      { src: '/images/logo1.webp', alt: 'Prime Video' },
                      { src: '/images/logo2.jpg', alt: 'Apple TV' },
                      { src: '/images/logo3.webp', alt: 'Disney Hotstar' },
                      { src: '/images/logo4.jpg', alt: 'Sony LIV' },
                      { src: '/images/logo5.jpg', alt: 'Xstream Play' },
                    ].map((logo, idx) => (
                      <div
                        key={idx}
                        className="flex aspect-square h-20 w-auto items-center justify-center overflow-hidden rounded-2xl bg-black md:h-24 md:w-24 border border-white/10 transition hover:scale-105"
                      >
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Movies Row */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-bold text-white md:text-4xl">
                      Movies
                    </h3>
                    <button className="group flex items-center justify-center rounded-full transition hover:bg-white/10 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="h-8 w-8 text-cyan-500 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 lg:gap-6">
                    {[
                      '/images/movie1.jpg',
                      '/images/movie2.webp',
                      '/images/movie3.webp',
                      '/images/movie4.webp',
                      '/images/movie5.webp',
                      '/images/movie6.webp',
                    ].map((src, idx) => (
                      <div
                        key={idx}
                        className="aspect-[2/3] overflow-hidden rounded-2xl bg-black/40 shadow-lg ring-1 ring-white/10 transition-transform duration-300 hover:scale-105"
                      >
                        <img
                          src={src}
                          alt={`Movie poster ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>


            {/* Contact Us Section */}
            <section
              id="contact"
              className="relative flex min-h-screen flex-col justify-start bg-cover bg-center px-6 py-16 md:px-12 lg:px-24 md:py-20"
              style={{ backgroundImage: "url('/images/bg3.png')" }}
            >
              <div className="mx-auto flex w-full max-w-none flex-col lg:flex-row lg:items-center">
                {/* Left Content */}
                <div className="flex w-full flex-col items-start gap-10 lg:w-1/2">
                  <div className="lg:max-w-2xl">
                    <h2 className="text-5xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                      Contact Us
                    </h2>
                    <p className="mt-4 text-xl font-bold text-slate-100 sm:text-2xl lg:text-3xl">
                      Let&apos;s Build the Future of Entertainment Together
                    </p>
                    <p className="mt-6 max-w-xl text-xl leading-relaxed text-slate-300 md:text-2xl">
                      Whether you are a film producer looking for the right
                      distribution partner, an OTT platform seeking reliable content
                      collaborations, or an investor exploring opportunities in a
                      rapidly evolving industry, Mystic Art Studio welcomes the
                      conversation.
                    </p>
                  </div>

                  {/* Contact Details Stack */}
                  <div className="flex w-full max-w-md flex-col gap-4">
                    {/* Address Card */}
                    <div className="flex items-center gap-4 rounded-3xl border border-pink-500/30 bg-black/40 px-6 py-5 backdrop-blur-sm transition hover:bg-black/50">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-8 w-8"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="text-xl font-semibold leading-relaxed text-white">
                        <p>#46, Corporate Edge, Level 03,</p>
                        <p>Prestige Trace Towers, Palace Road,</p>
                        <p>High Grounds, Bengaluru-560001</p>
                      </div>
                    </div>

                    {/* Website Button */}
                    <a
                      href="https://www.mysticartstudios.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-fit items-center gap-4 rounded-2xl border border-pink-500/30 bg-black/40 px-6 py-4 backdrop-blur-sm transition hover:bg-pink-600/10"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      </div>
                      <span className="text-xl font-bold text-white group-hover:text-pink-300">
                        www.mysticartstudios.com
                      </span>
                    </a>

                    {/* Phone Button */}
                    <div className="flex w-fit items-center gap-4 rounded-2xl border border-pink-500/30 bg-black/40 px-6 py-4 backdrop-blur-sm transition hover:bg-black/50">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col text-xl font-bold text-white">
                        <span>+91 9606589112</span>
                        <span>+91 9880187222</span>
                      </div>
                    </div>

                    {/* Email Button */}
                    <a
                      href="mailto:buzz.mysticartstudio@gmail.com"
                      className="group flex w-fit items-center gap-4 rounded-2xl border border-pink-500/30 bg-black/40 px-6 py-4 backdrop-blur-sm transition hover:bg-pink-600/10"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-6 w-6"
                        >
                          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                        </svg>
                      </div>
                      <span className="text-xl font-bold text-white group-hover:text-pink-300">
                        buzz.mysticartstudio@gmail.com
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </section>




          </main>
        </div>
      </div>
    </>
  )
}

