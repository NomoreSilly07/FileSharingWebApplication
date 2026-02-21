import api from './axios';

// Mock function to simulate file upload
export const uploadFile = (file, onUploadProgress) => {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Simulate success
            const mockResponse = {
                data: {
                    uuid: '123e4567-e89b-12d3-a456-426614174000',
                    fileName: file.name,
                    fileSize: file.size,
                    url: `${window.location.origin}/files/123e4567-e89b-12d3-a456-426614174000`
                }
            };

            // Complete progress
            if (onUploadProgress) onUploadProgress({ loaded: file.size, total: file.size });

            resolve(mockResponse);
        }, 2000); // 2 seconds delay

        // Simulate progress updates
        let progress = 0;
        const interval = setInterval(() => {
            progress += file.size / 20; // 5% increments
            if (progress < file.size) {
                if (onUploadProgress) onUploadProgress({ loaded: progress, total: file.size });
            } else {
                clearInterval(interval);
            }
        }, 100);
    });
};

// Mock function to get file details
export const getFileDetails = (uuid) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    uuid: uuid,
                    fileName: 'example-document.pdf',
                    fileSize: 1024 * 1024 * 2.5, // 2.5 MB
                    uploadDate: new Date().toISOString(),
                }
            });
        }, 1000);
    });
};
