import pkg from "../../../package.json";

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
