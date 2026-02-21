import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
                            <Package className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-bold text-xl text-gray-900 tracking-tight">ShareFlow</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            GitHub
                        </a>
                        <div className="h-4 w-px bg-gray-300"></div>
                        <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
