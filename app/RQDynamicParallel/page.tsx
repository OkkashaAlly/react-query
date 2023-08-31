"use client";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const getSuperHeros = async (heroId: string) => {
  return axios
    .get(`http://localhost:3004/superheros/${heroId}`)
    .then(res => res.data);
};

const RQDynamicParallel = () => {
  const fetchQueries = ["1", "3"];

  const result = useQueries({
    queries: fetchQueries.map(heroId => {
      return {
        queryKey: ["superHeros", heroId],
        queryFn: () => getSuperHeros(heroId),
      };
    }),
  });

  console.log("RQDynamicParallel result", result);

  return <div>RQDynamicParallel</div>;
};

export default RQDynamicParallel;
