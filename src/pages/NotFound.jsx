import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Ghost } from 'lucide-react';

export default function NotFound() {
    return (
        <Layout>
            <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 mb-6">
                    <Ghost className="h-12 w-12 text-gray-400" />
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">404</h1>
                <p className="text-lg text-gray-500 mb-8">
                    The page you are looking for does not exist.
                </p>
                <Link to="/">
                    <Button>Go back home</Button>
                </Link>
            </div>
        </Layout>
    );
}
