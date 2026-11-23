import { getDb } from ".";
import type {
  Category,
  Counter,
  EoqCalculation,
  Product,
  StockMovement,
  Supplier,
} from "../utils/types";

export const COLLECTIONS = {
  categories: 'categories',
  suppliers: 'suppliers',
  products: 'products',
  stockMovements: 'stock_movements',
  eoqCalculations: 'eoq_calculations',
  counters: 'counters',
} as const;

export const categoriesCol = () => getDb().collection<Category>(COLLECTIONS.categories);
export const suppliersCol = () => getDb().collection<Supplier>(COLLECTIONS.suppliers);
export const productsCol = () => getDb().collection<Product>(COLLECTIONS.products);
export const stockMovementsCol = () => getDb().collection<StockMovement>(COLLECTIONS.stockMovements);
export const eoqCalculationsCol = () => getDb().collection<EoqCalculation>(COLLECTIONS.eoqCalculations);
export const countersCol = () => getDb().collection<Counter>(COLLECTIONS.counters);