import { DatabaseService } from 'core/database/database.service';

export interface IBaseModelService<
  T extends Record<string, any>,
  I extends keyof T,
> {
  readonly name: keyof DatabaseService;
  getAll(): Promise<T[]>;
  get(id: T[I]): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(id: T[I], data: Partial<T>): Promise<T>;
  delete(id: T[I]): Promise<T>;
}
