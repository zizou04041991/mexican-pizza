
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/mexican-pizza/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-H455JK2B.js",
      "chunk-EDJ2GV7D.js"
    ],
    "route": "/mexican-pizza"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-VSS7RJKX.js",
      "chunk-H36MSNBR.js"
    ],
    "route": "/mexican-pizza/admin"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-H455JK2B.js",
      "chunk-EDJ2GV7D.js"
    ],
    "route": "/mexican-pizza/request"
  },
  {
    "renderMode": 2,
    "redirectTo": "/mexican-pizza",
    "route": "/mexican-pizza/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23717, hash: '6c0c52b00cdef0a6d1996e40061af60e0626cad8f4152e9170a8e580e4bc4849', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17298, hash: '6e5ae0b2ea22a9f4da8394f600ac76522a5e9dac187e1a53752e67c6954d494b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 32227, hash: '2547492347ec5944f270686b99685f8518a358c3636acdf3c569e8a4f333f115', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'request/index.html': {size: 34208, hash: 'da0d89180c8aa468e33f3a85d88f0716ffdc88bfe73effea0bf861f2de832793', text: () => import('./assets-chunks/request_index_html.mjs').then(m => m.default)},
    'index.html': {size: 62304, hash: 'a8a36905d967dc9547daeb5cb3033c1088fba7302ddbdf8b66c35fd9f3c8ab51', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-ELMERYFN.css': {size: 24327, hash: 'LUOYVDu0Das', text: () => import('./assets-chunks/styles-ELMERYFN_css.mjs').then(m => m.default)}
  },
};
