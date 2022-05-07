<template>
  <div class="list-box">
    <el-button type="primary" class="add-user-btn" @click="addUser">
      添加用户
    </el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="username" label="用户">
        <template #default="{ row: { username, avatar } }">
          <div style="display: flex; align-items: center">
            <el-avatar :size="size" :src="avatar"></el-avatar>
            <span style="margin-left: 10px">{{ username }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="role" label="用户角色"> </el-table-column>
      <el-table-column prop="state" label="用户状态">
        <template #default="{ row }">
          <el-switch
            v-model="row.state"
            inline-prompt
            active-text="正常"
            inactive-text="禁用"
            @change="onChangeUserState($event, row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="160">
        <template #default="{ row }">
          <el-button type="primary" @click="onEdit(row)">编辑</el-button>
          <el-button type="danger" @click="onDelete(row.id, row.username)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <adit-user-info v-model:visible="userInfo.isVisible" :info="userInfo" />
</template>

<script setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import AditUserInfo from './components/AditUserInfo.vue'

const userInfo = ref({
  isVisible: false,
  title: '添加用户',
  nickname: '',
  avatar: '',
  brief: '',
  phone: '',
  email: '',
  address: '',
  username: '',
  password: '',
  state: ''
})
const addUser = () => {
  userInfo.value.isVisible = true
}

const tableData = ref([
  {
    id: 123,
    username: '王小虎',
    nickname: '小虎',
    avatar:
      'https://img.wxcha.com/m00/e6/94/721ed594b4a0ffe84d9900fd8671e9e3.jpg',
    role: '',
    state: true
  }
])

const onDelete = async (id, username) => {
  try {
    await ElMessageBox.confirm(
      `你确定要删除<b style="color:red"> ${username} </b>用户吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }
    )

    // 确定删除
    tableData.value = tableData.value.filter((item) => item.id !== id)
  } catch (err) {}
}

const onChangeUserState = (state, id) => {
  console.log(state, id)
}

const onEdit = (info) => {}
</script>

<style scoped lang="less">
.list-box {
  padding: 20px;

  .add-user-btn {
    margin-bottom: 20px;
  }
}
</style>
