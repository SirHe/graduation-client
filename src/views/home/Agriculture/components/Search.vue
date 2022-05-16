<template>
  <div class="search-box">
    <el-autocomplete
      size="large"
      v-model="key"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入关键字"
      @select="onSearch"
      class="input-box"
    >
      <template #default="{ item }">
        <!-- 在渲染层做高亮，保持原数据的纯净 -->
        <div
          v-html="item.value.replace(key, `<b style='color: red'>${key}</b>`)"
        />
      </template>
    </el-autocomplete>
    <el-button type="primary" size="large" @click="onSearch">搜索</el-button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emits = defineEmits(['onSearch'])
const key = ref('')
const onSearch = (key) => {
  emits('onSearch', key)
}

// 测试数据
const TestdataSource = [
  {
    id: 1,
    value: '1'
  },
  {
    id: 2,
    value: '12'
  },
  {
    id: 3,
    value: '123'
  },
  {
    id: 4,
    value: '1234'
  },
  {
    id: 5,
    value: '12345'
  }
]
const loadingData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(TestdataSource)
    }, 500)
  })

const querySearchAsync = async (key, fn) => {
  if (!key) return fn([])
  let data = await loadingData()
  data = data.filter(({ value }) => value.indexOf(key) >= 0)
  // data = Array.isArray(data) ? data : []
  fn(data)
}
</script>

<style scoped lang="less">
.search-box {
  width: 600px;
  margin: 0 auto;
  display: flex;
  padding: 15px 0;

  ::v-deep .input-box {
    flex: 1;
    margin-right: 5px;
  }
}

.tips-box {
  ::v-deep b {
    color: red;
    display: inline;
  }
}

@media (max-width: 767px) {
  .search-box {
    width: 80%;
  }
}
</style>
