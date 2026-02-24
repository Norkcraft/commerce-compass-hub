import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0b1120] text-slate-300">
      <div className="container mx-auto grid gap-8 px-4 py-10 sm:py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="md:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-extrabold text-white">ijmb.ng</h3>
          <p className="mt-4 text-sm text-slate-400">
            Official website and portal for IJMB registration, study centre information, and direct entry guidance.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Program</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/about-ijmb" className="transition hover:text-white">About IJMB</Link></li>
            <li><Link to="/ijmb-study-centres" className="transition hover:text-white">Centers</Link></li>
            <li><Link to="/ijmb-requirements" className="transition hover:text-white">Requirements</Link></li>
            <li><Link to="/ijmb-subject-combination" className="transition hover:text-white">Subject Combination</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/ijmb-registration-2026-27" className="transition hover:text-white">Register</Link></li>
            <li><Link to="/registration-info" className="transition hover:text-white">Registration Info</Link></li>
            <li><Link to="/faq" className="transition hover:text-white">Faq</Link></li>
            <li><Link to="/buy-ijmb-textbooks" className="transition hover:text-white">Buy IJMB Textbooks</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h4>
          <p className="mt-3 text-sm">Km 38 Lagos-Abeokuta Expressway, 112104 Ota Nigeria.</p>
          <p className="mt-2 text-sm">+234 902 152 7413</p>
          <Link to="/contact-us" className="mt-3 inline-block text-sm font-semibold text-emerald-300 hover:text-emerald-200">Visit Contact Page</Link>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-500">
        Copyright © 2025 Learn Plus Edu. All rights reserved. By Vtech Consults
      </div>
    </footer>
  );
};

export default Footer;
