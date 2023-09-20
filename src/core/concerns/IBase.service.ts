import { Model } from 'ogm-neo4j/models';

export type GetResponse<M extends Model<any, any>> = Promise<
  Awaited<ReturnType<M['find']>>
>;
export type AllResponse<M extends Model<any, any>> = Promise<
  Awaited<ReturnType<M['all']>>
>;
export type CreateResponse<M extends Model<any, any>> = Promise<
  Awaited<ReturnType<M['create']>>
>;
export type DeleteResponse<M extends Model<any, any>> = Promise<
  Awaited<ReturnType<M['delete']>>
>;

export interface IBaseService<M extends Model<any, any>> {
  readonly name: string;
  getAll(
    properties?: Parameters<M['all']>['0'],
    options?: Parameters<M['all']>['1'],
  ): AllResponse<M>;
  get(id: Parameters<M['find']>['0']): GetResponse<M>;
  // TODO: Implement update
  // update(entity: T): Promise<ReturnType<T['update']>>;
  create(entity: Parameters<M['create']>['0']): CreateResponse<M>;
  delete(id: Parameters<M['delete']>['0']): DeleteResponse<M>;
}
