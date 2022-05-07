<template>
  <div class="comment-box" ref="commentRef">
    <h2>评论</h2>
    <div class="my-comment-box">
      <div class="img-box">
        <img
          src="https://p9-passport.byteacctimg.com/img/user-avatar/617a249465bc2d04d775cdad09abd092~300x300.image"
          alt=""
        />
      </div>
      <div class="comment">
        <Reply
          v-if="commentArticle.isShow"
          v-model:content="commentArticle.content"
          @reply="onReply"
          @close="toggleCommentArticleIsShow"
        />
        <div class="comment-item" v-else @click="toggleCommentArticleIsShow">
          {{ commentArticle.content || commentArticle.placeholder }}
        </div>
      </div>
    </div>

    <div>
      <h3>热门评论</h3>
      <comment-item
        :author="commentList.author"
        :receiver="commentList.receiver"
        :comment="commentList.content"
        :star="commentList.star"
        :replyCount="commentList.reply_list.length"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CommentItem from './CommentItem.vue'
import Reply from '../Reply.vue'

const commentList = ref({
  author: {
    id: 123,
    name: '北鸟',
    avatar:
      'https://p6-passport.byteacctimg.com/img/user-avatar/970f66bc181fc5e76f7f9d11ec3f2ea9~300x300.image'
  },
  content: '定义数组请用const',
  star: 6,
  receiver: {
    id: 456,
    name: '无问',
    comment: '“掘金老哥一个比一个严谨[看]”'
  },
  reply_list: []
})

const commentArticle = ref({
  isShow: false,
  placeholder: '输入评论（Enter换行，⌘ + Enter发送）',
  content: ''
})
const toggleCommentArticleIsShow = () => {
  commentArticle.value.isShow = !commentArticle.value.isShow
}
const onReply = () => {}
</script>

<style scoped lang="less">
.comment-box {
  padding: 35px;
  background: #fff;

  .my-comment-box {
    padding: 20px 0;
    display: flex;

    .img-box {
      width: 50px;
      height: 50%;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .comment {
      flex: 1;
      padding-left: 25px;

      .comment-item {
        border-radius: 5px;
        background-color: #f2f3f5;
        height: 52px;
        padding: 8px 12px;
        line-height: 22px;
        box-sizing: border-box;
        font-size: 14px;
        color: #909399;
        cursor: pointer;
      }
    }
  }
}
</style>
