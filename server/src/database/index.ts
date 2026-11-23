import mongoose from "mongoose";
import logger from "../utils/logger";
import { env } from "../utils/env";

await mongoose.connect(`${env.MONGODB_URI}/${env.MONGODB_DB_NAME}`);

export const Db = mongoose.connection.getClient().db();

logger.info("koneksi database berhasil");

export function getDb() {
  const db = mongoose.connection.db;
  if (!db || mongoose.connection.readyState !== 1) {
    throw new Error(
      "Database belum terhubung. Panggil connectDb() terlebih dahulu.",
    );
  }
  return db;
}

export const closeDb = async (): Promise<void> => {
  await mongoose.disconnect();
};
