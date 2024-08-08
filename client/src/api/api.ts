import { Client, Paths } from "@/types/openapi";
import { ShortLink } from "@/types/types";
import OpenAPIClientAxios from "openapi-client-axios";

const api = new OpenAPIClientAxios({
  definition: "http://localhost:5000/openapi.json",
});
api.init();

export const getLinks = async (): Promise<ShortLink[]> => {
  const client: Client = await api.getClient();
  const res = await client.getAllLinks();
  return res.data;
};

export const createLink = async (long_link): Promise<ShortLink> => {
  const client: Client = await api.getClient();
  const res = await client.createLink({
    long_link: long_link,
  });
  return res.data;
};
