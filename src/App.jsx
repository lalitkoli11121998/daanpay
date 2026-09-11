import { BrowserRouter, Route, Routes } from 'react-router-dom'
import badrinathImage from './pages/features/temples/badrinath/images/badrinath.jpg'
import dwarkadhishImage from './pages/features/temples/dwarkadhish/images/dwarkadhish.jpeg'
import jagannathImage from './pages/features/temples/jagannathPuri/images/jagannath.jpg'
import rameshwaramImage from './pages/features/temples/rameshwaram/images/rameshwaram.jpg'
import homeHtml from './pages/Home/home.html?raw'
import './pages/Home/home.css'
import './App.css'

const homeContent = homeHtml
  .replace(/^[\s\S]*<body[^>]*>/i, '')
  .replace(/<\/body>[\s\S]*$/i, '')
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace('temples/rameshwaram/images/rameshwaram.jpg', rameshwaramImage)
  .replace('temples/badrinath/images/badrinath.jpg', badrinathImage)
  .replace('temples/jagannath/images/jagannath.jpg', jagannathImage)
  .replace('temples/dwarkadish/images/dwarkadish.jpg', dwarkadhishImage)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

function HomePage() {
  return (
    <div className="home-page" dangerouslySetInnerHTML={{ __html: homeContent }} />
  )
}

export default App
