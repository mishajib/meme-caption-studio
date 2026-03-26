import { useState } from 'react'
import './App.css'
import MemePreview from './MemePreview'

function App() {
  const [image, setImage] = useState<string | null>(null)
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const [fontSize, setFontSize] = useState(40)
  const [textColor, setTextColor] = useState('#ffffff')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDownload = () => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      const link = document.createElement('a')
      link.download = 'meme.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
  }

  return (
    <div className="app-container">
      <h1 className="title">Meme Caption Studio</h1>
      
      <div className="studio-layout">
        <div className="editor-panel">
          <div className="input-group">
            <label>Upload Image</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
              id="imageInput"
            />
          </div>

          <div className="input-group">
            <label>Top Caption</label>
            <input 
              type="text" 
              value={topText} 
              onChange={(e) => setTopText(e.target.value)}
              placeholder="ENTER TOP TEXT"
            />
          </div>

          <div className="input-group">
            <label>Bottom Caption</label>
            <input 
              type="text" 
              value={bottomText} 
              onChange={(e) => setBottomText(e.target.value)}
              placeholder="ENTER BOTTOM TEXT"
            />
          </div>

          <div className="control-row">
            <div className="input-group" style={{ flex: 1 }}>
              <label>FontSize: {fontSize}px</label>
              <input 
                type="range" 
                min="20" 
                max="100" 
                step="2"
                value={fontSize} 
                onChange={(e) => setFontSize(parseInt(e.target.value))}
              />
            </div>
            
            <div className="input-group">
              <label>Color</label>
              <input 
                type="color" 
                value={textColor} 
                onChange={(e) => setTextColor(e.target.value)}
              />
            </div>
          </div>

          <button 
            className="download-btn"
            onClick={handleDownload}
            disabled={!image}
          >
            Download Meme
          </button>
        </div>

        <div className="preview-panel">
          <MemePreview 
            image={image}
            topText={topText}
            bottomText={bottomText}
            fontSize={fontSize}
            textColor={textColor}
          />
        </div>
      </div>
    </div>
  )
}

export default App
