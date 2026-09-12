import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useLayoutEffect } from 'react'
import badrinathImage from './assets/badrinath.jpg'
import dwarkadhishImage from './assets/dwarkadhish.jpeg'
import jagannathImage from './assets/jagannath.jpg'
import rameshwaramImage from './assets/rameshwaram.jpg'
import qrCodeImage from './assets/qrcode.png'
import upiImage from './assets/upi.png'
import cardImage from './assets/card.png'
import daanpayLogo from './assets/daanpay-logo.png'
import templesData from './data/temples.json'
import homeHtml from './pages/Home/home.html?raw'
import aboutHtml from './pages/about/about.html?raw'
import Header from './Components/Header'
import TemplePage from './pages/temples/temple'
import './pages/Home/home.css'
import './pages/about/about.css'
import './App.css'

const homeContent = homeHtml
  .replace(/^[\s\S]*<body[^>]*>/i, '')
  .replace(/<\/body>[\s\S]*$/i, '')
  .replace(/<header[\s\S]*?<\/header>/i, '')
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace('../../assets/rameshwaram.jpg', rameshwaramImage)
  .replace('../../assets/badrinath.jpg', badrinathImage)
  .replace('../../assets/jagannath.jpg', jagannathImage)
  .replace('../../assets/dwarkadhish.jpeg', dwarkadhishImage)
  .replace('../../assets/qrcode.png', qrCodeImage)
  .replace('../../assets/upi.png', upiImage)
  .replace('../../assets/card.png', cardImage)

const aboutContent = aboutHtml
  .replace(/^[\s\S]*<body[^>]*>/i, '')
  .replace(/<\/body>[\s\S]*$/i, '')
  .replace(/<header[\s\S]*?<\/header>/i, '')
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace('../../assets/daanpay-logo.png', daanpayLogo)

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home.html" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about/about.html" element={<AboutPage />} />
        <Route path="/temples/:templeId" element={<TemplePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function HomePage() {
  const navigate = useNavigate()

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

  useEffect(() => {
    const searchInput = document.querySelector('.search-input')
    const searchButton = document.querySelector('.search-row .btn')
    if (!searchInput || !searchButton) return undefined

    function showSearchMessage(message) {
      let toast = document.querySelector('.toast')
      if (!toast) {
        toast = document.createElement('div')
        toast.className = 'toast'
        document.body.appendChild(toast)
      }
      toast.textContent = message
      toast.classList.add('show')
      window.clearTimeout(showSearchMessage.timer)
      showSearchMessage.timer = window.setTimeout(() => toast.classList.remove('show'), 2200)
    }

    function runSearch(event) {
      if (event?.type === 'keydown' && event.key !== 'Enter') return
      event?.preventDefault()
      const query = searchInput.value.trim().toLowerCase()
      if (!query) {
        showSearchMessage('Enter a temple name, deity, or city to search.')
        searchInput.focus()
        return
      }

      const temple = templesData.find((item) => [item.id, item.name, item.location, item.deity, item.type]
        .some((value) => value.toLowerCase().includes(query)))

      if (temple) {
        navigate(`/temples/${temple.id}`)
      } else {
        showSearchMessage(`No temple found for "${searchInput.value.trim()}".`)
      }
    }

    searchButton.addEventListener('click', runSearch)
    searchInput.addEventListener('keydown', runSearch)

    const chipHandlers = Array.from(document.querySelectorAll('.chip-row .chip'), (chip) => {
      const handleChipClick = () => {
        const query = chip.textContent.trim().toLowerCase()
        const temple = templesData.find((item) => [item.id, item.name, item.location, item.deity, item.type]
          .some((value) => value.toLowerCase().includes(query)))

        if (temple) {
          navigate(`/temples/${temple.id}`)
        }
      }
      chip.addEventListener('click', handleChipClick)
      return { chip, handleChipClick }
    })

    return () => {
      searchButton.removeEventListener('click', runSearch)
      searchInput.removeEventListener('keydown', runSearch)
      chipHandlers.forEach(({ chip, handleChipClick }) => chip.removeEventListener('click', handleChipClick))
    }
  }, [navigate])

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
