import { getDb } from "../index";
import type * as CollectionsType from "../../utils/types";

export const COLLECTIONS = {
  categories: 'categories',
  suppliers: 'suppliers',
  products: 'products',
  stockMovements: 'stock_movements',
  eoqCalculations: 'eoq_calculations',
  counters: 'counters',
} as const;

export const categoriesCol = () => getDb().collection<CollectionsType.Category>(COLLECTIONS.categories);
export const suppliersCol = () => getDb().collection<CollectionsType.Supplier>(COLLECTIONS.suppliers);
export const productsCol = () => getDb().collection<CollectionsType.Product>(COLLECTIONS.products);
export const stockMovementsCol = () => getDb().collection<CollectionsType.StockMovement>(COLLECTIONS.stockMovements);
export const eoqCalculationsCol = () => getDb().collection<CollectionsType.EoqCalculation>(COLLECTIONS.eoqCalculations);
export const countersCol = () => getDb().collection<CollectionsType.Counter>(COLLECTIONS.counters);