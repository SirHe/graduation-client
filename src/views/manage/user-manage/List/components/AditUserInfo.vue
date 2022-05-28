<template>
  <el-dialog append-to-body v-model="visible" :title="title" @close="onClose">
    <el-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      label-width="120px"
      class="form-box"
      :size="formSize"
    >
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          drag
          :show-file-list="false"
          :auto-upload="false"
          :limit="1"
          :on-change="onChangeAvatar"
        >
          <div class="container">
            <div class="img-box" v-if="formState.avatar">
              <img :src="formState.avatar" class="avatar" />
            </div>
            <i v-else class="iconfont icon-jia"></i>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formState.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          show-password
          maxlength="18"
          v-model="formState.password"
        />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="formState.nickname" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-select v-model="formState.role">
          <el-option
            v-for="[value, label] in Object.entries(roleMap)"
            :key="value"
            :label="label"
            :value="value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="个人简介">
        <el-input type="textarea" v-model="formState.brief" />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="formState.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formState.email" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input type="textarea" v-model="formState.address" />
      </el-form-item>
      <el-form-item label="用户状态">
        <el-switch
          v-model="formState.enabled"
          inline-prompt
          active-text="正常"
          inactive-text="禁用"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ okText }}</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import { isEmail, isPhone } from '../../../../../utils/validate'
import { addUser, alterUserInfo } from '../../../../../api/user'
import { roleMap } from '../../../../../constant/user'

const props = defineProps({
  visible: {
    type: Boolean
  },
  title: {
    type: String
  },
  info: {
    type: Object,
    default() {
      return {
        avatar: '',
        username: '',
        password: '',
        role: '',
        nickname: '',
        brief: '',
        phone: '',
        email: '',
        address: '',
        state: ''
      }
    }
  },
  okText: {
    type: String,
    default() {
      return '添加'
    }
  },
  type: {
    type: String
  }
})

const emits = defineEmits(['update:visible'])
const onClose = () => {
  emits('update:visible', false)
}

const checkPhone = (rule, value, callback) => {
  if (!value) {
    return callback()
  } else {
    if (isPhone(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的手机号'))
    }
  }
}
const checkEmail = (rule, value, callback) => {
  if (!value) {
    return callback()
  } else {
    if (isEmail(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的邮箱'))
    }
  }
}
const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    { min: 6, max: 18, message: '密码至少未6位', trigger: 'blur' }
  ],
  phone: [{ validator: checkPhone, trigger: 'blur' }],
  email: [{ validator: checkEmail, trigger: 'blur' }]
}

const formState = ref(props.info)
watch(
  () => props.info,
  (value) => {
    formState.value = props.info
  }
)
const formRef = ref()
const onSubmit = async () => {
  console.log(props.type)
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      const formData = new FormData()
      const keys = Object.keys(formState.value)
      keys.forEach((key) => {
        if (key !== 'avatar') {
          formData.append(key, formState.value[key])
        }
      })
      if (props.type === 'add') {
        addUser(formData)
      }

      onReset()
      onClose()
    } else {
      console.log('error submit!')
    }
  })
}

const onReset = () => {
  formRef.value.resetFields()
}

const onChangeAvatar = (file) => {
  formState.value.avatar = URL.createObjectURL(file.raw)
  formState.value.avatarFile = file.raw
}
</script>

<style scoped lang="less">
.form-box {
  padding-right: 50px;

  .avatar-uploader {
    ::v-deep .el-upload {
      width: 100px;
      height: 100px;

      .el-upload-dragger {
        width: 100%;
        height: 100%;
      }
    }
    .container {
      display: flex;
      width: 100px;
      height: 100px;
      justify-content: center;
      align-items: center;
      .img-box {
        width: 100px;
        height: 100px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
<style>
.el-dialog {
  display: flex;
  display: -ms-flex; /* 兼容IE */
  flex-direction: column;
  -ms-flex-direction: column; /* 兼容IE */
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
.el-dialog .el-dialog__body {
  max-height: 100%;
  flex: 1;
  -ms-flex: 1 1 auto; /* 兼容IE */
  overflow-y: auto;
  overflow-x: hidden;
}

.el-dialog__wrapper {
  /*隐藏ie和edge中遮罩的滚动条*/
  overflow: hidden;
}
</style>
