'use client';

import React, { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function Home() {
  const [text, setText] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [qrSize, setQrSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');

  const qrCodeRef = useRef<HTMLCanvasElement>(null);

  // Removed unused generateQrCode function

  const downloadQrCode = () => {
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current;
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Fixed useEffect dependency array
  useEffect(() => {
    if (text || qrValue) {
      setQrValue(text);
    }
  }, [text, qrValue]); // Added qrValue to dependencies

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">QR Code Generator</h1>

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="qrInput" className="block text-gray-700 text-sm font-bold mb-2">
            Enter text or URL:
          </label>
          <input
            type="text"
            id="qrInput"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g., Hello World or https://example.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="qrSize" className="block text-gray-700 text-sm font-bold mb-2">
              Size (px):
            </label>
            <input
              type="number"
              id="qrSize"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={qrSize}
              onChange={(e) => setQrSize(Math.max(50, parseInt(e.target.value) || 50))}
              min="50"
              max="1024"
            />
          </div>
          <div>
            <label htmlFor="fgColor" className="block text-gray-700 text-sm font-bold mb-2">
              QR Color:
            </label>
            <input
              type="color"
              id="fgColor"
              className="w-full h-10 border rounded cursor-pointer"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="bgColor" className="block text-gray-700 text-sm font-bold mb-2">
              Background Color:
            </label>
            <input
              type="color"
              id="bgColor"
              className="w-full h-10 border rounded cursor-pointer"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>
        </div>

        {qrValue && (
          <div className="mt-8 flex flex-col items-center">
            <QRCodeCanvas
              value={qrValue}
              size={qrSize}
              level="H"
              fgColor={fgColor}
              bgColor={bgColor}
              includeMargin={true}
              ref={qrCodeRef}
            />
            <div className="mt-4 text-center text-gray-600 text-sm">
              Scan the QR code above with your phone!
            </div>
            <button
              onClick={downloadQrCode}
              className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Download QR Code (PNG)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}