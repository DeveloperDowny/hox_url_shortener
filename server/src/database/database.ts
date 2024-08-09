import * as knex_src from "knex";
import { config } from "./env/env";
import { Analytics, ShortLink } from "../../types/types";

const knex = knex_src.knex(config);

knex.schema.hasTable("shortlinks").then(function (exists) {
  if (!exists) {
    return knex.schema.createTable("shortlinks", function (t) {
      t.increments("id").primary();
      t.string("short_link", 255).unique();
      t.text("long_link");
      t.text("qr");
    });
  }
});

knex.schema.hasTable("analytics").then(function (exists) {
  if (!exists) {
    return knex.schema.createTable("analytics", function (t) {
      t.increments("id").primary();
      t.integer("sid").unsigned().references("id").inTable("shortlinks");
      t.string("source", 255);
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

export const getAllAnalytics = async (): Promise<Analytics[]> => {
  // const res = await knex.table("analytics").select();
  // group by sid and count when source qr and when source is link and populate with short link data
  // select sum(if(source = 'qr', 1, 0)) as traffic_from_qr, sum(if(source = 'link', 1, 0)) as traffic_from_link, short_link_data from analytics join shortlinks on analytics.sid = shortlinks.id group by sid;
  // instead of raw query, use knex query builder
  const res: Analytics[] = await knex
    .table("analytics")
    .select(
      knex.raw("sum(if(source = 'qr', 1, 0)) as traffic_from_qr"),
      knex.raw("sum(if(source = 'link', 1, 0)) as traffic_from_link"),
      knex.raw(`
      json_object(
        'id', shortlinks.id,
        'long_link', shortlinks.long_link,
        'short_link', shortlinks.short_link,
        'qr', shortlinks.qr
      ) as short_link_data
    `)
    )
    .rightJoin("shortlinks", "analytics.sid", "shortlinks.id")
    .groupBy("shortlinks.id")
    .orderBy("shortlinks.id", "desc")
    .then((rows) => {
      return rows.map((row: any) => ({
        traffic_from_qr: Number(row.traffic_from_qr),
        traffic_from_link: Number(row.traffic_from_link),
        short_link_data: row.short_link_data,
      }));
    });

  // const res: Analytics[] = await knex
  //   .raw(
  //     `
  //   select sum(if(source = 'qr', 1, 0)) as traffic_from_qr, sum(if(source = 'link', 1, 0)) as traffic_from_link, json_object(
  //     'id', shortlinks.id,
  //     'long_link', shortlinks.long_link,
  //     'short_link', shortlinks.short_link,
  //     'qr', shortlinks.qr
  //   ) as short_link_data
  //   from analytics right join shortlinks on analytics.sid = shortlinks.id group by shortlinks.id;
  // `
  //   )
  //   .then((rows) => {
  //     return rows[0].map((row: any) => ({
  //       traffic_from_qr: Number(row.traffic_from_qr),
  //       traffic_from_link: Number(row.traffic_from_link),
  //       short_link_data: row.short_link_data,
  //     }));
  //   });

  console.log("res", res);

  return res;
};

export const getLinkById = async (short_link): Promise<ShortLink> => {
  const res = await knex
    .table("shortlinks")
    .select()
    .where("short_link", short_link);
  return res[0] as ShortLink;
};

export const getAnalyticsById = async (sid): Promise<Analytics> => {
  let analytics: Analytics = {
    traffic_from_qr: 0,
    traffic_from_link: 0,
    short_link_data: undefined,
  };

  // query database to select count where source is qr
  const qrCount = await knex
    .table("analytics")
    .count("source")
    .where("sid", sid)
    .andWhere("source", "qr");

  // query database to select count where source is link
  const linkCount = await knex
    .table("analytics")
    .count("source")
    .where("sid", sid)
    .andWhere("source", "link");

  // query database to select short link data
  const shortLinkData = await knex
    .table("shortlinks")
    .select()
    .where("id", sid);

  analytics.traffic_from_qr = qrCount[0]["count(`source`)"];
  analytics.traffic_from_link = linkCount[0]["count(`source`)"];
  analytics.short_link_data = shortLinkData[0] as ShortLink;

  console.log(analytics);

  return analytics;
};

export const updateLink = async (sid, data) => {
  await knex.table("shortlinks").where("id", sid).update(data);
};

export const addAnalytics = async (sid, source) => {
  await knex.table("analytics").insert({
    sid: sid,
    source: source,
  });
};

export default knex;
