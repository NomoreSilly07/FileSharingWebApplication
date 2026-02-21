import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { FileDropzone } from '../components/upload/FileDropzone';
import { ShareLinkBox } from '../components/upload/ShareLinkBox';
import { ProgressBar } from '../components/ui/ProgressBar';
import { uploadFile } from '../api/files';
import { FileText, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Home() {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [shareLink, setShareLink] = useState(null);
    const [error, setError] = useState(null);

    const handleFileSelect = (selectedFile) => {
        setFile(selectedFile);
        setError(null);
        setShareLink(null);
        setUploadProgress(0);
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        setError(null);

        try {
            const response = await uploadFile(file, (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
            });

            setShareLink(response.data.url);
            setFile(null); // Clear file to show success state cleanly or keep it? 
            // Design choice: Clear file and show success.
        } catch (err) {
            setError("Failed to upload file. Please try again.");
            console.error(err);
        } finally {
            setIsUploading(false);
        }
    };

    const resetUpload = () => {
        setFile(null);
        setShareLink(null);
        setUploadProgress(0);
        setError(null);
    };

    return (
        <Layout>
            <div className="w-full max-w-xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                        Share files securely
                    </h1>
                    <p className="text-lg text-gray-600">
                        Simple, fast, and encrypted file sharing for everyone.
                    </p>
                </div>

                <Card>
                    {!shareLink ? (
                        <>
                            {!file ? (
                                <FileDropzone onFileSelect={handleFileSelect} disabled={isUploading} />
                            ) : (
                                <div className="space-y-6">
                                    <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                                        <FileText className="h-8 w-8 text-blue-500 mr-4" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                        {!isUploading && (
                                            <Button variant="ghost" size="sm" onClick={() => setFile(null)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                                Remove
                                            </Button>
                                        )}
                                    </div>

                                    {isUploading && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm text-gray-600">
                                                <span>Uploading...</span>
                                                <span>{uploadProgress}%</span>
                                            </div>
                                            <ProgressBar progress={uploadProgress} />
                                        </div>
                                    )}

                                    {error && (
                                        <div className="flex items-center p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                                            <AlertCircle className="h-4 w-4 mr-2" />
                                            {error}
                                        </div>
                                    )}

                                    <div className="flex gap-3">
                                        <Button
                                            onClick={handleUpload}
                                            className="w-full"
                                            isLoading={isUploading}
                                            disabled={isUploading}
                                        >
                                            {isUploading ? 'Uploading...' : 'Upload File'}
                                        </Button>
                                        {!isUploading && (
                                            <Button variant="secondary" onClick={() => setFile(null)} className="w-full">
                                                Cancel
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                                <FileText className="h-8 w-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">File Uploaded!</h2>
                            <p className="text-gray-500 mb-8">
                                Your file is ready to share. Copy the link below.
                            </p>

                            <ShareLinkBox url={shareLink} />

                            <Button onClick={resetUpload} variant="outline" className="mt-8">
                                Upload Another File
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
        </Layout>
    );
}
