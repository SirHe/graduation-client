<template>
  <div>
    <h3>基本设置</h3>
    <div class="form-box">
      <el-form
        label-position="top"
        label-width="100px"
        :model="formState"
        class="form"
      >
        <el-form-item label="邮箱">
          <el-input v-model="formState.email" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formState.nickname" />
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input v-model="formState.brief" type="textarea" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="formState.phone" />
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="formState.address" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>

      <div class="avatar-box">
        <div class="img-box">
          <img :src="formState.avatar" alt="" />
        </div>
        <el-upload
          class="upload-box"
          :on-change="onChange"
          :limit="1"
          :auto-upload="false"
          :show-file-list="false"
          accept=".jpg,.png,.jpeg"
        >
          <template #trigger>
            <el-button type="primary" class="avatar-button">修改头像</el-button>
          </template>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { STATIC_URL } from '../../../../../constant'
import { setInfo, getInfo } from '../../../../../api/user'

const formState = ref({
  email: '',
  nickname: '',
  brief: '',
  phone: '',
  address: '',
  avatar: '',
  avatarFile: ''
})
onBeforeMount(async () => {
  const { data } = await getInfo()
  formState.value = {
    ...data,
    avatar: STATIC_URL + data.avatar
  }
})

const onChange = (file) => {
  formState.value.avatarFile = file.raw
  formState.value.avatar = URL.createObjectURL(file.raw)
}

const onSubmit = () => {
  const formData = new FormData()
  const keys = Object.keys(formState.value)
  keys.forEach((key) => {
    if (key !== 'avatar') {
      formData.append(key, formState.value[key])
    }
  })
  setInfo(formData)
}
</script>

<style scoped lang="less">
.form-box {
  display: flex;
  padding: 20px 0;

  .form {
    width: 420px;
  }
  .avatar-box {
    width: 300px;

    .img-box {
      width: 200px;
      height: 200px;
      margin: auto;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    ::v-deep .upload-box {
      width: 100%;

      .el-upload {
        width: 100%;

        .avatar-button {
          display: block;
          margin: 20px auto;
        }
      }
    }
  }
}
</style>
