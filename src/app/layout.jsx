import '../index.css';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';
import { AuthProvider } from '@/contexts/AuthContext';
import { Mountain } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Manjaro - Authentic local experiences',
  description: 'Authentic local experiences across Africa and the Caribbean.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <AuthModal />
            <main className="flex-grow">
              {children}
            </main>
            <footer className="bg-brand-earth text-white py-12 px-6">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Mountain className="w-8 h-8 text-brand-teal" />
                    <h3 className="font-serif text-2xl">Manjaro</h3>
                  </div>
                  <p className="text-white/70 text-sm">
                    Authentic local experiences across Africa and the Caribbean.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-4">Company</h4>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                    <li><Link href="/safety" className="hover:text-white">Safety</Link></li>
                    <li><Link href="/emergency" className="hover:text-white">Emergency Support</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4">Support</h4>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li><Link href="/support" className="hover:text-white">Help Center</Link></li>
                    <li><Link href="/support" className="hover:text-white">Contact</Link></li>
                    <li><Link href="/partner/onboarding" className="text-brand-teal font-bold hover:text-white">Become a Partner</Link></li>
                  </ul>
                </div>
              </div>
              <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
                <p>© 2026 Manjaro. All rights reserved.</p>
                <div className="flex gap-6">
                  <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
                </div>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
