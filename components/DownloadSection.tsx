import React from 'react';
import { Download, Monitor, Apple, Box, CheckCircle2, Shield } from 'lucide-react';

/**
 * DownloadSection Component
 * Displays download buttons for Windows, Mac, and Linux installers
 */
export const DownloadSection: React.FC = () => {
  const APP_VERSION = '1.0.0';
  // Use environment variable for API endpoint, fallback to relative path for production
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

  /**
   * Handle download button click
   */
  const handleDownload = async (platform: 'windows' | 'mac' | 'linux') => {
    try {
      // In production, this would point to your Cloudflare Worker
      const downloadUrl = `${API_BASE_URL}/api/download?platform=${platform}`;
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again or contact support.');
    }
  };

  return (
    <section id="download" className="py-24 bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-600/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-accent-500/10 px-4 py-1.5 text-sm font-medium text-accent-400 ring-1 ring-inset ring-accent-500/30 mb-6 backdrop-blur-sm">
            <Download className="w-4 h-4 mr-2" />
            Desktop Application
          </div>
          <h2 className="text-4xl font-extrabold mb-4 sm:text-5xl">
            Download ApexRepairBench
          </h2>
          <p className="text-xl text-brand-200 max-w-2xl mx-auto">
            Install our powerful desktop application and start managing your repair shop offline with automatic cloud sync.
          </p>
          <p className="mt-4 text-sm text-brand-300">
            Current Version: <span className="font-bold text-accent-400">{APP_VERSION}</span>
          </p>
        </div>

        {/* Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Windows */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-accent-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-500/20">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-brand-800/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent-500/20 transition-colors">
                <Monitor className="w-10 h-10 text-accent-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Windows</h3>
              <p className="text-brand-300 mb-6 text-sm">
                Windows 10 or later (64-bit)
              </p>
              <button
                onClick={() => handleDownload('windows')}
                className="w-full px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-accent-500/30 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download for Windows
              </button>
              <p className="text-xs text-brand-400 mt-3">
                ApexRepairBench-Setup.exe
              </p>
            </div>
          </div>

          {/* macOS */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-accent-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-500/20">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-brand-800/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent-500/20 transition-colors">
                <Apple className="w-10 h-10 text-accent-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">macOS</h3>
              <p className="text-brand-300 mb-6 text-sm">
                macOS 10.15 or later (Intel & Apple Silicon)
              </p>
              <button
                onClick={() => handleDownload('mac')}
                className="w-full px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-accent-500/30 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download for macOS
              </button>
              <p className="text-xs text-brand-400 mt-3">
                ApexRepairBench.dmg
              </p>
            </div>
          </div>

          {/* Linux */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-accent-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-500/20">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-brand-800/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent-500/20 transition-colors">
                <Box className="w-10 h-10 text-accent-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Linux</h3>
              <p className="text-brand-300 mb-6 text-sm">
                Ubuntu 20.04+ or equivalent (64-bit)
              </p>
              <button
                onClick={() => handleDownload('linux')}
                className="w-full px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-accent-500/30 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download for Linux
              </button>
              <p className="text-xs text-brand-400 mt-3">
                ApexRepairBench.AppImage
              </p>
            </div>
          </div>
        </div>

        {/* Trial Information */}
        <div className="bg-gradient-to-r from-accent-500/10 to-brand-800/30 backdrop-blur-md rounded-2xl p-8 border border-accent-500/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-accent-400" />
                7-Day Free Trial Included
              </h3>
              <p className="text-brand-200">
                Every download includes a full-featured 7-day trial. No credit card required. Experience the complete platform before subscribing.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                href="#pricing"
                className="inline-flex items-center px-6 py-3 bg-white text-brand-900 font-bold rounded-xl hover:bg-brand-50 transition-all shadow-lg"
              >
                View Pricing Plans
              </a>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-brand-200">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white mb-1">Local-First Architecture</h4>
              <p className="text-sm">Works offline with automatic cloud sync when connected</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white mb-1">One-Click Updates</h4>
              <p className="text-sm">Automatic updates keep your software current and secure</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white mb-1">Encrypted Data Storage</h4>
              <p className="text-sm">Your customer data stays secure with end-to-end encryption</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white mb-1">Multi-Device Support</h4>
              <p className="text-sm">Install on multiple devices with a single license</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
