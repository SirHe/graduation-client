<template>
  <div class="produce-home-box">
    <Item
      class="item-box"
      v-for="{ id, pic, title, desc, base, shed } in productList"
      :key="id"
      :id="id"
      :img="pic"
      :title="title"
      :desc="desc"
      :base="base"
      :shed="shed"
    />
  </div>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="0"
    style="padding: 20px"
  />
</template>

<script setup>
import { ref } from 'vue'
import Item from './components/Item.vue'
import product from '../../../../data/product.json'

const productList = ref(
  product.map((item) => ({
    ...item,
    pic: require('../../../../assets/images/product/' + item.pic)
  }))
)
</script>

<style scoped lang="less">
.produce-home-box {
  display: flex;
  .item-box {
    background: #fff;
    border-radius: 10px;
  }
}

@media screen and (min-width: 1200px) {
  .produce-home-box {
    padding-top: 20px;
    width: 1200px;
    margin: auto;
  }
}
@media (min-width: 768px) and (max-width: 1199px) {
  .agriculture-box {
    .card-box {
      .card-item {
        max-width: 360px;
      }
    }
  }
}
@media (max-width: 767px) {
  .agriculture-box {
    .card-box {
      .card-item {
        max-width: 100%;
      }
    }
  }
}
</style>
