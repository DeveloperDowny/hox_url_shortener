import { Client, Paths } from "@/types/openapi";
import { Analytics, ShortLink } from "@/types/types";
import OpenAPIClientAxios from "openapi-client-axios";

const api = new OpenAPIClientAxios({
  definition: "http://localhost:5000/openapi.json",
});
api.init();

export const getLinks = async (): Promise<Analytics[]> => {
  const client: Client = await api.getClient();
  const res = await client.getAllLinks();
  return res.data;
};

export const createLink = async (new_long_link): Promise<void> => {
  const client: Client = await api.getClient();
  const res = await client.createLink(
    {},
    {
      long_link: new_long_link,
    },
    {}
  );
};

export const getAnalyticsById = async (
  sid
): Promise<Paths.GetAnalyticsById.Responses.$200> => {
  const client: Client = await api.getClient();
  const res = await client.getAnalyticsById(
    {
      sid,
    },
    {}
  );
  return res.data;
};

export const updateLink = async (
  sid,
  new_long_link,
  new_short_link
): Promise<Paths.UpdateLink.Responses.$200> => {
  const client: Client = await api.getClient();
  const res = await client.updateLink(
    {
      sid,
    },
    {
      long_link: new_long_link,
      short_link: new_short_link,
    },
    {}
  );
  return res.data;
};
