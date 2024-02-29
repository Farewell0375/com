import { reqMethods } from './index.js'
import { pathMap } from './pathMap.js'


const reqExample = reqMethods({
  baseURL: 'https://mock.presstime.cn/mock/65e0a19c709c8f8aca7e4d78/comstore',
  pathMap
})

export default {
  install (app) {
    app.use(reqExample)
  }
}