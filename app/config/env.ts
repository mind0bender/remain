import { ok } from "node:assert";

ok(
  process.env.QSTASH_TOKEN,
  `QSTASH_TOKEN is required, received ${process.env.QSTASH_TOKEN}`,
);
ok(
  process.env.MAILER_URL,
  `MAILER_URL is required, received ${process.env.MAILER_URL}`,
);
ok(
  process.env.MONGO_URI,
  `MONGO_URI is required, received ${process.env.MONGO_URI}`,
);

export const QSTASH_TOKEN: string = process.env.QSTASH_TOKEN;
export const MAILER_URL: string = process.env.MAILER_URL;
export const MONGO_URI: string = process.env.MONGO_URI;
