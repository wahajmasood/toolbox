import './InfoPanel.css'

export default function InfoPanel({ selectedPart }) {
  return (
    <div className="info-panel">
      <h1>Interactive 3D Toolbox</h1>
      <div className="instructions">
        <p>
          <strong>🖱️ Left Click + Drag:</strong> Rotate
        </p>
        <p>
          <strong>🖱️ Right Click + Drag:</strong> Pan
        </p>
        <p>
          <strong>🖱️ Scroll:</strong> Zoom
        </p>
        <p>
          <strong>👆 Click on parts:</strong> Interact with toolbox
        </p>
      </div>
      {selectedPart && (
        <div className="selected-part">
          <strong>Selected:</strong> {selectedPart}
        </div>
      )}
    </div>
  )
}

