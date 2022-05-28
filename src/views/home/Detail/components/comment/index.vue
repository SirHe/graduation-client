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
          :visible="true"
          :parentId="articleId"
        />
        <div class="comment-item" v-else @click="toggleCommentArticleIsShow">
          {{ commentArticle.content || commentArticle.placeholder }}
        </div>
      </div>
    </div>

    <div class="comments">
      <comment-item
        class="comment-item"
        v-for="{
          id,
          author_avatar,
          author_nickname,
          recipient_nickname,
          comment,
          create_time,
          star,
          children,
          author_id
        } in comments.list"
        :key="id"
        :id="id"
        :avatar="author_avatar"
        :authorId="author_id"
        :authorName="author_nickname"
        :recipientName="recipient_nickname"
        :comment="comment"
        :time="create_time"
        :star="star"
        :parentId="id"
      >
        <div class="child-comment-list" v-if="children.length > 0">
          <comment-item
            class="comment-item"
            v-for="{
              id,
              author_avatar,
              author_nickname,
              recipient_nickname,
              comment,
              create_time,
              star,
              parent_id,
              author_id
            } in children"
            :key="id"
            :id="id"
            :avatar="author_avatar"
            :authorId="author_id"
            :authorName="author_nickname"
            :recipientName="recipient_nickname"
            :comment="comment"
            :time="create_time"
            :star="star"
            :parentId="parent_id"
          />
        </div>
      </comment-item>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onBeforeMount } from 'vue'
import { getCommentList } from '../../../../../api/article'
import { STATIC_URL } from '../../../../../constant'
import { convertDate } from '../../../../../utils'
import CommentItem from './CommentItem.vue'
import Reply from './Reply.vue'

const props = defineProps({
  articleId: {
    type: String,
    required: true
  }
})

const comments = ref({
  page: 1,
  size: 5,
  list: [],
  total: 0
})

onBeforeMount(async () => {
  const { data, total } = await getCommentList(
    props.articleId,
    comments.value.page,
    comments.value.size
  )
  comments.value.list = data.map((item) => ({
    ...item,
    author_avatar: STATIC_URL + item.author_avatar,
    create_time: convertDate(item.create_time),
    star: parseInt(item.star),
    children: item.children.map((item) => ({
      ...item,
      author_avatar: STATIC_URL + item.author_avatar,
      create_time: convertDate(item.create_time),
      star: parseInt(item.star)
    }))
  }))
  comments.value.total = total
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

  .comments {
    .comment-item:not(:last-child) {
      border-bottom: 1px solid #f5f5f5;
    }

    .child-comment-list {
      padding: 0 10px;
      margin: 15px 0;
      background: #f2f3f5;
      position: relative;
      border-radius: 5px;

      &::after {
        position: absolute;
        content: '';
        width: 20px;
        height: 20px;
        background: #f2f3f5;
        top: 0px;
        left: 0px;
        margin-top: -10px;
        margin-left: 20px;
        transform: rotate(45deg);
      }
    }
  }
}
</style>
