"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RQSuperheros = () => {
  const getSuperHeros = async () =>
    axios
      .get("http://localhost:3004/superheros")
      .then(res => res.data as [{ id: string; name: string }]);

  const { data, isLoading } = useQuery(["super-heros"], getSuperHeros);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div>RQSuperheros</div>
      <ul className="pl-8 pt-3 list-disc">
        {data?.map(item => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </>
  );
};

export default RQSuperheros;
