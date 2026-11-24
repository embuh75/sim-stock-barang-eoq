import { file } from "elysia";
import { join } from "node:path";
import logger from "./logger";
import { randomInt } from "node:crypto";

// Upload File
const date = (): string =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date()) // "2024-05-21"
    .replaceAll("-", "");

const nameGenerate = (prefix: string, file: any) => {
  const uid = randomInt(100_000_000, 1_000_000_000);
  const ext = file.name.split(".").pop();

  return `${prefix}_${uid}_${date()}.${ext}`;
};

const fileNotFound = () =>
  new Response(
    JSON.stringify({ success: false, message: "File tidak ditemukan" }),
    { status: 404, headers: { "content-type": "application/json" } },
  );

export const uploadsFile = async ( folder: string, prefix: string, file: any, ) => {
  const filename = nameGenerate(prefix, file);
  const path = join(import.meta.dir, `../../public/${folder}`);

  await Bun.write(`${path}/${filename}`, file);

  return { fileName: filename, url: `/public/${folder}/${filename}` };
};

// Delete File
export const deleteFile = async (prefix: string, fileName: string) => {
  const path = join(import.meta.dir, `../../public/${prefix}/${fileName}`);
  if (!(await Bun.file(path).exists())) return fileNotFound;

  await Bun.file(path).delete();

  logger.info(`berhasil menghapus file "${fileName}" di "${path}/${fileName}"`);
};

export const serveFile = async (prefix: string, fileName: string) => {
  const path = join(import.meta.dir, `../../public/${prefix}/${fileName}`);

  if (!(await Bun.file(path).exists())) return fileNotFound;

  return file(path);
};
