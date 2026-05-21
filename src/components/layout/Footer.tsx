import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const logoUrl = "https://storage.googleapis.com/dala-prod-public-storage/attachments/ab1da22d-5cd6-4d1d-8bd6-481183c231d1/1779221220588_Tuma_Fundi_Logo_Updated.jpeg";

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}\
          <div className="space-y-6">
            <Link to="/" className="flex items-center group">
              <img 
                src={logoUrl} 
                alt="Tuma Fundi Logo" 
                className="h-16 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Connecting households and businesses with the most trusted, verified artisans across Kenya. Quality guaranteed.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-slate-800 hover:bg-primary transition-colors hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-800 hover:bg-primary transition-colors hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-800 hover:bg-primary transition-colors hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/marketplace" className="hover:text-primary transition-colors">Find a Fundi</Link></li>
              <li><Link to="/booking?type=emergency" className="hover:text-primary transition-colors">Emergency Service</Link></li>
              <li><Link to="/subscriptions" className="hover:text-primary transition-colors">Membership Plans</Link></li>
              <li><Link to="/register" className="hover:text-primary transition-colors">Register as Fundi</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">My Dashboard</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Trust & Verification</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>support@tumafundi.com</span>
              </li>
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Westlands, Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} Tuma Fundi. All rights reserved.</p>
          <div className="flex gap-6">
            <p className="flex items-center gap-1 font-medium text-slate-500">Verified Skills on Demand</p>
          </div>
        </div>
      </div>
    </footer>
  );
};