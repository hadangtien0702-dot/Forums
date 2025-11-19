
import React from 'react';

const FooterV1: React.FC = () => {
  const footerLinks = {
    'Product': ['Features', 'Integrations', 'Pricing', 'FAQ'],
    'Company': ['About Us', 'Careers', 'Blog', 'Contact'],
    'Resources': ['Documentation', 'Community', 'Help Center', 'Partners'],
    'Legal': ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'],
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">F</div>
                <span className="text-white font-bold text-lg">Forums</span>
            </div>
            <p className="text-sm text-slate-500">&copy; 2024 Forums Inc. All rights reserved.</p>
            <div className="flex space-x-4">
                {/* Social Icons Placeholders */}
                <div className="h-5 w-5 bg-slate-700 rounded-full hover:bg-slate-600 cursor-pointer"></div>
                <div className="h-5 w-5 bg-slate-700 rounded-full hover:bg-slate-600 cursor-pointer"></div>
                <div className="h-5 w-5 bg-slate-700 rounded-full hover:bg-slate-600 cursor-pointer"></div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterV1;
