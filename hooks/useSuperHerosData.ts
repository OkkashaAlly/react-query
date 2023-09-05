import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const getSuperHeros = async () =>
  axios
    .get("http://localhost:3004/superheros")
    .then(res => res.data as [{ id: string; name: string }]);

const addSuperHero = async (data: any) => {
  return axios
    .post("http://localhost:3004/superheros", data)
    .then(res => res.data);
};

type Heros = [{ id: string; name: string }];

type Function = (data: Heros | Error) => void;

export const useSuperHerosData = (onSuccess: Function, onError: Function) => {
  return useQuery<Heros, Error>(["super-heros"], getSuperHeros, {
    // cacheTime: 5000, // 5 seconds caches the data
    // staleTime: 10000, // 10 seconds waits 10 seconds before refetching
    // refetchOnMount: true, // refetch when the component mounts
    // refetchOnWindowFocus: true, // refetch when the window is in focus
    // refetchInterval: 2000, // refetch every 2 seconds on window focus
    // refetchIntervalInBackground: true, // refetch in the background every 2 seconds
    // enabled: false, // if false, the query will not execute
    // onSuccess, // call back function after success of the query
    // onError, // call back function after error of the query
    // select: (data: Heros) => data.map(item => item.name), // select the data you want to return
  });
};

export const useAddSuperHero = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSuperHero,
    onSuccess: postData => {
      
      queryClient.invalidateQueries({ queryKey: ["super-heros"] });
      
    },
  });
};
