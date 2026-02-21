import { useState, useRef, useCallback } from 'react';
import { UploadCloud, File, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';

export function FileDropzone({ onFileSelect, disabled }) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setIsDragging(true);
    }, [disabled]);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (disabled) return;

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            validateAndSelect(file);
        }
    }, [disabled]);

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            validateAndSelect(e.target.files[0]);
        }
    };

    const validateAndSelect = (file) => {
        setError(null);
        // Add validation if needed (size, type)
        if (file.size > 50 * 1024 * 1024) { // 50MB limit example
            setError("File is too large (max 50MB)");
            return;
        }
        onFileSelect(file);
    };

    const onBrowseClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full">
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={onBrowseClick}
                className={cn(
                    "relative border-2 border-dashed rounded-xl p-10 transition-all duration-200 ease-in-out flex flex-col items-center justify-center text-center cursor-pointer min-h-[300px]",
                    isDragging
                        ? "border-blue-500 bg-blue-50/50"
                        : "border-gray-200 hover:border-blue-400 hover:bg-gray-50/50",
                    disabled && "opacity-50 cursor-not-allowed hover:border-gray-200 hover:bg-transparent"
                )}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileInput}
                    disabled={disabled}
                />

                <div className={cn(
                    "p-4 rounded-full bg-blue-50 mb-4 transition-transform duration-300",
                    isDragging && "scale-110"
                )}>
                    <UploadCloud className={cn("w-10 h-10 text-blue-500", isDragging && "animate-bounce")} />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Drag & drop your file here
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm">
                    Or click to browse from your computer. Max file size 50MB.
                </p>

                <Button variant="outline" disabled={disabled} onClick={(e) => {
                    e.stopPropagation();
                    onBrowseClick();
                }}>
                    Browse Files
                </Button>
            </div>

            {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center">
                    <X className="w-4 h-4 mr-2" />
                    {error}
                </div>
            )}
        </div>
    );
}
