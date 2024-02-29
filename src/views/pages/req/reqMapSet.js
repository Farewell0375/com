const reqTypeList = ['get', 'post', 'file'] // 允许的请求类型
// 接收初始化过的axios实例和options
const reqMapSet = (axios, options) => {
  let { baseURL, pathMap } = options // 从接口配置文件解析pathMap
  const req = (reqConfig, parameter) => {
    debugger
    // reqConfig { url: 'xxx', method: 'get | post | file', paramType: 'params | data' }
    // reqConfig分为两种模式
    // 1.string类型 例如：post_xxx 会自动匹配到pathMap中的post_xxx，
    // 2.object类型 例如：{ url: 'xxx', method: 'post' } 这时会进行自定义请求的发送
    if (typeof reqConfig === 'object') {
      if (!reqConfig.url) {
        return console.error('请输入自定义请求url')
      }
      if (!reqConfig.method) {
        reqConfig.method = 'post'
      }
      // 然后执行自定义请求的方案
      return selectReqType(reqConfig, reqConfig.method, parameter, '自定义请求')
    }
    // 如果是string类型 则执行默认的请求
    // 先检测reqConfig格式是否正确
    const reg = new RegExp(`^(${reqTypeList.join('|')})_`)
    if (!reg.test(reqConfig)) {
      return console.error(reqConfig + '请求名称映射失败，请以post_,get_,file_开头进行命名')
    }
    // 接下来走默认的请求方法
    // 如果存在对应的url 则执行
    const requestType = reqConfig.split('_')[0] // 获取请求类型
    if (pathMap[reqConfig]) {
      if (reqTypeList.includes(requestType)) {
        return selectReqType(pathMap[reqConfig], requestType, parameter, reqConfig)
      } else {
        return selectReqType(pathMap[reqConfig], 'post', parameter, reqConfig)
      }
    }
  }
  // 最后一步 拼接axios参数 并返回axios实例
  const selectReqType = (requestAddress, method, parameter, reqConfig) => {
    debugger
    if (typeof requestAddress === 'object') {
      // 自定义请求 只支持http和https开头的完整请求地址
      if (!requestAddress.url) {
        return console.error(reqConfig + '请求地址url不能为空')
      }
      baseURL = ''
    }
    // 解析请求参数
    let params = {
      url: ''
    }
    if (typeof requestAddress === 'object') {
      // 自定义请求读取对象内部的参数
      params = Object.assign(params, requestAddress)
      params.url = baseURL + requestAddress.url
    } else if (typeof requestAddress === 'string') {
      params.url = baseURL + requestAddress
    } else {
      return console.error(reqConfig + '请求地址url格式错误')
    }
    // 解析请求方式
    switch (method) {
      // get 一般使用params传参
      case 'get': {
        params = Object.assign(params, {
          method: 'get',
          params: parameter
        })
        break
      }
      // post可以用params， data传参 一般用data来传参
      case 'post': {
        // 这里分自定义的 和默认的
        // 自定义的主要是针对paramType 区分params传参还是data传参
        if (typeof requestAddress === 'object') {
          if (requestAddress.paramType === 'params') {
            params = Object.assign(params, {
              method: 'post',
              params: parameter
            })
          } else {
            params = Object.assign(params, {
              method: 'post',
              data: parameter
            })
          }
        } else if (typeof requestAddress === 'string') {
          params = Object.assign(params, {
            method: 'post',
            data: parameter
          })
        }
        break
      }
      case 'file': {
        params = Object.assign(params, {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: parameter
        })
        break
      }
    }
    return axios(params)
  }
  return req
}
export default reqMapSet