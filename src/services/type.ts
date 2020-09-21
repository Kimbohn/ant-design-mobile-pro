export interface ResponseTplt<T = unknown> {
  code: number;
  data: T;
  msg: string;
}

export interface PagedData<Record = unknown> {
  list: Record[];
  /** 可能有不分页的数据列表 */
  pagination?: {
    pageSize: number;
    current: number;
    total: number;
  };
}

export type ResponsePagedData<Record = unknown> = ResponseTplt<PagedData<Record>>;

export type PromisePagedData<Record = unknown> = Promise<ResponsePagedData<Record>>;

export type PromiseResponse<T = unknown> = Promise<ResponseTplt<T>>;
