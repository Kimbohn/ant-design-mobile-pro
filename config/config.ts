import pageRoutes from './router.config';
import webpackPlugin from './plugin.config';
import pxToViewPort from 'postcss-px-to-viewport';
const defaultSettings = require('../src/defaultSettings');

const { base, publicPath } = defaultSettings;

export default {
  // code split need base url
  base,
  publicPath,
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },

  antd: false,
  dva: {
    immer: true,
    hmr: false,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  title: 'ant-design-mobile-pro',
  locale: {
    default: 'zh-CN',
  },

  //   exportStatic: {},
  // 路由配置
  routes: pageRoutes,
  // Theme for antd-mobile
  // https://mobile.ant.design/docs/react/customize-theme-cn
  // theme: {
  //   'brand-primary': theme.primaryColor,
  //   'brand-primary-tap': theme.brandPrimaryTap,
  // },
  externals: {},
  lessLoader: {
    javascriptEnabled: true,
  },
  cssnano: {
    mergeRules: false,
  },
  targets: {
    android: 5,
    chrome: 58,
    edge: 13,
    firefox: 45,
    ie: 9,
    ios: 7,
    safari: 10,
  },
  outputPath: './dist',
  alias: {},
  proxy: {
    '/server/api/': {
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
      target: 'https://preview.pro.ant.design/',
    },
    '/wx/api/': {
      changeOrigin: true,
      pathRewrite: { '^/wx/api': '' },
      target: 'https://games.parsec.com.cn/',
    },
  },
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  hash: true,
  chainWebpack: webpackPlugin,
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd-mobile',
        //style: 'css',
        style: true, // use less for customized theme
      },
    ],
  ],
  // reference: https://umijs.org/zh/config/#extrapostcssplugins
  extraPostCSSPlugins: [
    // reference: https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md
    pxToViewPort({
      viewportWidth: 750,
      mediaQuery: false,
    }),
  ],
  theme: {
    hd: '2px',
    // 'brand-primary': '',
    // 'brand-primary-tap': '',
  },
};
