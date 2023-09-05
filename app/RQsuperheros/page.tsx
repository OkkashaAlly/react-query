"use client";
import { useAddSuperHero, useSuperHerosData } from "@/hooks/useSuperHerosData";
import Link from "next/link";
import { useState } from "react";

const RQSuperheros = () => {
  const [name, setName] = useState("");
  const [superpower, setSuperpower] = useState("");

  const onSuccess = (data: any) => {
    console.log("Performing onSuccess handler, data", data);
  };

  const onError = (data: any) => {
    console.log("Performing onError handler, data", data);
  };

  const { data, refetch, isInitialLoading, isError, error } = useSuperHerosData(
    onSuccess,
    onError
  );

  const { mutate, isLoading, isSuccess } = useAddSuperHero();

  const handleAddSuperHero = () => {
    const hero = { name, superpower };
    mutate(hero);
  };

  if (isInitialLoading) return <p>Loading...</p>;

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <div>RQSuperheros</div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="name"
          value={name}
          className="border border-gray-400 py-2 px-4 rounded mr-2"
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="superpower"
          value={superpower}
          className="border border-gray-400 py-2 px-4 rounded mr-2"
          onChange={e => setSuperpower(e.target.value)}
        />
        <button
          onClick={handleAddSuperHero}
          disabled={name === "" || superpower === ""}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add SuperHero
        </button>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => refetch()}
      >
        Get superheros
      </button>
      <ul className="pl-8 pt-3 list-disc">
        {data?.map(item => (
          <li key={item.id}>
            <Link href={`/RQsuperheros/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RQSuperheros;
