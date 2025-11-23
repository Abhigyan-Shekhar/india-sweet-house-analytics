import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from './use-toast';

const BACKEND_URL = 'http://localhost:5000';

export const useFileUpload = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const uploadFile = async (file: File): Promise<any[] | null> => {
        setIsUploading(true);
        setUploadProgress(0);

        try {
            // Step 1: Process file with backend
            const formData = new FormData();
            formData.append('file', file);

            setUploadProgress(30);

            const processResponse = await fetch(`${BACKEND_URL}/process-file`, {
                method: 'POST',
                body: formData,
            });

            if (!processResponse.ok) {
                throw new Error(`Backend processing failed: ${processResponse.statusText}`);
            }

            const processResult = await processResponse.json();

            if (!processResult.success) {
                throw new Error(processResult.error || 'File processing failed');
            }

            setUploadProgress(60);

            // Step 2: Upload to Supabase
            const uploadResponse = await fetch(`${BACKEND_URL}/upload-to-supabase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    outlets: processResult.data,
                    filename: file.name,
                }),
            });

            if (!uploadResponse.ok) {
                throw new Error(`Supabase upload failed: ${uploadResponse.statusText}`);
            }

            const uploadResult = await uploadResponse.json();

            if (!uploadResult.success) {
                throw new Error(uploadResult.error || 'Supabase upload failed');
            }

            setUploadProgress(100);

            // Invalidate queries to refetch data
            queryClient.invalidateQueries({ queryKey: ['outlets'] });
            queryClient.invalidateQueries({ queryKey: ['uploaded_files'] });

            toast({
                title: 'File uploaded successfully!',
                description: `${uploadResult.outlets_inserted} outlet records saved to database`,
            });

            return processResult.data;
        } catch (error) {
            console.error('Upload error:', error);
            toast({
                title: 'Upload failed',
                description: error instanceof Error ? error.message : 'An error occurred during upload',
                variant: 'destructive',
            });
            return null;
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    return {
        uploadFile,
        isUploading,
        uploadProgress,
    };
};
