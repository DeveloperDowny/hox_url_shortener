import * as knex_src from "knex";
import { config } from "./env/env";
import { ShortLink } from "../../types/types";

const knex = knex_src.knex(config);

knex.schema.hasTable("shortlinks").then(function (exists) {
  if (!exists) {
    return knex.schema.createTable("shortlinks", function (t) {
      t.increments("id").primary();
      t.string("short_link", 1024);
      t.string("long_link", 1024);
      t.text("qr");
    });
  }
});

export const addLink = async (shortLink: ShortLink): Promise<number> => {
  // think how you'll generate image
  const res = await knex.table("shortlinks").insert({
    long_link: shortLink.long_link,
    short_link: shortLink.short_link,
    qr: shortLink.qr,
  });

  return res[0];
};

export const getLinks = async (): Promise<ShortLink[]> => {
  const res = await knex.table("shortlinks").select();
  return res;
};

export const getLinkById = async (short_link): Promise<ShortLink> => {
  const res = await knex
    .table("shortlinks")
    .select()
    .where("short_link", short_link);
  return res[0] as ShortLink;
};

export default knex;
