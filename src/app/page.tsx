'use client';

import React, { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
// Import icons from @heroicons/react
import { SunIcon, MoonIcon, DownloadIcon } from '@heroicons/react/solid';

export default function Home() {
  const [text, setText] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [qrSize, setQrSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const qrCodeRef = useRef<HTMLCanvasElement>(null);

  // State for dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // --- Dark Mode Logic ---
  // Load theme preference from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') { // Ensure running in browser
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  // Apply theme class to HTML element and save to localStorage when theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') { // Ensure running in browser
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  // --- End Dark Mode Logic ---


  // Live preview for QR code generation
  useEffect(() => {
    if (text || qrValue) { // Only update if text is not empty or if qrValue was previously set
      setQrValue(text);
    }
  }, [text]);

  const downloadQrCode = () => {
    if (qrCodeRef.current && qrValue) { // Ensure QR code is generated before attempting download
      const canvas = qrCodeRef.current;
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Please enter text to generate a QR code first!');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center p-4 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>

      {/* Header with Logo and Dark Mode Toggle */}
      <header className="w-full max-w-4xl flex justify-between items-center py-6 px-4 md:px-0">
        {/* Simple Text Logo (replace with your image logo if you have one) */}
        <div className="flex items-center space-x-2">
          {/* You can replace this emoji with an <img> tag pointing to your logo file */}
          <span className="text-4xl">🔗</span>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            QR Wizard
          </h1>
        </div>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md transition-colors duration-300"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <SunIcon className="h-6 w-6" /> // Sun icon for dark mode
          ) : (
            <MoonIcon className="h-6 w-6" /> // Moon icon for light mode
          )}
        </button>
      </header>

      {/* Main Content Area */}
      <div className={`bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md md:max-w-4xl flex flex-col md:flex-row gap-8 transition-colors duration-300`}>

        {/* Input and Controls Column */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Generate Your QR Code</h2>

          {/* QR Content Input */}
          <div className="mb-6">
            <label htmlFor="qrInput" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Enter text or URL:
            </label>
            <input
              type="text"
              id="qrInput"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 transition-colors duration-200"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., Hello World or https://example.com"
            />
          </div>

          {/* Customization Options Grid */}
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Customization</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="qrSize" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Size (px):
              </label>
              <input
                type="number"
                id="qrSize"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 transition-colors duration-200"
                value={qrSize}
                onChange={(e) => setQrSize(Math.max(50, Math.min(1024, parseInt(e.target.value) || 50)))} // Min 50, Max 1024
                min="50"
                max="1024"
              />
            </div>
            <div>
              <label htmlFor="fgColor" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                QR Color:
              </label>
              <input
                type="color"
                id="fgColor"
                className="w-full h-10 border rounded cursor-pointer p-1 dark:border-gray-600"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2"> {/* Make background color span full width on small screens */}
              <label htmlFor="bgColor" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Background Color:
              </label>
              <input
                type="color"
                id="bgColor"
                className="w-full h-10 border rounded cursor-pointer p-1 dark:border-gray-600"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* QR Code Display and Download Column */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 pt-8 md:pt-0">
          {qrValue ? (
            <>
              <QRCodeCanvas
                value={qrValue}
                size={qrSize}
                level="H"
                fgColor={fgColor}
                bgColor={bgColor}
                includeMargin={true}
                ref={qrCodeRef}
              />
              <div className="mt-4 text-center text-gray-600 dark:text-gray-400 text-sm">
                Scan the QR code above with your phone!
              </div>
              <button
                onClick={downloadQrCode}
                className="mt-6 flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-300 w-full transition-colors duration-200"
              >
                <DownloadIcon className="h-5 w-5" />
                <span>Download QR Code (PNG)</span>
              </button>
            </>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p className="text-lg mb-2">Start typing to generate your QR Code!</p>
              <p className="text-sm">The QR code will appear here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer (Optional) */}
      <footer className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        Built with Next.js, React, and Tailwind CSS.
      </footer>
    </div>
  );
}