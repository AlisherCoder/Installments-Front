import { partner, region } from '@/shared/keys';
import { api } from '@/shared/lib/axios';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export interface IParams {
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
  const queryClient = useQueryClient();

  const getPartners = (params: IParams) =>
    useQuery({
      queryKey: [partner, params],
      queryFn: () => api.get('partner', { params }).then((res) => res.data),
      placeholderData: keepPreviousData,
      staleTime: 1000 * 60 * 5, // re-fetch vaqti
      gcTime: 1000 * 60 * 10, // cache vaqti
    });

  const createPartner = useMutation({
    mutationFn: (body: any) =>
      api.post('partner', body).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [partner] });
    },
  });

  const updatePartner = useMutation({
    mutationFn: ({ body, id }: { body: any; id: string }) =>
      api.patch(`partner/${id}`, body).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [partner] });
    },
  });

  const getRegions = () =>
    useQuery({
      queryKey: [region],
      queryFn: () => api.get('region').then((res) => res.data),
    });

  return { getPartners, createPartner, getRegions, updatePartner };
};
