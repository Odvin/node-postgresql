import Postgres, { Query } from '../index';
import Entity from './Entity';

export type Ingredient = {
  id: number;
  title: string;
  type: string;
  image?: string;
};

export class Ingredients extends Entity<Ingredient> {
  constructor(entityName: string, schemaName: string) {
    super(entityName, schemaName);
  }

  async getEntityItems(req: Query) {
    const { rows } = (await Postgres.query(req)) as {
      rows: Partial<Ingredient>[];
    };

    return rows;
  }

  async getByType(params: {
    type: Ingredient['type'];
    lastId: Ingredient['id'];
  }) {
    const query: Query = {
      name: 'getIngredientsByType',
      text: `SELECT * FROM ${this.entity} WHERE id > $1 and type = $2 ORDER BY id LIMIT 20`,
      values: [params.lastId, params.type],
    };

    return this.getEntityItems(query);
  }

  async search(params: { term: string; page: number }) {
    const query: Query = {
      name: 'searchIngredients',
      text: `SELECT * FROM ${this.entity} WHERE CONCAT(title, type) ILIKE $1 OFFSET $2 LIMIT 10`,
      values: [`%${params.term}%`, params.page * 10],
    };

    return this.getEntityItems(query);
  }
}

export default new Ingredients('ingredients', 'public');
