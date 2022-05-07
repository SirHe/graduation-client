<template>
  <div>
    <h3>安全设置</h3>
    <ul class="safety-box">
      <li class="safety-item">
        <div>
          <h5 class="list-item-title">账号密码</h5>
          <div class="list-item">当前密码强度：{{ safety.passwordLevel }}</div>
        </div>
        <el-button>修改</el-button>
      </li>
      <li class="safety-item">
        <div>
          <h5 class="list-item-title">密保手机</h5>
          <div class="list-item">已绑定手机号：{{ safety.phone }}</div>
        </div>
        <el-button>修改</el-button>
      </li>
      <li class="safety-item">
        <div>
          <h5 class="list-item-title">密保问题</h5>
          <div class="list-item" v-if="safety.question">已设置密保问题</div>
          <div class="list-item" v-else>
            未设置密保问题，密保问题可有效保护账户安全
          </div>
        </div>
        <el-button>修改</el-button>
      </li>
      <li class="safety-item">
        <div>
          <h5 class="list-item-title">密保邮箱</h5>
          <div class="list-item">已绑定邮箱：{{ safety.email }}</div>
        </div>
        <el-button>修改</el-button>
      </li>
      <li class="safety-item">
        <div>
          <h5 class="list-item-title">绑定设备</h5>
          <div class="list-item">未绑定安全设备</div>
        </div>
        <el-button>修改</el-button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const safety = ref({
  passwordLevel: '强',
  phone: '152****1645',
  question: '',
  email: 'ant***sign.com',
  equipment: ''
})
</script>

<style scoped lang="less">
.safety-box {
  padding: 20px 0;

  .safety-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    margin-bottom: 20px;

    .list-item-title {
      line-height: 25px;
    }

    .list-item {
      color: rgba(0, 0, 0, 0.45);
      line-height: 35px;
      padding-bottom: 15px;
    }
  }
}
</style>
