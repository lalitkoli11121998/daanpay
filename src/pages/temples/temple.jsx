import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import badrinathImage from '../../assets/badrinath.jpg'
import dwarkadhishImage from '../../assets/dwarkadhish.jpeg'
import fallbackTempleImage from '../../assets/hero.png'
import jagannathImage from '../../assets/jagannath.jpg'
import ramMandirImage from '../../assets/rammandir.jpg'
import rameshwaramImage from '../../assets/rameshwaram.jpg'
import qrPayImage from '../../assets/qrpay.jpeg'
import templesData from '../../data/temples.json'
import Header from '../../Components/Header'
import './temple.css'

const templeImages = {
    'hero.png': fallbackTempleImage,
    'rameshwaram.jpg': rameshwaramImage,
    'badrinath.jpg': badrinathImage,
    'jagannath.jpg': jagannathImage,
    'dwarkadhish.jpeg': dwarkadhishImage,
    'rammandir.jpg': ramMandirImage,
}

function TemplePage() {
    const { templeId } = useParams()
    const details = templesData.find((item) => item.id === templeId)
    const image = details ? templeImages[details.image] : undefined
    const [amount, setAmount] = useState('501')

    if (!details || !image) {
        return (
            <>
                <Header />
                <main className="temple-not-found wrap">
                    <h1>Temple not found</h1>
                    <p>We could not find that temple in our current listings.</p>
                    <Link className="btn btn-primary" to="/">Browse temples</Link>
                </main>
            </>
        )
    }

    return (
        <div className="temple-page">
            <Header />
            <div className="wrap breadcrumb">
                <Link to="/">Home</Link><span>/</span><Link to="/">Temples</Link><span>/</span><span>{details.name}</span>
            </div>

            <section className="temple-hero">
                <div className="wrap temple-hero-grid">
                    <div className="gallery-main"><img src={image} alt={details.name} /></div>
                    <div className="temple-info">
                        <h1>{details.name}</h1>
                        <div className="temple-sub"><span className="verified">Verified</span><span>{details.location}</span><span>·</span><span>{details.type}</span></div>
                        <p className="temple-desc">{details.description}</p>
                        <div className="quick-facts">
                            <div className="fact"><span>Timings</span><b>{details.timings}</b></div>
                            <div className="fact"><span>Established</span><b>{details.established}</b></div>
                            <div className="fact"><span>Presiding deity</span><b>{details.deity}</b></div>
                            <div className="fact"><span>Donor community</span><b>{details.donors}</b></div>
                        </div>
                        <a href="#offer" className="btn btn-primary jump-btn">Make an offering</a>
                    </div>
                </div>
            </section>

            <section className="about-temple"><div className="wrap"><h2>About this temple</h2><p>{details.about}</p></div></section>
            <div className="activity-strip"><div className="wrap activity-row"><span className="dot"></span><span>Devotees are offering to {details.name} today</span></div></div>

            <section className="offering-section" id="offer">
                <div className="wrap"><div className="offering-card">
                    <h2>Make your offering to {details.name}</h2>
                    <p className="sub">Every offering reaches the temple directly, with a receipt sent the instant it is confirmed.</p>
                    <div className="amount-select"><span className="amount-label">Select an amount</span><div className="amount-chips">
                        {['101', '501', '1001', '5001'].map((value) => <button key={value} className={`amount-chip${amount === value ? ' is-active' : ''}`} onClick={() => setAmount(value)}>₹{Number(value).toLocaleString('en-IN')}</button>)}
                    </div><div className="custom-amount"><span>₹</span><input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} /></div></div>
                    <div className="methods-grid"><div className="qr-panel"><div className="qr-box"><img src={qrPayImage} alt={`QR code for ${details.name} donation`} /></div><h3>Scan with any UPI app</h3><p>GPay, PhonePe, Paytm, or your bank app</p><span className="qr-status"><span className="dot"></span> Ready for your offering</span></div>
                    <div className="card-panel"><div className="card-panel-prompt"><h3>Prefer to pay by card?</h3><p>Debit and credit cards are accepted too, with instant confirmation.</p><button className="btn btn-primary" type="button">Offer ₹{Number(amount || 0).toLocaleString('en-IN')} now</button></div></div></div>
                    <div className="security-note">Handled securely by licensed payment partners · Instant digital receipt</div>
                </div></div>
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
                            <a href="../home/home.html">Browse temples</a>
                            <a href="../home/home.html#how-it-works">How it works</a>
                            <a href="../about/about.html">About us</a>
                        </div>
                        <div>
                            <h4>Support</h4>
                            <a href="#">Contact us</a>
                            <a href="#">FAQs</a>
                            <a href="#">Report an issue</a>
                        </div>
                        <div>
                            <h4>Legal</h4>
                            <a href="#">Terms of service</a>
                            <a href="#">Privacy policy</a>
                            <a href="#">Refund policy</a>
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

export default TemplePage
