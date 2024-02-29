import axios from 'axios'
import reqMapSet from './reqMapSet.js' // 解析pathMap以及一些参数

const request = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 50000
})

request.interceptors.request.use(config => {
  // 接口请求前做一些处理
  // const token = localStorage.getItem(ACCESS_TOKEN)
  // if (token) {
  //   config.headers[TOKEN_NAME] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  // }
  // // 单点登录解决方案 header 头 增加 X-Requested-With，会引发 401
  // config.headers['X-Requested-With'] = 'XMLHttpRequest'
  if (config.headers['Content-Type'] == null) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    // config.transformRequest = [obj => qs.stringify(obj, {indices: false})]// 解决post传输格式问题。
  }
  return config
})

request.interceptors.response.use(response => {
  // 接口请求后做一些处理
  return response
})

// //处理响应code
// function handleResponseCode(response) {
//   const code = response.code
//   let msg = response.message || '未知错误！'
//   //成功情况，直接返回
//   if (code === ok) {
//     return Promise.resolve(response)
//   }

//   //  无权访问错误提示
//   if (code === 403) {
//     message.error('您无权限访问该功能', 5)
//     return Promise.reject(response)
//   }
//   if (code === 605) {
//     window.location.href = '/nokey?response='+JSON.stringify(response)
//   }
//   if (code === 401 || code === 501) {
//     //todo 是否跳转到登录页面
//     msg = '你已经登出或登录已超时，请重新登录。'
//     message.error(msg, 5)
//     store.dispatch('user/userLogout')
//     localStorage.setItem(ACCESS_TOKEN, '')
//     // 如果为内网，预生产环境 则 执行 ticket 登录
//     const networkType = ['nw', 'sw']
//     // # 测试代码 START
//     // if (process.env.NODE_ENV === 'development') networkType.push('beida')
//     // # 测试代码 END
//     if (networkType.includes(G.ENV.environment.networkType)) {
//       store.dispatch(
//         'global/openLogin',
//         { toUrl: window.location.pathname + window.location.search }
//       )
//     } else {
//       // 如果不为内网、预生产环境则，走账密登录，保存现有 登录逻辑
//       // 如果是iframe引入页面触发事件
//       if ( window.location.href.indexOf('iframe=1') !== -1) {
//         if (window.parent && window.parent.postMessage) {
//           window.parent.postMessage(
//             {
//               cmd: 'login',
//             },
//             '*'
//           );
//         }
//       }
//       window.location.href = "/login"
//     }
//     return
//   } else if (response.type === 'application/octet-stream') {
//     // 流文件处理
//     return Promise.resolve(response)
//   } else if(![602].includes(code) && (code < 700 || code >= 800)) {
//     //通用错误提示
//     message.error(msg)
//   }
//   return Promise.reject(response)
// }

// 提供安装方法
const reqMethods = (options => {
  console.log('[ options ] >', options)
  const req = reqMapSet(request, options)
  return {
    install (app) {
      app.config.globalProperties.$http = req
    }
  }
})
export { reqMethods }