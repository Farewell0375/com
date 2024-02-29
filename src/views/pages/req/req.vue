<template>
  <div>
    <el-button @click="testReq">req</el-button>
  </div>
</template>

<script setup>
// 获取当前实例
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const testReq = () => {
  proxy.$http({
    url: 'https://mock.presstime.cn/mock/65e0a19c709c8f8aca7e4d78/comstore/getBaseData',
    method: 'post',
    paramType: 'params'
  }, {
    id: 1
  }).then(res => {
    console.log(res)
  })
}
</script>

<style lang="scss" scoped>

</style>