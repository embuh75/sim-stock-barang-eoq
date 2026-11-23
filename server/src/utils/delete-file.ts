import { join } from "node:path";
import logger from "./logger";

export const deleteFile = async (prefix: string, fileName: string) => {
  const path = join(import.meta.dir, `../../public/${prefix}`);
  await Bun.file(`${path}/${fileName}`).delete();

  logger.info(`berhasil menghapus file "${fileName}" di "${path}/${fileName}"`);
};
