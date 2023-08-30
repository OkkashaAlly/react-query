
import { QueryKey, useQuery } from "@tanstack/react-query";
import axios from "axios";

const getSuperHero = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [_key, heroId] = queryKey;

  return axios
    .get(`http://localhost:3004/superheros/${heroId}`)
    .then(res => res.data);
};

type Heros = { id: string; name: string; superpower: string };

export const useSuperHeroData = (heroId: number) => {
  return useQuery<Heros, Error>(["super-hero", heroId], getSuperHero);
};
