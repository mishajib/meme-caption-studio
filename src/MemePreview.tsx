import { useEffect, useRef } from 'react';

interface MemePreviewProps {
  image: string | null;
  topText: string;
  bottomText: string;
  fontSize: number;
  textColor: string;
}

const MemePreview = ({ image, topText, bottomText, fontSize, textColor }: MemePreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load the image
    const img = new Image();
    img.crossOrigin = "anonymous"; // Handle CORS if needed
    img.src = image;
    
    img.onload = () => {
      // Set canvas size to match image size
      canvas.width = img.width;
      canvas.height = img.height;

      // 1. Draw the image as background
      ctx.drawImage(img, 0, 0);

      // 2. Setup text style
      ctx.fillStyle = textColor;
      ctx.strokeStyle = 'black'; // Outline for readability
      ctx.lineWidth = Math.floor(fontSize / 4); // Proportional stroke
      ctx.textAlign = 'center';
      ctx.font = `bold ${fontSize}px sans-serif`;

      // 3. Draw Top Text
      ctx.textBaseline = 'top';
      // Simple logic: draw text at top margin
      ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 20);
      ctx.fillText(topText.toUpperCase(), canvas.width / 2, 20);

      // 4. Draw Bottom Text
      ctx.textBaseline = 'bottom';
      ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
      ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
    };
  }, [image, topText, bottomText, fontSize, textColor]);

  return (
    <div className="preview-container">
      {image ? (
        <canvas ref={canvasRef} />
      ) : (
        <div className="placeholder">Upload an image to see preview</div>
      )}
    </div>
  );
};

export default MemePreview;
