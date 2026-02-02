// components/Footer.tsx

'use client';

import Link from 'next/link';
import { Scale, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-6 h-6" />
              <h3 className="text-xl font-bold">پاک قانون</h3>
            </div>
            <p className="text-gray-300 text-sm">
              پاکستان میں قانونی معلومات کے لیے بھروسے کا ذریعہ۔ تعلیمی مقاصد کے لیے۔
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">تیز رفتار لنکس</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tenant-disputes" className="hover:text-amber-400 transition-colors">
                  کرائے دار اختلافات
                </Link>
              </li>
              <li>
                <Link href="/salary-issues" className="hover:text-amber-400 transition-colors">
                  تنخواہ کے مسائل
                </Link>
              </li>
              <li>
                <Link href="/fir-process" className="hover:text-amber-400 transition-colors">
                  ایف آئی آر کا عمل
                </Link>
              </li>
              <li>
                <Link href="/loans" className="hover:text-amber-400 transition-colors">
                  قرضے
                </Link>
              </li>
              <li>
                <Link href="/inheritance" className="hover:text-amber-400 transition-colors">
                  وراثت
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">رابطہ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@paklegal.pk" className="hover:text-amber-400">
                  info@paklegal.pk
                </a>
              </li>
              <li className="flex gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+923001234567" className="hover:text-amber-400">
                  +92-300-XXXXXXX
                </a>
              </li>
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Karachi, Pakistan</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">قانونی</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-amber-400 transition-colors">
                  رازداری کی پالیسی
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-400 transition-colors">
                  شرائط و ضوابط
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-amber-400 transition-colors">
                  رعایت کنندہ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-sm text-gray-400">
            © {currentYear} پاک قانون۔ تمام حقوق محفوظ ہیں۔ | This is an educational platform, not a substitute for legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
