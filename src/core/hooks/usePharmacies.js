import { useQuery } from '@tanstack/react-query';
import { fetchPharmacies } from '../api/pharm';
import { FIVE_MINUTES, TEN_MINUTES } from '../constants';
import { QUERY_KEY } from '../constants/queryKey';

export const usePharmacies = () => {
  return useQuery({
    queryKey: QUERY_KEY.PHARMACIES,
    queryFn: fetchPharmacies,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
};
