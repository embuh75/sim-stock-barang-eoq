import { join } from "node:path";
import { randomInt } from "node:crypto";

const date = (): string => new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format( new Date()) // "2024-05-21"
    .replaceAll("-", "");

const nameGenerate = (prefix: string, file: any) => {
    const uid = randomInt(100_000_000, 1_000_000_000);
    const ext = file.name.split(".").pop();

    return `${prefix}_${uid}_${date()}.${ext}`;
}

export const uploadsFile = async (folder: string, prefix: string, file: any) => {
  const dir = join(import.meta.dir, `../../public/${folder}`);
  const filename = nameGenerate(prefix, file);

  await Bun.write(`${dir}/${filename}`, file);

  return { fileName: filename, url:`/public/${folder}/${filename}`}; 
};
