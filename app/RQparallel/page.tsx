"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getSuperHeros = async () => {
  return axios.get(`http://localhost:3004/superheros/`).then(res => res.data);
};

const getVillains = async () => {
  return axios.get(`http://localhost:3004/villains/`).then(res => res.data);
};

const RQparallel = () => {
  const { data: superHeros } = useQuery(["superHeros"], getSuperHeros);

  const { data: villains } = useQuery(["villains"], getVillains);

  return <div>RQparallel</div>;
};

export default RQparallel;
