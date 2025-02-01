import html2canvas from 'html2canvas';

export const generateImage = async (quoteText, setImageURL, selectedFont, selectedFontColor, selectedBgColor) => {
    const canvasElement = document.createElement("div");
    canvasElement.style.position = "absolute";
    canvasElement.style.left = "-9999px";
    canvasElement.innerHTML = `
      <div 
        id="quote-container"
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: ${selectedBgColor};
          color: ${selectedFontColor};
          font-family: ${selectedFont};
          font-size: 22px;
          font-weight: 600;
          padding: 24px;
          border-radius: 12px;
          text-align: center;
          max-width: 320px;
          width: 100%;
          min-height: 200px;
          line-height: 1.5;
          overflow-wrap: break-word;
          word-wrap: break-word;
          white-space: normal;
          box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
          position: relative;
        "
      >
        <div style="align-self: flex-start; font-size: 36px;">❝</div>
        <p 
          style="
            padding: 0 20px;
            max-width: 280px;
          "
        >
          ${quoteText}
        </p>
        <div style="align-self: flex-end; font-size: 36px;">❞</div>
  
        <!-- Watermark (UglyQuotes.com) -->
        <div 
          style="
            position: absolute;
            bottom: 10px;
            right: 10px;
            font-size: 12px;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.5);
          "
        >
          uglyquotes.com
        </div>
      </div>
    `;
  
    // Append to body for capturing
    document.body.appendChild(canvasElement);
  
    try {
      const canvas = await html2canvas(canvasElement, {
        backgroundColor: null,
        scale: 2,
        width: canvasElement.scrollWidth,
        height: canvasElement.scrollHeight,
      });
  
      document.body.removeChild(canvasElement);
  
      const image = canvas.toDataURL("image/png");
      setImageURL(image);
  
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };
