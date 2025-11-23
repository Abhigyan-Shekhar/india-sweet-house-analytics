import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase';
import type { OutletRecord } from '@/integrations/supabase';

export const useOutlets = () => {
    const queryClient = useQueryClient();

    const { data: outlets = [], isLoading, error, refetch } = useQuery({
        queryKey: ['outlets'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('outlets')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching outlets:', error);
                throw error;
            }

            return data as OutletRecord[];
        },
    });

    const invalidateOutlets = () => {
        queryClient.invalidateQueries({ queryKey: ['outlets'] });
    };

    return {
        outlets,
        isLoading,
        error,
        refetch,
        invalidateOutlets,
    };
};

export const useOutletsByFile = (fileId?: string) => {
    const { data: outlets = [], isLoading, error } = useQuery({
        queryKey: ['outlets', fileId],
        queryFn: async () => {
            if (!fileId) return [];

            const { data, error } = await supabase
                .from('outlets')
                .select('*')
                .eq('file_id', fileId)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching outlets by file:', error);
                throw error;
            }

            return data as OutletRecord[];
        },
        enabled: !!fileId,
    });

    return {
        outlets,
        isLoading,
        error,
    };
};
