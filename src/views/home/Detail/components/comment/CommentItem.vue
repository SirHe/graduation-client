<template>
  <div class="comment-item-box">
    <div
      class="img-box"
      :style="{
        width: size === 'common' ? '50px' : '25px',
        height: size === 'common' ? '50px' : '25px'
      }"
    >
      <img :src="author.avatar" alt="" />
    </div>

    <div class="comment-main">
      <div class="user-box">
        <h3>{{ author.name }}</h3>

        <div class="rely-box" v-if="receiver">
          <div class="descriptor">回复</div>
          <h3>{{ receiver.name }}</h3>
        </div>
      </div>

      <div class="content">{{ comment }}</div>
      <el-tag size="large" type="info" class="raw-content" v-if="receiver">
        {{ receiver.comment }}
      </el-tag>

      <ul class="action-box">
        <li
          class="action-item"
          @click="handleToStar"
          :class="starObj.isStar ? 'is-active' : ''"
        >
          <i class="iconfont icon-dianzan_kuai" v-if="starObj.isStar" />
          <i class="iconfont icon-31dianzan" v-else />
          {{ star }}
        </li>
        <li
          class="action-item"
          @click="toggleIsReply"
          :class="replyObj.isReply ? 'is-active' : ''"
        >
          <div v-if="replyObj.isReply">
            <i class="iconfont icon-pinglun1" />
            取消回复
          </div>
          <div v-else>
            <i class="iconfont icon-pinglun" />
            {{ replyCount > 0 ? replyCount : '' }}
          </div>
        </li>
      </ul>

      <Reply
        v-if="replyObj.isReply"
        v-model:content="replyObj.content"
        @reply="onReply"
        @close="toggleIsReply"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import Reply from '../Reply.vue'

defineProps({
  author: {
    type: Object,
    required: true
    // {
    //   id:'',
    //   avatar:'',
    //   name:'',
    // }
  },
  receiver: {
    type: Object
    // {
    //   id:'',
    //   name:'',
    //   comment:'',
    // }
  },
  comment: {
    type: String,
    required: true
  },
  star: {
    type: Number,
    default() {
      return 0
    }
  },
  replyCount: {
    type: Number,
    default() {
      return 0
    }
  },
  size: {
    type: String,
    validator(value) {
      return ['common', 'small'].includes(value)
    },
    default() {
      return 'common'
    }
  }
})

// 评论点赞
const starObj = ref({
  isStar: false
})
const handleToStar = () => {
  starObj.value = {
    ...starObj.value,
    isStar: !starObj.value.isStar
  }
}

// 评论回复
const replyObj = ref({
  isReply: false,
  content: ''
})
const toggleIsReply = () => {
  replyObj.value.isReply = !replyObj.value.isReply
}
const onReply = () => {
  replyObj.value.isReply = false
}
</script>

<style scoped lang="less">
.comment-item-box {
  display: flex;

  .img-box {
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .comment-main {
    padding-left: 20px;
    flex: 1;
    & > * {
      margin-top: 8px;
    }

    .user-box {
      display: flex;
      line-height: 26px;

      .rely-box {
        display: flex;

        .descriptor {
          color: #8a919f;
          padding: 0 12px;
        }
      }
    }

    .content {
      line-height: 26px;
      color: #515767;
    }

    .raw-content {
      width: 100%;
      justify-content: left;
    }

    .action-box {
      display: flex;
      color: #8a919f;
      margin-top: 8px;
      font-size: 12px;
      line-height: 20px;
      user-select: none;

      .action-item {
        margin-right: 15px;
        cursor: pointer;
      }
    }
  }
}

.is-active {
  color: #feb800;
}
</style>
