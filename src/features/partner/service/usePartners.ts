import { api } from '@/shared/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface IParams {
  page?: string;
  limit?: string;
  search?: string;
  role: string;
  isActive?: string;
  isArchive?: string;
  sortBy?: string;
  orderBy?: string;
}

export const usePartner = () => {
  const key = 'partner';
  const queryClient = useQueryClient();

  const getPartners = (params: IParams) =>
    useQuery({
      queryKey: [key, params],
      queryFn: () => api.get('partner', { params }).then((res) => res.data),
    });

  const createPartner = useMutation({
    mutationFn: (body: any) =>
      api.post('partner', body).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });

  const getRegions = () =>
    useQuery({
      queryKey: ['region'],
      queryFn: () => api.get('region').then((res) => res.data),
    });

  return { getPartners, createPartner, getRegions };
};
