import { useRequest } from 'ahooks';
import { BaseResult, BaseOptions } from '@ahooksjs/use-request/lib/types';

import { ResponseTplt } from '@/services/type';
import { isResponseOk } from '@/utils/model';
import { RequestOptionsInit } from 'umi-request';
import request from '@/utils/request';

export type Service<P extends any[] = any> =
  | string
  | ((...params: P) => { url: string; options?: RequestOptionsInit });

export function genRequest<P extends any[] = any>(
  service: Service<P>,
  method: string,
  ...applyParams: P
) {
  if (typeof service === 'function') {
    const { url, options } = service.apply(null, applyParams);
    return request(url, { method, ...options });
  }
  return request(service, { method });
}

function useOptions<T, P extends any[] = any>(service: Service<P>): BaseResult<T, []>;

function useOptions<T, R, P extends any[] = any>(
  service: Service<P>,
  postOptions?: (list: T) => R[],
): BaseResult<R[], []>;

function useOptions<T, R, P extends any[]>(
  service: Service<P>,
  postOptions?: (list: T) => R[],
  options?: BaseOptions<R, P>,
): BaseResult<R[], []>;

function useOptions<T, R, P extends any[]>(
  service: Service<P>,
  postOptions?: (list: T) => R[],
  options?: Pick<BaseOptions<R, P>, 'refreshDeps'>,
) {
  return useRequest<ResponseTplt<any>, P, R[] | T>(
    async (...params) => await genRequest(service, 'GET', ...params),
    {
      ...options,
      initialData: [],
      formatResult: (response) => {
        if (isResponseOk(response)) {
          const list = response?.data?.list || [];
          return postOptions ? postOptions(list) : list;
        }
        return [];
      },
    },
  );
}

export default useOptions;
