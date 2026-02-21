import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { getFileDetails } from '../api/files';
import { FileDown, Calendar, HardDrive, ShieldCheck, Download, AlertTriangle } from 'lucide-react';

export default function DownloadPage() {
    const { uuid } = useParams();
    const [fileData, setFileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFile = async () => {
            try {
                setLoading(true);
                // Simulate waiting for data
                const response = await getFileDetails(uuid);
                setFileData(response.data);
            } catch (err) {
                setError('File not found or link expired.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (uuid) {
            fetchFile();
        }
    }, [uuid]);

    const handleDownload = () => {
        // In a real app, this would trigger a file download from the URL
        alert(`Downloading ${fileData.fileName}... (Demo)`);
    };

    return (
        <Layout>
            <div className="w-full max-w-lg">
                <Card className="text-center">
                    {loading ? (
                        <div className="py-12 space-y-4">
                            <div className="animate-pulse flex flex-col items-center">
                                <div className="rounded-full bg-gray-200 h-16 w-16 mb-4"></div>
                                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            </div>
                            <p className="text-gray-400 text-sm">Fetching file details...</p>
                        </div>
                    ) : error ? (
                        <div className="py-8">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
                            <p className="text-gray-500 mb-6">{error}</p>
                            <Button variant="primary" onClick={() => window.location.href = '/'}>
                                Go Home
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-blue-50 mb-6 ring-8 ring-blue-50/50">
                                <FileDown className="h-10 w-10 text-blue-600" />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                {fileData.fileName}
                            </h2>
                            <p className="text-gray-500 text-sm mb-8 uppercase tracking-wide font-semibold">
                                Ready to download
                            </p>

                            <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left space-y-3 border border-gray-100">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center text-gray-600">
                                        <HardDrive className="h-4 w-4 mr-2" />
                                        <span>Size</span>
                                    </div>
                                    <span className="font-medium text-gray-900">{(fileData.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                                </div>
                                <div className="h-px bg-gray-200 w-full"></div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center text-gray-600">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        <span>Uploaded</span>
                                    </div>
                                    <span className="font-medium text-gray-900">{new Date(fileData.uploadDate).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <Button onClick={handleDownload} size="lg" className="w-full shadow-lg shadow-blue-600/20 mb-4">
                                <Download className="h-5 w-5 mr-2" />
                                Download File
                            </Button>

                            <div className="flex items-center justify-center text-xs text-green-600 font-medium bg-green-50 py-2 px-3 rounded-full inline-flex">
                                <ShieldCheck className="h-3 w-3 mr-1.5" />
                                Virus Scanned & Secure
                            </div>
                        </>
                    )}
                </Card>
            </div>
        </Layout>
    );
}
