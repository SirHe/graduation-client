<template>
  <div class="comment-item-box">
    <div class="avatar-box">
      <img :src="avatar" alt="" />
    </div>
    <ul class="detail-box">
      <h4 class="title-box">{{ authorName }}</h4>
      <li class="comment-box">
        {{ recipientName ? '回复' : '' }}
        <h4 class="name-box">{{ recipientName ? recipientName : '' }}</h4>
        {{ recipientName ? '：' : '' }}
        {{ comment }}
      </li>
      <li class="bottom-box">
        <div class="time-box">{{ time }}</div>
        <ul class="tools-box">
          <i class="iconfont icon-jubao"></i>
          <i
            class="iconfont icon-pinglun"
            @click="onComment"
            :class="{ 'is-active': state.isSelectComment }"
          />
          <i class="iconfont icon-31dianzan"></i>
        </ul>
      </li>
      <Reply
        v-model:visible="state.isSelectComment"
        :authorName="authorName"
        :authorId="authorId"
        :parentId="parentId"
      />
      <slot />
    </ul>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { article } from '../../../../../constant'
import Reply from './Reply.vue'

defineProps({
  avatar: {
    type: String,
    required: true
  },
  authorId: {
    type: String
  },
  authorName: {
    type: String,
    required: true
  },
  recipientName: {
    type: String
  },
  comment: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  star: {
    type: Number,
    required: true
  },
  parentId: {
    type: String
  }
})

const state = ref({
  isSelectComment: false
})
const onComment = () => {
  state.value.isSelectComment = true
}
</script>

<style scoped lang="less">
.comment-item-box {
  display: flex;
  color: #666;
  padding: 15px 0;

  .avatar-box {
    flex: 0 0 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  h4 {
    color: #333;
  }

  .detail-box {
    padding-left: 20px;
    flex: 1;

    .title-box {
      line-height: 25px;
    }

    .comment-box {
      line-height: 45px;

      .name-box {
        display: inline-block;
      }
    }

    .bottom-box {
      display: flex;
      justify-content: space-between;

      .tools-box {
        display: flex;
        i {
          margin: 0 20px;
          cursor: pointer;
        }
      }
    }
  }
}

.is-active {
  color: #feb800;
}

@media (max-width: 767px) {
  .comment-item-box {
    .detail-box {
      .bottom-box {
        .time-box {
          display: none;
        }
      }
    }
  }
}
</style>
