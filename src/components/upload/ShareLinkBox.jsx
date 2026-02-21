import { useState } from 'react';
import { Copy, Check, Link as LinkIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

export function ShareLinkBox({ url }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="w-full mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Share your file
            </label>
            <div className="flex shadow-sm rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                <div className="flex-shrink-0 bg-gray-50 px-3 flex items-center border-r border-gray-300">
                    <LinkIcon className="h-4 w-4 text-gray-500" />
                </div>
                <input
                    type="text"
                    readOnly
                    value={url}
                    className="block w-full border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm bg-white"
                />
                <div className="flex-shrink-0 border-l border-gray-300">
                    <Button
                        variant="ghost"
                        onClick={handleCopy}
                        className={cn(
                            "h-full rounded-none px-4 hover:bg-gray-100 active:bg-gray-200",
                            copied ? "text-green-600" : "text-gray-600"
                        )}
                    >
                        {copied ? (
                            <div className="flex items-center">
                                <Check className="h-4 w-4 mr-2" />
                                Copied!
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <Copy className="h-4 w-4 mr-2" />
                                Copy
                            </div>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
