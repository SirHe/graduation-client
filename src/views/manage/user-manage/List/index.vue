<template>
  <div class="list-box">
    <el-button type="primary" class="add-user-btn" @click="addUser">
      添加用户
    </el-button>
    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="username" label="用户">
        <template #default="{ row: { username, avatar } }">
          <div style="display: flex; align-items: center">
            <el-avatar :size="size" :src="avatar"></el-avatar>
            <span style="margin-left: 10px">{{ username }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="phone" label="电话"> </el-table-column>
      <el-table-column prop="enabled" label="用户状态">
        <template #default="{ row }">
          <el-switch
            v-model="row.enabled"
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
  <adit-user-info
    v-model:visible="userInfo.isVisible"
    :info="userInfo.info"
    :title="userInfo.title"
    :okText="userInfo.okText"
  />
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { ElMessageBox } from 'element-plus'
import { getUserList, deleteUser, toggleUserState } from '../../../../api/user'
import { STATIC_URL } from '../../../../constant'
import AditUserInfo from './components/AditUserInfo.vue'

const userInfo = ref({
  isVisible: false,
  title: '添加用户',
  info: {}
})
const addUser = () => {
  userInfo.value = {
    title: '添加用户',
    okText: '提交',
    isVisible: true,
    type: 'add'
  }
}

const userList = ref([])
onBeforeMount(async () => {
  const { data } = await getUserList(1, 1000)
  userList.value = data.map((user) => ({
    ...user,
    avatar: STATIC_URL + user.avatar,
    enabled: user.enabled === 1
  }))
})

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
    userList.value = userList.value.filter((item) => item.id !== id)
    deleteUser(id)
  } catch (err) {}
}

const onChangeUserState = (state, id) => {
  toggleUserState(id, state)
}

const onEdit = (info) => {
  userInfo.value = {
    title: '编辑用户',
    okText: '提交',
    isVisible: true,
    info,
    type: 'alter'
  }
}
</script>

<style scoped lang="less">
.list-box {
  padding: 20px;

  .add-user-btn {
    margin-bottom: 20px;
  }
}
</style>
