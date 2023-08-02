import Postgres, { Query } from '../index';

export default abstract class Entity<T> {
  constructor(
    protected readonly entityName: string,
    protected readonly schemaName: string = 'public',
  ) {}
}
