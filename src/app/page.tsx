'use client'; // This directive is necessary for client-side interactivity

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
// Or, if you prefer rendering to canvas:
// import { QRCodeCanvas } from 'qrcode.react';

export default function Home() {
  const [text, setText] = useState('');
  const [qrValue, setQrValue] = useState('');

  const generateQrCode = () => {
    setQrValue(text);
  };

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
        <button
          onClick={generateQrCode}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Generate QR Code
        </button>

        {qrValue && (
          <div className="mt-8 flex justify-center">
            <QRCodeSVG // Change this to QRCodeSVG
  value={qrValue}
  size={256}
  level="H"
  // No need for renderAs="svg" when using QRCodeSVG directly
/>
          </div>
        )}

        {qrValue && (
          <div className="mt-4 text-center text-gray-600 text-sm">
            Scan the QR code above with your phone!
          </div>
        )}
      </div>
    </div>
  );
}