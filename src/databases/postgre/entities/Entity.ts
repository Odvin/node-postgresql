import { Query } from '../index';

export default abstract class Entity<T> {
  entity: string;

  constructor(
    protected readonly entityName: string,
    protected readonly schemaName: string = 'public',
  ) {
    this.entity = `${this.schemaName}.${this.entityName}`;
  }

  abstract getEntityItems(req: Query): Promise<Partial<T>[]>;
}
