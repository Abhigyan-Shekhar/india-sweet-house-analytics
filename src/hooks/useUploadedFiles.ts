import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase';
import type { UploadedFileRecord } from '@/integrations/supabase';

export const useUploadedFiles = () => {
    const { data: files = [], isLoading, error, refetch } = useQuery({
        queryKey: ['uploaded_files'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('uploaded_files')
                .select('*')
                .order('uploaded_at', { ascending: false });

            if (error) {
                console.error('Error fetching uploaded files:', error);
                throw error;
            }

            return data as UploadedFileRecord[];
        },
    });

    return {
        files,
        isLoading,
        error,
        refetch,
    };
};
