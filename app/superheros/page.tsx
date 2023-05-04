"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const SuperHeros = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ id: string; name: string }[]>();

  useEffect(() => {
    async function getData() {
      const response = await axios.get("http://localhost:3004/superheros");
      const { data } = response;

      setData(data);
      setLoading(false);
      console.log(data);
    }

    getData();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>Traditional Superheros</h1>
          <ul className="pl-8 pt-3 list-disc">
            {data && data!.map(item => <li key={item.name}>{item.name}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SuperHeros;
