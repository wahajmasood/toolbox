import { useParams } from 'react-router-dom'
import './ChitPage.css'

export default function ChitPage() {
  const { chitName } = useParams()

  // Define content for each chit using slug as the key
  const chitContent = {
    'cube000': {
      title: 'Cube000',
      slug: 'cube000',
      description: 'This is the Cube000 chit from the toolbox.',
      details: 'Add specific information about Cube000 here.'
    },
    'cube001': {
      title: 'Cube001',
      slug: 'cube001',
      description: 'This is the Cube001 chit from the toolbox.',
      details: 'Add specific information about Cube001 here.'
    },
    'cube002': {
      title: 'Cube002',
      slug: 'cube002',
      description: 'This is the Cube002 chit from the toolbox.',
      details: 'Add specific information about Cube002 here.'
    },
    'cube003': {
      title: 'Cube003',
      slug: 'cube003',
      description: 'This is the Cube003 chit from the toolbox.',
      details: 'Add specific information about Cube003 here.'
    },
    'cube004': {
      title: 'Cube004',
      slug: 'cube004',
      description: 'This is the Cube004 chit from the toolbox.',
      details: 'Add specific information about Cube004 here.'
    },
    'cube005': {
      title: 'Cube005',
      slug: 'cube005',
      description: 'This is the Cube005 chit from the toolbox.',
      details: 'Add specific information about Cube005 here.'
    },
    'cube006': {
      title: 'Cube006',
      slug: 'cube006',
      description: 'This is the Cube006 chit from the toolbox.',
      details: 'Add specific information about Cube006 here.'
    },
    'cube007': {
      title: 'Cube007',
      slug: 'cube007',
      description: 'This is the Cube007 chit from the toolbox.',
      details: 'Add specific information about Cube007 here.'
    },
    'stories': {
      title: 'Stories',
      slug: 'stories',
      description: 'Explore the narratives that shape your identity and experiences.',
      details: 'Stories are the frameworks through which we understand our lives and make sense of our experiences.'
    },
    'resistance': {
      title: 'Resistance',
      slug: 'resistance',
      description: 'Understanding the barriers that hold you back from growth.',
      details: 'Resistance manifests as the internal obstacles that prevent us from moving forward and achieving our goals.'
    },
    'core-beliefs': {
      title: 'Core Beliefs',
      slug: 'core-beliefs',
      description: 'The fundamental beliefs that guide your thoughts and actions.',
      details: 'Core beliefs are the deeply held convictions that shape how we perceive ourselves and the world around us.'
    },
    'readiness': {
      title: 'Readiness',
      slug: 'readiness',
      description: 'Assessing your preparedness for change and transformation.',
      details: 'Readiness is the state of being prepared mentally, emotionally, and physically for new challenges and opportunities.'
    },
    'subconsciousness': {
      title: 'Subconsciousness',
      slug: 'subconsciousness',
      description: 'Diving into the hidden layers of your mind and awareness.',
      details: 'The subconscious mind holds patterns, memories, and beliefs that influence our behavior without conscious awareness.'
    },
    'self-talk': {
      title: 'Self Talk',
      slug: 'self-talk',
      description: 'The internal dialogue that shapes your self-perception.',
      details: 'Self talk is the ongoing internal conversation that influences our emotions, behaviors, and overall mental well-being.'
    },
    'wounds': {
      title: 'Wounds',
      slug: 'wounds',
      description: 'Acknowledging and healing past emotional injuries.',
      details: 'Wounds represent the emotional pain and trauma from past experiences that continue to affect our present lives.'
    },
    'values': {
      title: 'Values',
      slug: 'values',
      description: 'The principles and standards that guide your decisions.',
      details: 'Values are the core principles that define what matters most to us and guide our choices and behaviors.'
    }
  }

  const content = chitContent[chitName] || {
    title: chitName || 'Unknown',
    slug: 'unknown',
    description: 'Information not found.',
    details: ''
  }

  return (
    <div className="chit-page">
      <nav className="chit-nav">
        <div className="nav-content">
          <div className="logo">Toolbox</div>
          <button className="close-button" onClick={() => window.close()}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>

      <div className="chit-container">
        <div className="chit-hero">
          <div className="chit-badge">{content.slug}</div>
          <h1 className="chit-title">{content.title}</h1>
          <p className="chit-description">{content.description}</p>
        </div>

        <div className="chit-body">
          <section className="content-section">
            <div className="section-header">
              <div className="section-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h2>Overview</h2>
            </div>
            <p className="section-content">{content.details}</p>
          </section>

          <section className="content-section">
            <div className="section-header">
              <div className="section-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <h2>Key Insights</h2>
            </div>
            <div className="insights-grid">
              <div className="insight-card">
                <h3>Understanding</h3>
                <p>Gain deeper awareness of this aspect of your personal development.</p>
              </div>
              <div className="insight-card">
                <h3>Application</h3>
                <p>Learn how to apply these concepts in your daily life and growth journey.</p>
              </div>
              <div className="insight-card">
                <h3>Transformation</h3>
                <p>Discover pathways for meaningful change and personal evolution.</p>
              </div>
            </div>
          </section>

          <section className="content-section">
            <div className="section-header">
              <div className="section-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              </div>
              <h2>Reflection Points</h2>
            </div>
            <ul className="reflection-list">
              <li>How does this concept show up in your life?</li>
              <li>What patterns do you notice?</li>
              <li>What would you like to explore further?</li>
              <li>How can you integrate this awareness?</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

