<template>
  <div>
    <el-button type="primary" @click="goPage(1)">封装请求方法</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goPage = (num) => {
  let goPath = ''
  switch (num) {
    case 1:
      goPath = '/req'
      break
    default:
      break
  }
  router.push(goPath)
}
</script>

<style lang="scss" scoped>

</style>