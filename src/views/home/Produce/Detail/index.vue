<template>
  <div class="detail-box">
    <Item
      v-for="(item, index) in data"
      :key="item.id"
      :id="item.id"
      :title="item.name"
      :desc="item.desc"
      :isTop="index % 2"
    />
  </div>
</template>

<script setup>
import {} from 'vue'
import Item from './components/Item.vue'

const data = [
  {
    id: 1,
    name: '种子阶段',
    desc: '大果型西瓜品种国牛一号'
  },
  {
    id: 2,
    name: '种植阶段',
    desc: '怀化市会同县坪村镇铺平村种植基地一号大棚'
  },
  {
    id: 3,
    name: '加工阶段',
    desc: '昆明晨农集团有限公司'
  },
  {
    id: 4,
    name: '批发商',
    desc: '长沙湾蔬菜批发市场'
  }
]
</script>

<style scoped lang="less">
.detail-box {
  margin: 0 auto;
  width: 1200px;
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
}
</style>
