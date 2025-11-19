
import React from 'react';

const FooterV3: React.FC = () => {
  return (
    <footer className="bg-slate-50 text-slate-800">
      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-indigo-100 mb-8 text-lg">Join over 10,000+ users building their financial future today.</p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input 
                type="email" 
                placeholder="Enter your email address" 
                className="px-5 py-3 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-white/50 w-full"
            />
            <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-lg">
                Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links Section */}
      <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
                <h3 className="font-bold text-lg mb-4 text-indigo-600">Forums</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                    A comprehensive platform for insurance professionals to connect, calculate, and grow their business.
                </p>
            </div>
            <div className="flex justify-between md:col-span-2">
                 <div>
                    <h4 className="font-bold mb-4">Platform</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li><a href="#" className="hover:text-indigo-600">Calculators</a></li>
                        <li><a href="#" className="hover:text-indigo-600">Community</a></li>
                        <li><a href="#" className="hover:text-indigo-600">Support</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li><a href="#" className="hover:text-indigo-600">About</a></li>
                        <li><a href="#" className="hover:text-indigo-600">Team</a></li>
                        <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-bold mb-4">Connect</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li><a href="#" className="hover:text-indigo-600">Twitter</a></li>
                        <li><a href="#" className="hover:text-indigo-600">LinkedIn</a></li>
                        <li><a href="#" className="hover:text-indigo-600">Facebook</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="border-t border-slate-200 mt-12 pt-8 text-center text-sm text-slate-400">
            <p>Designed by Forums Creative Team &copy; 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterV3;
