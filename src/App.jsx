import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import badrinathImage from './pages/features/temples/badrinath/images/badrinath.jpg'
import dwarkadhishImage from './pages/features/temples/dwarkadhish/images/dwarkadhish.jpeg'
import jagannathImage from './pages/features/temples/jagannathPuri/images/jagannath.jpg'
import rameshwaramImage from './pages/features/temples/rameshwaram/images/rameshwaram.jpg'
import qrCodeImage from './assets/qrcode.png'
import upiImage from './assets/upi.png'
import cardImage from './assets/card.png'
import homeHtml from './pages/Home/home.html?raw'
import aboutHtml from './pages/about/about.html?raw'
import Header from './Components/Header'
import './pages/Home/home.css'
import './pages/about/about.css'
import './App.css'

const homeContent = homeHtml
  .replace(/^[\s\S]*<body[^>]*>/i, '')
  .replace(/<\/body>[\s\S]*$/i, '')
  .replace(/<header[\s\S]*?<\/header>/i, '')
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace('../features/temples/rameshwaram/images/rameshwaram.jpg', rameshwaramImage)
  .replace('../features/temples/badrinath/images/badrinath.jpg', badrinathImage)
  .replace('../features/temples/jagannathPuri/images/jagannath.jpg', jagannathImage)
  .replace('../features/temples/dwarkadhish/images/dwarkadhish.jpeg', dwarkadhishImage)
  .replace('../../assets/qrcode.png', qrCodeImage)
  .replace('../../assets/upi.png', upiImage)
  .replace('../../assets/card.png', cardImage)

const aboutContent = aboutHtml
  .replace(/^[\s\S]*<body[^>]*>/i, '')
  .replace(/<\/body>[\s\S]*$/i, '')
  .replace(/<header[\s\S]*?<\/header>/i, '')
  .replace(/<script[\s\S]*?<\/script>/gi, '')

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home.html" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about/about.html" element={<AboutPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

function HomePage() {
  useEffect(() => {
    const offerSlider = document.getElementById('offerSlider')
    if (!offerSlider) return undefined

    const offerSlides = offerSlider.querySelectorAll('.offer-slide')
    const offerDots = offerSlider.querySelectorAll('.offer-dot')
    let offerIndex = 0
    let offerTimer

    function goToOfferSlide(index) {
      offerSlides.forEach((slide) => slide.classList.remove('is-active'))
      offerDots.forEach((dot) => dot.classList.remove('is-active'))
      offerSlides[index]?.classList.add('is-active')
      offerDots[index]?.classList.add('is-active')
      offerIndex = index
    }

    function startOfferAutoplay() {
      clearInterval(offerTimer)
      offerTimer = setInterval(() => {
        goToOfferSlide((offerIndex + 1) % offerSlides.length)
      }, 2000)
    }

    function stopOfferAutoplay() {
      clearInterval(offerTimer)
    }

    const dotHandlers = Array.from(offerDots, (dot) => {
      const handleClick = () => {
        goToOfferSlide(Number(dot.dataset.index))
        startOfferAutoplay()
      }
      dot.addEventListener('click', handleClick)
      return { dot, handleClick }
    })

    offerSlider.addEventListener('mouseenter', stopOfferAutoplay)
    offerSlider.addEventListener('mouseleave', startOfferAutoplay)
    offerSlider.addEventListener('focusin', stopOfferAutoplay)
    offerSlider.addEventListener('focusout', startOfferAutoplay)
    startOfferAutoplay()

    return () => {
      stopOfferAutoplay()
      dotHandlers.forEach(({ dot, handleClick }) => dot.removeEventListener('click', handleClick))
      offerSlider.removeEventListener('mouseenter', stopOfferAutoplay)
      offerSlider.removeEventListener('mouseleave', startOfferAutoplay)
      offerSlider.removeEventListener('focusin', stopOfferAutoplay)
      offerSlider.removeEventListener('focusout', startOfferAutoplay)
    }
  }, [])

  return (
    <div className="home-page">
      <Header />
      <div dangerouslySetInnerHTML={{ __html: homeContent }} />
    </div>
  )
}

function AboutPage() {
  return (
    <div className="about-page">
      <Header />
      <div dangerouslySetInnerHTML={{ __html: aboutContent }} />
    </div>
  )
}

export default App
