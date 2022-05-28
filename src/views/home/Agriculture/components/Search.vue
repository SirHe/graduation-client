<template>
  <div class="search-box">
    <el-autocomplete
      size="large"
      v-model="key"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入关键字"
      @select="onSearchTips"
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
import { searchArticle } from '../../../../api/article'

const emits = defineEmits(['onSearch'])
const key = ref('')
const keywords = ref('')
const onSearchTips = ({ value }) => {
  keywords.value = value
}
const onSearch = () => {
  emits('onSearch', keywords.value)
}

const querySearchAsync = async (key) => {
  if (!key) return []
  const { data } = await searchArticle(key, 0, true)
  return data.map(({ id, title }) => ({ value: title, id }))
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
