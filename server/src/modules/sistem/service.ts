import pkg from "../../../package.json";
import { serveFile } from "../../utils/file-handling";

export const status = () => {
  return {
    info: {
      title: "API Sistem Informasi Stok Barang (EOQ)",
      version: pkg.version,
      description:
        "REST API untuk pengelolaan barang masuk, barang keluar, stok, dan perhitungan Economic Order Quantity (EOQ).",
    },
    status: "online",
    date: new Date().toISOString(),
  };
};

export const staticFile = async ( params: { prefix: string; fileName: string }, set: any ) => {
  set.headers["cache-control"] = "private, max-age=3600";
  return serveFile(params.prefix, params.fileName);
};
