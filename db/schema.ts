import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const earlyAccessSignups = sqliteTable("early_access_signups", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  firstName: text("first_name").notNull(),
  email: text("email").notNull().unique(),
  location: text("location"),
  interests: text("interests"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const stickerPackReservations = sqliteTable("sticker_pack_reservations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  firstName: text("first_name").notNull(),
  email: text("email").notNull().unique(),
  quantity: integer("quantity").notNull().default(1),
  postalCode: text("postal_code"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
