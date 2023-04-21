import { getDrizzle } from "db/connectDB";
import { TClinics, clinics } from "db/schema";
import { eq, ilike } from "drizzle-orm";

type TClinicsNotLocation = Omit<TClinics, "lat" | "lng">;
type TLocation = Pick<TClinics, "lat" | "lng">;

type TNormalResponseClinics = TClinicsNotLocation & { location: TLocation };

interface IClinics {
  getAll: () => Promise<TNormalResponseClinics[]>;
  getById: (...args: [string]) => Promise<TNormalResponseClinics>;
  getByCity: (...args: [string]) => Promise<TNormalResponseClinics[]>;
  getBySuburb: (...args: [string]) => Promise<TNormalResponseClinics[]>;
  getByState: (...args: [string]) => Promise<TNormalResponseClinics[]>;
  getByPostcode: (...args: [string]) => Promise<TNormalResponseClinics[]>;
  getBySlug: (...args: [string]) => Promise<TNormalResponseClinics[]>;
  getByLink: (...args: [string]) => Promise<TNormalResponseClinics[]>;
}

class ClinicsRepository implements IClinics {
  constructor(private db = getDrizzle(), private table = clinics) {}

  getAll = async () => {
    const column = this.selectFields();
    return await this.db.select(column).from(this.table);
  };

  getById = async (searchId: string) => {
    const { id } = this.table;
    const column = this.selectFields();
    const [clinic] = await this.db
      .select(column)
      .from(this.table)
      .where(eq(id, searchId));

    return clinic;
  };

  getByCity = async (searchCity: string) => {
    const { city } = this.table;
    const column = this.selectFields();
    return await this.db
      .select(column)
      .from(this.table)
      .where(ilike(city, `%${searchCity}%`));
  };

  getBySuburb = async (searchSuburb: string) => {
    const { suburb } = this.table;
    const column = this.selectFields();
    return await this.db
      .select(column)
      .from(this.table)
      .where(ilike(suburb, `%${searchSuburb}%`));
  };

  getByState = async (searchState: string) => {
    const { state } = this.table;
    const column = this.selectFields();
    return await this.db
      .select(column)
      .from(this.table)
      .where(ilike(state, `%${searchState}%`));
  };

  getByPostcode = async (searchPostcode: string) => {
    const { postcode } = this.table;
    const column = this.selectFields();
    return await this.db
      .select(column)
      .from(this.table)
      .where(ilike(postcode, `%${searchPostcode}%`));
  };

  getBySlug = async (searchSlug: string) => {
    const { slug } = this.table;
    const column = this.selectFields();
    return await this.db
      .select(column)
      .from(this.table)
      .where(ilike(slug, `%${searchSlug}%`));
  };

  getByLink = async (searchLink: string) => {
    const { link } = this.table;
    const column = this.selectFields();
    return await this.db
      .select(column)
      .from(this.table)
      .where(ilike(link, `%${searchLink}%`));
  };

  private selectFields = () => {
    const { lat, lng, _, ...column } = this.table;
    return {
      ...column,
      location: { lat, lng },
    };
  };
}

export const clinicsRepository = new ClinicsRepository();
