import './Controls.css'

export default function Controls({ wireframe, autoRotate, onToggleWireframe, onToggleAutoRotate }) {
  return (
    <div className="controls">
      <button 
        className={wireframe ? 'active' : ''}
        onClick={onToggleWireframe}
        title="Toggle Wireframe"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="3" y1="15" x2="21" y2="15"/>
          <line x1="9" y1="3" x2="9" y2="21"/>
          <line x1="15" y1="3" x2="15" y2="21"/>
        </svg>
        Wireframe
      </button>
      
      <button 
        className={autoRotate ? 'active' : ''}
        onClick={onToggleAutoRotate}
        title="Toggle Auto-Rotation"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
          <path d="M21 3v5h-5"/>
        </svg>
        Auto-Rotate
      </button>
    </div>
  )
}

