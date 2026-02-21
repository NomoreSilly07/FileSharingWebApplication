import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
            <Navbar />
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                {children}
            </main>
            <Footer />
        </div>
    );
}
