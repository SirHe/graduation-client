<template>
  <div class="detail-box">
    <Item
      v-for="(item, index) in data"
      :key="item.id"
      :id="item.id"
      :img="item.pic"
      :title="item.name"
      :desc="item.desc"
      :isTop="index % 2"
    />
  </div>
</template>

<script setup>
import {} from 'vue'
import { useRoute } from 'vue-router'
import Item from './components/Item.vue'
import product from '../../../../data/product.json'

const route = useRoute()
const id = route.params.id
const data = product
  .find((item) => item.id === Number(id))
  .detail.map((item) => ({
    ...item,
    pic: require('../../../../assets/images/product/' + item.pic)
  }))
</script>

<style scoped lang="less">
.detail-box {
  margin: 0 auto;
  width: 1200px;
  padding: 20px 0;
  display: flex;
  // flex-wrap: wrap;
  overflow-x: auto;
}
</style>
