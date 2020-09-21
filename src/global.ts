import { Toast } from 'antd-mobile';
import { history } from 'umi';
import { addScriptToHead, setRemIfResize } from './utils/customUtils';
import { isIOSEnv } from '@/utils/env';
import { customOptions, requestInstance } from './utils/request';
import { ResponseTplt } from './services/type';
import { isResponseOk } from './utils/model';
const defaultSettings = require('./defaultSettings');

const { iconfontUrl } = defaultSettings;

addScriptToHead(iconfontUrl);
setRemIfResize(750, 75);

/**
 * 测试发现 使用 fastclick 的 iOS 设备可能会导致输入框点击多次才有响应，
 * 所以在 iOS 设备上先暂时不添加该功能
 */
if (!isIOSEnv()) {
  addScriptToHead('https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js', () => {
    if ('addEventListener' in document) {
      document.addEventListener(
        'DOMContentLoaded',
        function () {
          window.FastClick.attach(document.body);
        },
        false,
      );
    }
  });
}

Toast.config({
  mask: false,
});

requestInstance.interceptors.response.use(async (response, options) => {
  const {
    headers: { token },
  } = options as any;
  if (response.ok) {
    const copyResponse = response.clone();
    const _response: ResponseTplt = await copyResponse.json();
    // 判断数据结构是否为本系统后台响应
    if (_response.msg && token && !isResponseOk(_response)) {
      if (_response.code === 4000) {
        // token 失效
        Toast.fail('登录失效', 1500, () => {
          history.replace('/user/login');
          localStorage.clear();
        });
      } else if (_response.code === 3014) {
        Toast.fail('暂无权限');
      }
    }
  }
  return response;
});

customOptions(() => ({
  headers: {
    token: `${localStorage.getItem('token')}`,
  },
}));
