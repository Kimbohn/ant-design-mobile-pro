import { useRequest } from 'ahooks';
import { fakeAccountLogin } from '@/services/api';

export default () => {
  return useRequest((payload) => fakeAccountLogin(payload), {
    manual: true,
  });
};
