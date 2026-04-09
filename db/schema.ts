import {pgTable, uuid, text, timestamp, decimal} from "drizzle-orm/pg-core";

export const businesses = pgTable("businesses", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  ownerId: text("owner_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const inventory = pgTable("inventory", {
  id: uuid("id").primaryKey().defaultRandom(),
  businessId: uuid("business_id").references(
    () => businesses.id, {onDelete: "cascade"}
  ),
  name: text("name").notNull(),
  quantity: decimal("quantity", {precision: 10, scale: 2}).notNull().default("0"),
  unit: text("unit").notNull(),
  minStock: decimal("min_stock", {precision: 10, scale: 2}).default("0"),
});

export const menuItems = pgTable("menu_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  businessId: uuid("business_id").references(
    () => businesses.id, {onDelete: "cascade"}
  ),
  name: text("name").notNull(),
  price: decimal("price", {precision: 10, scale: 2}).notNull(),
  category: text("category"),
});

export const recipes = pgTable("recipes", {
  id: uuid("id").primaryKey().defaultRandom(),
  menuItemId: uuid("menu_item_id").references(
    () => menuItems.id, {onDelete: "cascade"}
  ),
  inventoryId: uuid("inventory_id").references(
    () => inventory.id, {onDelete: "cascade"}
  ),
  amountNeeded: decimal("amount_needed", {precision: 10, scale: 2}).notNull(),
});

export const sales = pgTable("sales", {
  id: uuid("id").primaryKey().defaultRandom(),
  businessId: uuid("business_id").references(
    () => businesses.id, {onDelete: "cascade"}
  ),
  menuItemId: uuid("menu_item_id").references(
    () => menuItems.id),
  totalPrice: decimal("total_price", {precision: 10, scale: 2}).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});