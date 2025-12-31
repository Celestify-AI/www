"use client"

import React, { useEffect, useRef, useState } from "react"
import anime from "animejs"

export default function HomeClient() {
  // state for toggles and menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  
  // billing state
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  // pointers for the canvas and interactive layers
  const starCanvasRef = useRef<HTMLCanvasElement>(null)
  const landscapeCanvasRef = useRef<HTMLCanvasElement>(null)
  const fiberCanvasRef = useRef<HTMLCanvasElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // helper to scroll and kill menu
  const scrollToPage = (pageId: string) => {
    setIsMobileMenuOpen(false)
    const target = document.getElementById(`view-${pageId}`)
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // trigger checkouts
  const handlePurchase = (plan: string) => {
    console.log(`buying ${plan} (${billingCycle})`)
    alert(`checkout for ${plan} (${billingCycle}) coming soon`)
  }

  // trigger oauth
  const handleOAuth = (provider: string) => {
    console.log("auth with " + provider)
    alert("continuing with " + provider)
  }

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  // background engine for stars and hills
  useEffect(() => {
    const starCanvas = starCanvasRef.current
    const landscapeCanvas = landscapeCanvasRef.current
    if (!starCanvas || !landscapeCanvas) return

    const starCtx = starCanvas.getContext("2d", { alpha: true })
    const landscapeCtx = landscapeCanvas.getContext("2d", { alpha: true })
    if (!starCtx || !landscapeCtx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let animationFrameId: number

    const seed = Math.random() * 50000
    const stars = new Array(200).fill(0).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5,
      twinkle: Math.random() * Math.PI,
    }))

    const shootingStarPool = new Array(5).fill(0).map(() => ({
      active: false, x: 0, y: 0, len: 0, speed: 0, opacity: 0
    }))

    const noise = (x: number) => {
      const i = Math.floor(x)
      const f = x - i
      const s = (n: number) => Math.sin(n * 12.9898 + n * 78.233) * 43758.5453 - Math.floor(Math.sin(n * 12.9898 + n * 78.233) * 43758.5453)
      return s(i) * (1 - (f * f * (3 - 2 * f))) + s(i + 1) * (f * f * (3 - 2 * f))
    }

    const renderStaticLandscape = () => {
      landscapeCtx.clearRect(0, 0, width, height)
      const drawLayer = (ctx: CanvasRenderingContext2D, baseColor: string, octaves: number, scale: number, offset: number) => {
        ctx.fillStyle = baseColor
        ctx.beginPath()
        ctx.moveTo(0, height)
        for (let x = 0; x <= width; x += 4) {
          let total = 0, freq = scale, amp = 1, max = 0
          for (let i = 0; i < octaves; i++) {
            total += noise((x + seed) * freq) * amp
            max += amp; amp *= 0.5; freq *= 2
          }
          const h = Math.pow(total / max, 1.8)
          const y = height - (h * (height * 0.45)) - offset
          ctx.lineTo(x, y)
        }
        ctx.lineTo(width, height)
        ctx.fill()
      }
      drawLayer(landscapeCtx, "rgba(40, 38, 35, 1)", 4, 0.001, 180)
      drawLayer(landscapeCtx, "rgba(25, 24, 22, 1)", 6, 0.003, 90)
      drawLayer(landscapeCtx, "#050505", 8, 0.006, 0)
    }

    const updateStars = () => {
        starCtx.clearRect(0, 0, width, height)
        stars.forEach(s => {
          s.twinkle += 0.02
          const alpha = (Math.sin(s.twinkle) + 1) / 2
          starCtx.fillStyle = `rgba(245, 233, 214, ${alpha * 0.6})`
          starCtx.fillRect(s.x, s.y, s.size, s.size)
        })
        if (Math.random() > 0.997) {
            const inactive = shootingStarPool.find(s => !s.active)
            if (inactive) {
                inactive.active = true
                inactive.x = Math.random() * width
                inactive.y = Math.random() * (height * 0.5)
                inactive.len = 50 + Math.random() * 100
                inactive.speed = 10 + Math.random() * 15
                inactive.opacity = 1
            }
        }
        shootingStarPool.forEach(s => {
            if (!s.active) return
            starCtx.strokeStyle = `rgba(245, 233, 214, ${s.opacity})`
            starCtx.lineWidth = 2
            starCtx.beginPath(); starCtx.moveTo(s.x, s.y); starCtx.lineTo(s.x - s.len, s.y + s.len * 0.5); starCtx.stroke()
            s.x += s.speed; s.y -= s.speed * 0.5; s.opacity -= 0.02
            if (s.opacity <= 0) s.active = false
        })
        animationFrameId = requestAnimationFrame(updateStars)
    }

    const handleResize = () => {
      width = window.innerWidth; height = window.innerHeight
      const dpr = window.devicePixelRatio || 1
      const containers = [starCanvas, landscapeCanvas]
      containers.forEach(c => {
        if (!c) return
        c.width = width * dpr; c.height = height * dpr
        c.style.width = `${width}px`; c.style.height = `${height}px`
        c.getContext('2d')?.scale(dpr, dpr)
      })
      renderStaticLandscape()
    }

    window.addEventListener("resize", handleResize)
    handleResize(); updateStars()
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animationFrameId) }
  }, [])

  // fiber ingestion engine
  useEffect(() => {
    const canvas = fiberCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const w = 540, h = 400
    canvas.width = w; canvas.height = h
    const center = { x: w/2, y: h/2 }
    const sources = [{x:72,y:72},{x:w-72,y:72},{x:72,y:h-72},{x:w-72,y:h-72}]
    let packets: any[] = []
    
    function loop() {
        ctx.clearRect(0, 0, w, h)
        // Draw static connecting lines to center
        ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1
        sources.forEach(s => { ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(center.x, center.y); ctx.stroke() })
        
        // Spawn packets
        if(Math.random() < 0.03) {
            const randomIndex = Math.floor(Math.random() * sources.length)
            const s = sources[randomIndex]
            // THE FIX: We added "if (s)" here to satisfy TypeScript
            if (s) {
                packets.push({x:s.x, y:s.y, tx:center.x, ty:center.y, p:0})
            }
        }
        
        // Update packets
        for(let i=packets.length-1; i>=0; i--) {
            let p = packets[i]; p.p += 0.015
            if(p.p >= 1) { packets.splice(i, 1); continue }
            const cx = p.x + (p.tx-p.x)*p.p, cy = p.y + (p.ty-p.y)*p.p
            ctx.strokeStyle = '#f5e9d6'; ctx.lineWidth = 2
            ctx.beginPath(); ctx.moveTo(cx - (p.tx-p.x)*0.08, cy - (p.ty-p.y)*0.08); ctx.lineTo(cx, cy); ctx.stroke()
        }
        requestAnimationFrame(loop)
    }
    loop()
  }, [])

  // carousel prioritization engine
  useEffect(() => {
    const stage = carouselRef.current
    if (!stage) return
    stage.innerHTML = "" // clean up
    const data = ["Enterprise Pricing Adjustments", "Teammate updated pricing doc", "Next steps before call"]
    const cards = data.map((t) => {
        const el = document.createElement('div'); el.className = 'carousel-card'
        el.innerHTML = `<div class="cc-header"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10"/></svg>UPDATE</div><div class="cc-body"><p style="font-size:11px; color:#fff">${t}</p><div class="cc-line"></div><div class="cc-highlight"></div></div>`
        stage.appendChild(el); return el
    })
    let angle = 0
    function update() {
        angle += 0.25
        cards.forEach((c, i) => {
            const theta = (angle * Math.PI / 180) + (i * 2 * Math.PI / 3)
            const x = Math.sin(theta) * 160, z = Math.cos(theta) * 160 - 100
            const modZ = Math.cos(theta)
            const active = modZ > 0.8
            c.className = active ? 'carousel-card active' : 'carousel-card'
            c.style.transform = `translate3d(${x}px, 0, ${z}px) scale(${active ? 1.05 : 0.9})`
            c.style.zIndex = Math.round(modZ * 100).toString()
            c.style.opacity = active ? "1" : "0.2"
        })
        requestAnimationFrame(update)
    }
    update()
  }, [])

  // hero intro bypass for mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 1024
    const timer = setTimeout(() => {
      if (isMobile) {
        anime.set("#moon-group", { opacity: 0, scale: 0 })
        anime.set("#logo-group", { opacity: 1, scale: 1, rotate: 0 })
        anime.set("#fisherman-group", { opacity: 1, rotate: 0 })
        anime.set("#space-jelly", { translateX: 110, translateY: 355, scale: 1 })
        anime.set(".hero-content", { opacity: 1, translateY: 0 })
        anime.set("#fish-line", { y2: 360 })
      } else {
        anime.set("#moon-group", { opacity: 1, scale: 1, rotate: 0 })
        anime.set("#logo-group", { opacity: 0, scale: 0.2, rotate: "-0.5turn" })
        anime.set("#fisherman-group", { opacity: 0 })
        anime.set("#space-jelly", { translateX: 110, translateY: 445, scale: 0 })
        anime.set(".hero-content", { opacity: 0, translateY: 30 })
        anime.set("#fish-line", { y2: 294 })
      }

      const startIdleLoops = () => {
        anime({ targets: "#space-jelly", translateY: [355, 360], rotate: [-5, 5], duration: 2000, direction: "alternate", loop: true, easing: "easeInOutSine" })
        anime({ targets: "#tentacles", d: ["M4,12 Q2,20 5,28 M10,12 Q10,22 10,31 M16,12 Q18,20 15,28", "M4,12 Q6,20 3,28 M10,12 Q12,22 10,31 M16,12 Q14,20 17,28"], duration: 1500, direction: "alternate", loop: true, easing: "easeInOutQuad" })
      }

      if (!isMobile) {
        const tl = anime.timeline({ easing: "easeInOutCubic" })
        tl.add({ targets: "#moon-group", rotate: [{ value: "0.25turn", duration: 1200, easing: "linear" }, { value: "2.5turn", duration: 1000, easing: "easeInExpo" }], scale: [{ value: 1, duration: 1800 }, { value: 0.1, duration: 400, easing: "easeInExpo" }], opacity: [{ value: 1, duration: 2100 }, { value: 0, duration: 100 }] })
          .add({ targets: "#logo-group", rotate: ["-0.5turn", 0], scale: [0.2, 1], opacity: [0, 1], duration: 1200, easing: "easeOutElastic(1, .5)" }, "-=300")
          .add({ targets: ".hero-content", opacity: [0, 1], translateY: [30, 0], duration: 800, easing: "easeOutQuad" }, "-=900")
          .add({ targets: "#fisherman-group", opacity: [0, 1], duration: 1000 }, "-=400")
          .add({ targets: "#fish-line", y2: 450, duration: 1200, easing: "easeOutQuad" })
          .add({ targets: "#space-jelly", scale: [0, 1], duration: 400, easing: "easeOutBack" })
          .add({ targets: "#fisherman-group", rotate: 15, duration: 600, easing: "easeOutSine" }, "+=100")
          .add({ targets: "#fish-line", y2: 360, duration: 1500, easing: "easeInOutSine" }, "-=600")
          .add({ targets: "#space-jelly", translateY: 355, duration: 1500, easing: "easeInOutSine" }, "-=1500")
          .add({ targets: "#fisherman-group", rotate: 0, duration: 800, easing: "easeOutQuad" })
        tl.finished.then(startIdleLoops)
      } else {
        startIdleLoops()
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // reveals logo unit
  useEffect(() => {
    anime.timeline({ easing: 'easeOutExpo' })
      .add({ targets: '.logo-unit', opacity: [0, 1], scale: [0.8, 0.92], duration: 1500, delay: 500 })
  }, [])

  // magnetic mouse fluff for buttons
  useEffect(() => {
    const magElements = document.querySelectorAll(".mag-element")
    magElements.forEach((el) => {
      const htmlEl = el as HTMLElement
      let isHovered = false, rect: DOMRect | null = null, ticking = false
      const onEnter = () => { isHovered = true; rect = htmlEl.getBoundingClientRect(); htmlEl.style.transition = "transform 0.1s ease-out" }
      const onMove = (e: any) => {
        if (!isHovered || !rect) return
        if (!ticking) {
          window.requestAnimationFrame(() => {
            if (rect) {
              const x = (e.clientX - rect.left - rect.width / 2) * 0.35
              const y = (e.clientY - rect.top - rect.height / 2) * 0.35
              htmlEl.style.transform = `translate(${x}px, ${y}px)`
            }
            ticking = false
          })
          ticking = true
        }
      }
      const onLeave = () => { isHovered = false; rect = null; htmlEl.style.transform = `translate(0, 0)`; htmlEl.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)" }
      htmlEl.addEventListener("mouseenter", onEnter); htmlEl.addEventListener("mousemove", onMove); htmlEl.addEventListener("mouseleave", onLeave)
    })
  }, [])

  return (
    <main className="landing-page-wrapper">
      <style jsx global>{`
        /* synchronized layout block */
        html { scroll-padding-top: 90px; }
        ::-webkit-scrollbar-thumb { background: #f5e9d6 !important; border-radius: 5px; }
        ::-webkit-scrollbar { width: 6px; }
        #moon-group, #logo-group, #fisherman-group, #space-jelly { transform-box: fill-box; }
        .logo-unit { opacity: 0; }
        
        @media (max-width: 1024px) {
            header nav, header .nav-actions { display: none !important; }
            .mobile-toggle { display: flex !important; align-items: center; justify-content: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); width: 44px; height: 44px; border-radius: 12px; cursor: pointer; }
            header { padding: 0 20px; }
            .logo-unit { transform: scale(0.75); transform-origin: left center; opacity: 1 !important; }
        }

        /* animation container styles */
        .visual-box { height: 400px; background: #0a0a0a; border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; perspective: 1200px; }
        .icon-node { position: absolute; width: 40px; height: 40px; background: #050505; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #444; z-index: 2; }
        .icon-node.active { color: #f5e9d6; border-color: #f5e9d6; box-shadow: 0 0 15px rgba(245, 233, 214, 0.2); }
        .tl { top: 40px; left: 40px; } .tr { top: 40px; right: 40px; } .bl { bottom: 40px; left: 40px; } .br { bottom: 40px; right: 40px; }
        .center-node { position: absolute; width: 48px; height: 48px; background: #050505; border: 1px solid #f5e9d6; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #f5e9d6; z-index: 3; box-shadow: 0 0 20px rgba(245, 233, 214, 0.15); }

        .carousel-stage { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; display: flex; align-items: center; justify-content: center; }
        .carousel-card { width: 180px; height: 240px; position: absolute; background: rgba(12, 12, 12, 0.9); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; backface-visibility: hidden; transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); backdrop-filter: blur(12px); }
        .agent-win { position: absolute; background: rgba(10, 10, 10, 0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; display: flex; flex-direction: column; overflow: hidden; animation: subtleFloat 6s ease-in-out infinite; }
        @keyframes subtleFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        
        /* Mobile Menu Styles */
        .mobile-nav-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(5, 5, 5, 0.95); backdrop-filter: blur(15px); z-index: 99; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }
        .mobile-nav-overlay.active { opacity: 1; pointer-events: all; }
        .mobile-nav-links { display: flex; flex-direction: column; align-items: center; gap: 24px; }
        .mobile-nav-links button { background: none; border: none; color: #f5e9d6; font-size: 20px; cursor: pointer; font-family: inherit; transition: opacity 0.2s; }
        .mobile-nav-links button:active { opacity: 0.6; }

        /* Toggle Switch */
        .pricing-toggle { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 40px; }
        .toggle-label { font-size: 14px; color: #888; transition: color 0.3s; cursor: pointer; }
        .toggle-label.active { color: #f5e9d6; font-weight: 500; }
        .switch { position: relative; display: inline-block; width: 48px; height: 26px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.1); border-radius: 34px; transition: .4s; border: 1px solid rgba(255,255,255,0.1); }
        .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 4px; bottom: 3px; background-color: #f5e9d6; border-radius: 50%; transition: .4s; }
        input:checked + .slider:before { transform: translateX(20px); }
      `}</style>

      <canvas ref={starCanvasRef} id="horizon-stars" style={{ position:'fixed', inset:0, zIndex:-2 }}></canvas>
      <canvas ref={landscapeCanvasRef} id="horizon-landscape" style={{ position:'fixed', inset:0, zIndex:-1 }}></canvas>

      <header>
        <div id="logo-container" onClick={() => scrollToPage("home")} tabIndex={0} role="button">
          <div style={{ transformOrigin: 'left center', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 10 }} className="logo-unit">
            <svg width="220" height="60" viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="text-cream-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fbf4e8" /><stop offset="100%" stopColor="#e0cfb6" /></linearGradient>
                    <mask id="text-mask"><rect x="0" y="0" width="100%" height="100%" fill="black" /><text x="50" y="42" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="28" letterSpacing="-1" fill="white">elestify</text></mask>
                </defs>
                <g transform="translate(10, 8) scale(0.096)">
                    <path fill="url(#text-cream-gradient)" d="M323.131 314.641C335.684 302.12 354.834 298.964 370.922 306.456L371.022 306.503H371.027L407.361 323.432C384.893 378.563 330.636 409.165 274.446 413.071C218.279 416.976 160.297 394.2 130.333 342.714L174.43 322.172C187.854 315.918 203.611 316.853 215.971 324.927L216.557 325.316C248.503 346.954 296.02 341.69 323.131 314.641ZM111.9 303.217C59.7998 128.232 296.515 18.5527 396.657 170.552L352.246 191.242C338.574 197.61 322.479 196.442 310.097 187.851C260.657 153.538 187.494 187.133 180.962 246.656L180.82 248.063C179.447 263.074 169.985 276.158 156.303 282.531L111.9 303.217Z" />
                    <g fill="rgba(0,0,0,0.12)">
                       <circle cx="150" cy="300" r="15" /><circle cx="200" cy="350" r="25" /><circle cx="350" cy="180" r="20" /><circle cx="320" cy="100" r="10" /><circle cx="380" cy="150" r="8" /><circle cx="350" cy="350" r="12" />
                    </g>
                </g>
                <g>
                    <text x="50" y="42" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="28" letterSpacing="-1" fill="url(#text-cream-gradient)">elestify</text>
                    <g fill="rgba(0,0,0,0.15)" mask="url(#text-mask)">
                        <circle cx="55" cy="32" r="1.5" /><circle cx="58" cy="38" r="1" /><circle cx="78" cy="34" r="1.5" /><circle cx="118" cy="26" r="1.5" /><circle cx="130" cy="32" r="1.5" />
                    </g>
                </g>
            </svg>
          </div>
        </div>

        <nav>
          <button className="nav-link mag-element" onClick={() => scrollToPage("download")}>Product</button>
          <button className="nav-link mag-element" onClick={() => scrollToPage("blog")}>Vision</button>
          <button className="nav-link mag-element" onClick={() => scrollToPage("pricing")}>Pricing</button>
          <button className="nav-link mag-element" onClick={() => scrollToPage("contact")}>Contact</button>
          <button className="nav-link mag-element" onClick={() => scrollToPage("team")}>Team</button>
        </nav>

        <div className="header-right-group">
            <div className="nav-actions">
                <button className="btn-glass btn-glass-secondary" style={{ height: "38px", padding: "0 16px", fontSize: "13px" }} onClick={() => setIsLoginOpen(true)}>Login</button>
                <button className="btn-glass" style={{ height: "38px" }} onClick={() => handlePurchase("started")}>Get started →</button>
            </div>
            <button className="mobile-toggle mag-element" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
        </div>
      </header>

      {/* menu portal for mobile */}
      <div id="mobile-menu" className={`mobile-nav-overlay ${isMobileMenuOpen ? "active" : ""}`}>
        <div className="mobile-nav-links">
          <button onClick={() => scrollToPage("download")}>Product</button>
          <button onClick={() => scrollToPage("blog")}>Vision</button>
          <button onClick={() => scrollToPage("pricing")}>Pricing</button>
          <button onClick={() => scrollToPage("contact")}>Contact</button>
          <button onClick={() => scrollToPage("team")}>Team</button>
          <button className="btn-glass" style={{ fontSize: "24px", marginTop:'20px' }} onClick={() => { setIsMobileMenuOpen(false); setIsLoginOpen(true); }}>Login</button>
        </div>
      </div>

      <div id="view-home" className="view-section active-view">
        <div className="home-container">
          <div className="hero-content">
            <h1>Stop searching.<br /><span className="text-gradient">Start working.</span></h1>
            <p className="subtitle">Celestify turns the noise of your digital life into a unified intelligence that actually understands you.</p>
            <div className="hero-btn-group">
              <button className="btn-glass" onClick={() => handlePurchase("started")}>Get Started →</button>
              <button className="btn-glass btn-glass-secondary" onClick={() => scrollToPage("pricing")}>View Pricing →</button>
            </div>
          </div>
          <div className="visual-container">
            {/* UPDATED SVG with Craters/Details */}
            <svg id="celestify-anim" aria-hidden="true" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="horizon-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"><stop offset="30%" stopColor="rgba(245, 233, 214, 0.25)" /><stop offset="100%" stopColor="rgba(245, 233, 214, 0)" /></radialGradient>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fbf4e8" /><stop offset="100%" stopColor="#e0cfb6" /></linearGradient>
                <radialGradient id="jelly-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#00f3ff" /><stop offset="100%" stopColor="#006066" /></radialGradient>
                <clipPath id="logo-clip"><path d="M323.131 314.641C335.684 302.12 354.834 298.964 370.922 306.456L371.022 306.503H371.027L407.361 323.432C384.893 378.563 330.636 409.165 274.446 413.071C218.279 416.976 160.297 394.2 130.333 342.714L174.43 322.172C187.854 315.918 203.611 316.853 215.971 324.927L216.557 325.316C248.503 346.954 296.02 341.69 323.131 314.641ZM111.9 303.217C59.7998 128.232 296.515 18.5527 396.657 170.552L352.246 191.242C338.574 197.61 322.479 196.442 310.097 187.851C260.657 153.538 187.494 187.133 180.962 246.656L180.82 248.063C179.447 263.074 169.985 276.158 156.303 282.531L111.9 303.217Z" /></clipPath>
              </defs>
              <g id="moon-group"><circle cx="256" cy="256" r="240" fill="url(#horizon-glow)" /><circle cx="256" cy="256" r="100" fill="#f5e9d6" /><g fill="rgba(0,0,0,0.08)"><circle cx="230" cy="230" r="18" /><circle cx="300" cy="210" r="12" /><circle cx="280" cy="290" r="22" /><circle cx="200" cy="280" r="8" /><circle cx="310" cy="270" r="14" /></g></g>
              <g id="logo-group" opacity="0" transform="scale(0.5)"><g clipPath="url(#logo-clip)"><rect x="0" y="0" width="512" height="512" fill="url(#logo-gradient)" /><g fill="rgba(0,0,0,0.08)"><circle cx="150" cy="300" r="15" /><circle cx="200" cy="350" r="25" /><circle cx="350" cy="180" r="20" /><circle cx="320" cy="100" r="10" /><circle cx="380" cy="150" r="8" /><circle cx="350" cy="350" r="12" /><circle cx="250" cy="400" r="18" /><circle cx="180" cy="200" r="6" /><circle cx="300" cy="300" r="5" /></g></g></g>
              <g id="fisherman-group" style={{ opacity: 0, transformOrigin: "165px 325px" }} transform="translate(-25, 14)"><path fill="url(#logo-gradient)" d="M165,325 C160,315 170,308 175,312 C178,315 178,322 165,325 Z" /><circle cx="176" cy="307" r="3.5" fill="url(#logo-gradient)" /><circle cx="169" cy="317" r="2.5" fill="url(#logo-gradient)" /><line x1="169" y1="317" x2="169" y2="321" stroke="#f5e9d6" strokeWidth="1" strokeLinecap="round" /><line x1="172" y1="315" x2="120" y2="294" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" /><line id="fish-line" x1="120" y1="294" x2="120" y2="294" stroke="rgba(255,255,255,0.8)" strokeWidth="1" /><g id="space-jelly" transform="translate(110, 445) scale(0)"><path fill="url(#jelly-glow)" fillOpacity="0.9" d="M0,10 Q10,-5 20,10 L20,12 Q10,5 0,12 Z" /><path id="tentacles" stroke="#00f3ff" strokeOpacity="0.8" fill="none" d="M4,12 Q2,20 5,28 M10,12 Q10,22 10,31 M16,12 Q18,20 15,28" strokeWidth="1" /></g></g>
            </svg>
          </div>
        </div>
      </div>

      <div id="view-download" className="view-section">
        <div className="dl-hero"><h1>Connect once.<br /><span className="text-gradient">Know forever.</span></h1><p>Link your tools in seconds. We index the past so you can query the future.</p><div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "30px" }}><button className="btn-glass" onClick={() => handlePurchase("started")}>Get Started →</button></div></div>
        <div className="social-proof-belt">
            <span className="belt-label">Trusted by founders from</span>
            <div className="logo-row-enterprise">
                <div className="logo-item"><img src="/assets/ycombinator.png" alt="Y Combinator" /><span>Y Combinator</span></div>
                <div className="logo-item"><svg><use href="/icons.svg#logo-mit"></use></svg><span>MIT</span></div>
                <div className="logo-item"><img src="/upenn.svg" alt="UPenn" /><span>UPenn</span></div>
                <div className="logo-item"><img src="/assets/stanford.png" alt="Stanford" /><span>Stanford</span></div>
            </div>
        </div>
        <section className="product-viewport" style={{ marginBottom: "100px" }}><div className="section-header"><h2>Intelligence where you live.</h2><p style={{ marginBottom: "40px" }}>We connect to your favorite productivity tools to provide a seamless intelligence layer over your existing workflow.</p><div className="logo-row-enterprise" style={{ marginBottom: "60px" }}><div className="logo-item"><svg><use href="/icons.svg#logo-gmail"></use></svg><span>Gmail</span></div><div className="logo-item"><svg><use href="/icons.svg#logo-slack"></use></svg><span>Slack</span></div><div className="logo-item"><svg><use href="/icons.svg#logo-drive"></use></svg><span>Drive</span></div><div className="logo-item"><img src="/assets/notion.png" alt="Notion" /><span>Notion</span></div><div className="logo-item"><img src="/assets/linear.png" alt="Linear" /><span>Linear</span></div></div></div><div className="viewport-frame"><img src="/assets/hey_ken_3.webp" alt="App Preview" /></div></section>
        
        <div className="section-header" style={{ marginTop: "150px" }}><h2>What happens when you use Celestify?</h2></div>
        <div className="steps-grid">
            <div className="step-card"><h4>Context</h4><p>You stop manually reconstructing context: no more digging through Slack, email, docs, or meetings to figure out what’s going on before making critical decisions.</p></div>
            <div className="step-card"><h4>Sync</h4><p>You don’t need to constantly re-sync context with your team.</p></div>
            <div className="step-card"><h4>Risk</h4><p>You reduce operational risk caused by fragmented systems, information and teams.</p></div>
            <div className="step-card"><h4>Scale</h4><p>You ensure that nothing important falls through the cracks, even as your organization and team scale.</p></div>
        </div>

        <div className="beliefs-section">
            <h3 style={{ marginBottom: "30px", fontFamily: "Georgia, serif", fontSize: "28px" }}>At Celestify, we embody two strong beliefs:</h3>
            <div className="belief-item"><p><strong>1.</strong> We believe that proper knowledge management is the standard for actionable intelligence.</p></div>
            <div className="belief-item"><p><strong>2.</strong> We believe that humans remain at the 20% of work that drives results.</p></div>
            <p style={{ marginTop: "30px", fontStyle: "italic", color: "var(--accent)" }}>Therefore, it is obvious to remove everything that does not require human intervention and present everything that does.</p>
        </div>

        {/* INTEGRATED ANIMATIONS SECTION */}
        <div className="section-header" style={{ marginTop: "150px" }}><h2>Celestify does 3 things</h2></div>
        
        {/* THING 1: Ingestion */}
        <div className="feature-block">
            <div className="feature-content">
                <h3>1. Unified context ingestion and maintenance</h3>
                <p>99% of your notifications are noise. We find that 1% that demands your attention.</p>
                <p style={{ marginTop: "16px" }}>We constantly pull and clean your data content and relationships from Gmail, Docs, Slack, CRM, Notes, etc., into a shared memory system (RAG) for anyone on your team to access.</p>
            </div>
            <div className="visual-box">
                <canvas ref={fiberCanvasRef}></canvas>
                {/* Updated Icons matching reference: Mail, File, Chat, Search, Center DB */}
                <div className="icon-node tl active"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9 2-2 2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
                <div className="icon-node tr active"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg></div>
                <div className="icon-node bl active"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
                <div className="icon-node br active"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
                <div className="center-node"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg></div>
            </div>
        </div>

        {/* THING 2: Prioritization */}
        <div className="feature-block">
            <div className="feature-content">
                <h3>2. Prioritization and Knowledge Updates</h3>
                <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Enterprise Pricing Adjustments</p>
                <p>A teammate updated the pricing doc and removed Enterprise discounts this morning. This likely affects the deal you planned to deprioritize: you need to revisit the next steps before the customer call.</p>
            </div>
            <div className="visual-box">
                <div className="carousel-stage" ref={carouselRef}></div>
            </div>
        </div>

        {/* THING 3: Action Assist */}
        <div className="feature-block">
            <div className="feature-content">
                <h3>3. Action Assist</h3>
                <p>From your decision, our platform uses an action plan to assist in work completion. Repetitive/non-essential parts of the workflow will be resolved by a specialized agent so you focus on what is important.</p>
                <p style={{ marginTop:'20px', fontWeight:'500', color:'var(--accent)' }}>WORKFLOWS 3 examples</p>
                <ul style={{ listStyle:'none', padding:0, marginTop:'8px', fontSize:'15px', color:'#ccc' }}>
                    <li style={{ marginBottom:'4px' }}>• Review updated pricing doc</li>
                    <li style={{ marginBottom:'4px' }}>• Reassess deal priority</li>
                    <li>• Adjust customer call agenda</li>
                </ul>
            </div>
            <div className="visual-box">
                <div className="agent-win" style={{ top:'15%', left:'10%', width:'190px' }}>
                    <div style={{ padding:'10px', fontSize:'9px', color:'#f5e9d6', background:'rgba(255,255,255,0.05)' }}>Reviewing...</div>
                    <div style={{ padding:'14px', fontSize:'10px', color:'#888' }}>Review updated pricing doc</div>
                </div>
                <div className="agent-win" style={{ top:'30%', right:'10%', width:'170px', animationDelay:'2s' }}>
                    <div style={{ padding:'10px', fontSize:'9px', color:'#f5e9d6', background:'rgba(255,255,255,0.05)' }}>Reassessing...</div>
                    <div style={{ padding:'14px', fontSize:'10px', color:'#888' }}>Reassess deal priority</div>
                </div>
                <div className="agent-win" style={{ bottom:'15%', left:'50%', transform:'translateX(-50%)', width:'210px', animationDelay:'1s' }}>
                    <div style={{ padding:'10px', fontSize:'9px', color:'#f5e9d6', background:'rgba(255,255,255,0.05)' }}>Adjusting...</div>
                    <div style={{ padding:'14px', fontSize:'10px', color:'#888' }}>Adjust customer call agenda</div>
                </div>
            </div>
        </div>
      </div>

      <div id="view-blog" className="view-section">
        <div className="section-header" style={{ marginTop: "40px" }}><h2>The Vision</h2><p>Updates, thoughts, and roadmap from the Celestify team.</p></div>
        <div className="vision-grid">
            <div className="vision-card"><h3>Intelligent Knowledge</h3><p>We're creating systems that understand not just what information exists, but why it matters and how it connects.</p></div>
            <div className="vision-card"><h3>Agentic Workflows</h3><p>Our RAG-powered approach enables AI agents to execute complex workflows with the knowledge they need.</p></div>
            <div className="vision-card"><h3>Unified Intelligence</h3><p>Transforming scattered information into a unified knowledge base that grows smarter with every interaction.</p></div>
        </div>
      </div>

      {/* FULL FAQ */}
      <div className="view-section">
        <div className="section-header" style={{ marginTop: "150px" }}><h2>Frequently asked questions</h2></div>
        <div className="faq-container">
            {[
                { q: "What is Celestify?", a: "Celestify tells you exactly what to work on next, updates it in real time, and takes care of the busywork that would otherwise break your focus." },
                { q: "Who is Celestify for?", a: "Founders and operators are where context breaks first. Once we solve it there, the same problem reoccurs in ops, engineering, and leadership teams." },
                { q: "Is Celestify free to use?", a: "We offer a free 3-day trial to see if this tool can help you. Celestify offers premium service to increase efficiency, productivity and streamline focus." },
                { q: "Is Celestify available for all devices?", a: "Currently available as a Web, Mac or Windows Application. Mobile is on the roadmap." },
                { q: "Why do other tools not work?", a: "Currently, tools like Notion, Asuna, Clickup, RAG systems and Anthropic's Agentic tools provide: organization without intelligence, intelligence without persistent execution context or infrastructure without productized workflows." },
                { q: "How does context ingestion work?", a: "Celestify pulls your content from your typical tools into a RAG system. This way, it not only collects information, but also collects context, meaning and relationships." },
                { q: "What does the Celestify Agent understand?", a: "Celestify performs actions based on your goals, team context, current state, cross-team awareness, and permission-aware information." },
                { q: "What does Celestify Integrate with?", a: "As of Dec 31st 2025, Celestify can intake and generate from the Google Suite/Drive, Calendar, Cal.com, and Notion." }
            ].map((item, index) => (
                <div className={`faq-item ${activeFaq === index ? "active" : ""}`} key={index}>
                    <button className="faq-trigger" onClick={() => toggleFaq(index)}>
                        <span className="faq-question-text">{item.q}</span>
                        <span className="faq-icon">+</span>
                    </button>
                    <div className="faq-content"><p>{item.a}</p></div>
                </div>
            ))}
        </div>
      </div>

      <div id="view-pricing" className="view-section">
        <div className="section-header"><h2>Simple, transparent pricing</h2><p>Choose the plan that fits your needs.</p></div>
        
        {/* Toggle Switch */}
        <div className="pricing-toggle">
            <span className={`toggle-label ${billingCycle === 'monthly' ? 'active' : ''}`} onClick={() => setBillingCycle('monthly')}>Monthly</span>
            <label className="switch">
                <input type="checkbox" checked={billingCycle === 'yearly'} onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')} />
                <span className="slider"></span>
            </label>
            <span className={`toggle-label ${billingCycle === 'yearly' ? 'active' : ''}`} onClick={() => setBillingCycle('yearly')}>Yearly</span>
        </div>

        <div className="pricing-grid">
            <div className="card-base">
                <div className="plan-name">Starter</div><div className="price">$0<span>/mo</span></div><span className="trial-info">3-day trial</span>
                <ul className="features-list"><li>Limited RAG queries</li><li>Limited integrations</li><li>Basic search queries</li></ul>
                <button className="btn btn-card btn-secondary" onClick={() => handlePurchase("starter")}>Start Trial</button>
            </div>
            <div className="card-base popular">
                <div className="badge">Most Popular</div>
                <div className="plan-name">Pro</div>
                <div className="price">${billingCycle === 'monthly' ? '20' : '16'}<span>/mo</span></div>
                <span className="trial-info">{billingCycle === 'yearly' ? 'billed yearly' : 'billed monthly'}</span>
                <ul className="features-list"><li>Standard RAG queries</li><li>All integrations</li><li>Advanced AI context</li></ul>
                <button className="btn btn-card btn-primary" onClick={() => handlePurchase("pro")}>Get Started</button>
            </div>
            <div className="card-base">
                <div className="plan-name">Max</div>
                <div className="price">${billingCycle === 'monthly' ? '50' : '42'}<span>/mo</span></div>
                <span className="trial-info">{billingCycle === 'yearly' ? 'billed yearly' : 'billed monthly'}</span>
                <ul className="features-list"><li>3x RAG queries vs Pro</li><li>3x usage capacity</li><li>All Pro features</li></ul>
                <button className="btn btn-card btn-secondary" onClick={() => handlePurchase("max")}>Get Started</button>
            </div>
        </div>
      </div>

      <div id="view-contact" className="view-section">
        <div className="section-header"><h2>Get in touch</h2><p>Comments, questions, feedback or advice.</p></div>
        <div className="contact-grid">
          <div className="contact-item"><span className="contact-label">General Inquiries</span><a href="mailto:info@celestify.ai" className="contact-email">info@celestify.ai</a></div>
          <div className="contact-item"><span className="contact-label">Discord Community</span><a href="https://discord.gg/2aHn4AygTs" target="_blank" className="contact-email">Join our Discord</a></div>
          <div className="contact-item"><span className="contact-label">Careers</span><a href="mailto:ethan@celestify.ai" className="contact-email">ethan@celestify.ai</a></div>
        </div>
      </div>

      <div id="view-team" className="view-section">
        <div className="section-header"><h2>The Team</h2><p>Committed to creating the future of how work is done.</p></div>
        <h3 className="team-section-title">FOUNDERS</h3>
        <div className="team-grid">
          <div className="member-card"><h4>Ken</h4><span className="member-role">Technical Founder</span></div>
          <div className="member-card"><h4>Ethan</h4><span className="member-role">Founder & Strategist</span></div>
          <div className="member-card"><h4>Yash</h4><span className="member-role">Technical Leader</span></div>
        </div>
        <h3 className="team-section-title">CORE TEAM</h3>
        <div className="team-grid">
          <div className="member-card"><h4>Ishaan</h4><span className="member-role">Growth Lead</span></div>
          <div className="member-card"><h4>Kundana</h4><span className="member-role">ML Researcher</span></div>
          <div className="member-card"><h4>Karthik</h4><span className="member-role">GTM & Sales</span></div>
        </div>
      </div>

      <div className={`overlay ${isLoginOpen ? "active" : ""}`} id="loginOverlay">
        <div className="login-card">
          <h2>Welcome back</h2><p>Sign into your account</p>
          <button className="btn-glass" style={{ width: '100%', padding: '16px', gap: '12px', marginBottom:'12px' }} onClick={() => handleOAuth('google')}>Continue with Google</button>
          <button className="btn-glass btn-glass-secondary" style={{ width: '100%', padding: '16px', gap: '12px' }} onClick={() => handleOAuth('github')}>Continue with GitHub</button>
          <button className="dismiss-btn" onClick={() => setIsLoginOpen(false)}>Cancel</button>
        </div>
      </div>
    </main>
  )
}
