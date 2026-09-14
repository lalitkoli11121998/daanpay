import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import fallbackImage from '../../assets/hero.png'
import badrinathImage from '../../assets/badrinath.jpg'
import dwarkadhishImage from '../../assets/dwarkadhish.jpeg'
import jagannathImage from '../../assets/jagannath.jpg'
import ramMandirImage from '../../assets/rammandir.jpg'
import rameshwaramImage from '../../assets/rameshwaram.jpg'
import templesData from '../../data/temples.json'
import Header from '../../Components/Header'
import './temples.css'

const images = {
  'hero.png': fallbackImage,
  'badrinath.jpg': badrinathImage,
  'dwarkadhish.jpeg': dwarkadhishImage,
  'jagannath.jpg': jagannathImage,
  'rammandir.jpg': ramMandirImage,
  'rameshwaram.jpg': rameshwaramImage,
}

const PAGE_SIZE = 12

function TemplesPage() {
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams] = useSearchParams()
  const selectedState = searchParams.get('state') || ''
  const filteredTemples = useMemo(() => templesData.filter((temple) => {
    const matchesState = !selectedState || temple.location.toLowerCase().includes(selectedState.toLowerCase())
    const searchText = `${temple.name} ${temple.location} ${temple.deity} ${temple.type}`.toLowerCase()
    return matchesState && searchText.includes(query.toLowerCase().trim())
  }), [query, selectedState])
  const pageCount = Math.ceil(filteredTemples.length / PAGE_SIZE)
  const visibleTemples = filteredTemples.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  useEffect(() => {
    setCurrentPage(1)
  }, [query, selectedState])

  return (
    <div className="temples-page">
      <Header />
      <div className="page-head">
        <div className="wrap"><h1>Browse verified temples</h1>
          <p>Search by name, deity, city, or temple tradition.</p>
          <div className="search-row">
            <input className="search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by temple name, deity, or city" />
          </div>
        </div>
      </div>
      <section>
        <div className="wrap">
          <div className="results-bar">
            <span className="results-count">{filteredTemples.length} temples{selectedState ? ` in ${selectedState}` : ''}</span>
          </div>
          <div className="card-row">{visibleTemples.map((temple) => <Link className="temple-card" key={temple.id} to={`/temples/${temple.id}`}>
            <div className="temple-img">
              <img src={images[temple.image] || fallbackImage} alt={temple.name} loading="lazy" />
            </div>
            <div className="temple-body">
              <h3>{temple.name}</h3>
              <div className="temple-loc">{temple.location}</div>
              <div className="temple-meta">
                <span className="verified">{temple.isMock ? 'Mock listing' : 'Verified'}</span>
                <span className="donor-count">{temple.donors}</span>
              </div>
            </div>
          </Link>)}
          </div>
          {pageCount > 1 && <div className="pagination" aria-label="Temple pages">
            <button className="btn btn-outline" type="button" onClick={() => setCurrentPage((page) => page - 1)} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {pageCount}</span>
            <button className="btn btn-outline" type="button" onClick={() => setCurrentPage((page) => page + 1)} disabled={currentPage === pageCount}>Next</button>
          </div>}
          {filteredTemples.length === 0 && <div className="empty-state"><h3>No temples found</h3><p>Try another name, city, or deity.</p><button className="btn btn-outline" onClick={() => setQuery('')}>Clear search</button></div>}
        </div>
      </section>
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="logo" style={{ marginBottom: '10px' }}>Daanpay</div>
              <p style={{ fontSize: '13.5px', color: 'var(--ink-muted)', maxWidth: '220px', lineHeight: 1.6 }}>A trusted way to donate to temples across India.</p>
            </div>
            <div>
              <h4>Platform</h4>
              <a href="/temples/temples.html">Browse temples</a>
              <a href="/#how-it-works">How it works</a>
              <a href="/about">About us</a>
            </div>
            <div>
              <h4>Support</h4>
              <a href="mailto:lalitkoli11121998@gmail.com?subject=Daanpay%20support">Contact us</a>
              <a href="#">FAQs</a>
              <a href="mailto:lalitkoli11121998@gmail.com?subject=Report%20an%20issue">Report an issue</a>
            </div>
            <div>
              <h4>Legal</h4>
                <a href="#" data-modal="terms">Terms of service</a>
                <a href="#" data-modal="privacy">Privacy policy</a>
                <a href="#" data-modal="refund">Refund policy</a>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Daanpay. All donations are processed securely.</span>
            <span>Made for devotees, everywhere.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default TemplesPage
