import { InferModel } from "drizzle-orm";
import { pgTable, varchar, uuid, numeric } from "drizzle-orm/pg-core";

export const clinics = pgTable("clinics", {
  id: uuid("id").defaultRandom().primaryKey(),
  longName: varchar("long_name").notNull(),
  pms: varchar("pms").notNull(),
  metaTitle: varchar("meta_title").notNull(),
  metaDescription: varchar("meta_description").notNull(),
  slug: varchar("slug").notNull(),
  website: varchar("website").notNull(),
  clinicName: varchar("clinic_name").notNull(),
  displayOnWeb: varchar("display_on_web").notNull(),
  link: varchar("link").notNull(),
  fullAddress: varchar("full_address").notNull(),
  city: varchar("city").notNull(),
  suburb: varchar("suburb").notNull(),
  state: varchar("state").notNull(),
  postcode: varchar("postcode").notNull(),
  email: varchar("email"),
  phone: varchar("phone").notNull(),
  lat: numeric("lat").notNull(),
  lng: numeric("lng").notNull(),
});

export type TClinics = InferModel<typeof clinics>;
