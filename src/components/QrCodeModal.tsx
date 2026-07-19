/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, QrCode, Sparkles, Download, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  appUrl: string;
}

export default function QrCodeModal({ isOpen, onClose, appUrl }: QrCodeModalProps) {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  // Generate dynamic QR URL using qrserver.com
  const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(appUrl || window.location.href)}&color=5c1d9b&bgcolor=ffffff&qzone=1`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" id="qr-modal-backdrop">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative bg-white/95 backdrop-blur-md rounded-[2rem] shadow-2xl max-w-sm w-full p-6 text-center border border-purple-100 animate-scale-up" id="qr-modal-container">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-purple-50 text-purple-400 hover:text-[#5c1d9b] transition-colors cursor-pointer"
          id="qr-modal-close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="space-y-6 pt-4" id="qr-modal-content">
          <div className="h-12 w-12 rounded-full bg-[#5c1d9b]/10 text-[#5c1d9b] flex items-center justify-center mx-auto">
            <QrCode className="h-6 w-6" />
          </div>
          
          <div>
            <h3 className="text-xl font-display font-extrabold text-[#2D1B4D]">Scan QR Digital Menu</h3>
            <p className="text-xs text-purple-400 font-sans mt-1.5 leading-relaxed">
              Place this QR Code on dining tables, packaging, or brochures for instant contactless menu access on smartphone browsers.
            </p>
          </div>

          {/* QR Frame with glowing effects */}
          <div className="relative p-4 bg-purple-50/50 rounded-3xl border border-purple-100 w-60 h-60 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 border-2 border-dashed border-[#facc15]/30 rounded-3xl animate-spin-slow" />
            <img
              src={qrDataUrl}
              alt="Chession Digital Menu QR Code"
              referrerPolicy="no-referrer"
              className="w-48 h-48 rounded-xl bg-white p-2 shadow-sm relative z-10"
            />
          </div>

          {/* Copy Link Button */}
          <div className="space-y-2">
            <p className="text-[10px] text-purple-400 font-sans truncate px-4">
              {appUrl || window.location.href}
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-2.5 px-4 bg-purple-50 hover:bg-purple-100/80 text-purple-700 hover:text-[#5c1d9b] rounded-full text-xs font-sans font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <a
                href={qrDataUrl}
                download="chession-menu-qr.png"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 bg-[#5c1d9b] hover:bg-[#3b0764] text-white rounded-full text-xs font-sans font-bold transition-all flex items-center justify-center space-x-1.5"
              >
                <Download className="h-3.5 w-3.5 text-[#facc15]" />
                <span>Save QR</span>
              </a>
            </div>
          </div>

          <p className="text-[10px] font-sans font-semibold text-[#ca8a04] flex items-center justify-center space-x-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Scan to order on WhatsApp instantly</span>
          </p>
        </div>

      </div>
    </div>
  );
}
