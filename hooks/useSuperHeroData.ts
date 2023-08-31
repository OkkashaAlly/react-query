import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const getSuperHero = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [_key, heroId] = queryKey;

  return axios
    .get(`http://localhost:3004/superheros/${heroId}`)
    .then(res => res.data);
};

type Heros = { id: number; name: string; superpower: string };

export const useSuperHeroData = (heroId: number) => {
  const queryClient = useQueryClient();

  return useQuery<Heros, Error>(["super-hero", heroId], getSuperHero, {
    initialData: () => {
      const data =  queryClient
        .getQueryData<Heros[]>(
          ["super-heros"]
        )
        ?.find(hero => hero.id === Number(heroId));

        if (data) return data;
        return undefined;
    },
  });
};
