<template>
  <div class="detail-box">
    <main class="main-box">
      <div class="article-box">
        <h1 class="title">
          {{ article?.title }}
        </h1>
        <div class="author-box">
          <div style="display: flex; align-items: center">
            <div class="img-box">
              <img :src="article?.author.avatar" alt="" />
            </div>
            <ul>
              <li>{{ article?.author.name }}</li>
              <li>{{ article?.date }}· 阅读 {{ article?.pageviews }}</li>
            </ul>
          </div>
          <el-button type="primary">+ 关注</el-button>
        </div>
        <div class="cover-img-box">
          <img :src="article?.cover" alt="" />
        </div>
        <div class="content-box" v-html="article?.content"></div>
      </div>
      <Comment />

      <Panel @showComment="handleToShowComment" />
    </main>
    <aside class="aside-box">
      <Author :author="article?.author" />
      <Related :articleId="article?.id" style="margin-top: 20px" />
    </aside>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { STATIC_URL } from '../../../constant'
import { getArticleDetail } from '../../../api/article'
import Comment from './components/comment'
import Panel from './components/panel'
import Author from './components/Author.vue'
import Related from './components/related'

const route = useRoute()

// const article = ref({
//   id: '123456789',
//   title: '大部分前端都可能搞错的基础问题？（forEach会不会修改原数组）',
//   author: {
//     id: '',
//     name: '云木',
//     brief: '本人很懒，什么也没写！',
//     avatar:
//       'https://p9-passport.byteacctimg.com/img/user-avatar/82607f8bc7f5189137154b439deb31de~300x300.image'
//     // star: 999,
//     // pageviews: 9999
//   },
//   cover:
//     'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc62b8a734854b89a2924864bd9c5acf~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?',
//   content: '<p>hhh-test</p>',
//   date: '2022年04月17日 22:28',
//   star: 123,
//   pageviews: 12345
// })

const article = ref(null)
onBeforeMount(async () => {
  const { id } = route.params
  const { data } = await getArticleDetail(id)
  article.value = {
    ...data,
    author: {
      id: data.author_id,
      name: data.author_name,
      brief: data.author_brief,
      avatar: STATIC_URL + data.author_avatar
    },
    cover: STATIC_URL + data.cover
  }
  console.log(data)
})

// 显示评论区
const commentRef = ref()
const handleToShowComment = () => {
  commentRef.value.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'nearest'
  })
}

const recommendList = ref([
  {
    id: 123,
    title: 'test1'
  }
])
</script>

<style scoped lang="less">
.detail-box {
  max-width: 1140px;
  margin: 20px auto;
  position: relative;
  display: flex;

  .main-box {
    flex: 1;
    max-width: 820px;

    .article-box {
      padding: 35px;
      background: #fff;
      margin-bottom: 20px;

      .author-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0;

        .img-box {
          width: 50px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 15px;

          img {
            width: 100%;
          }
        }
      }

      .cover-img-box {
        padding: 20px 0;
        img {
          width: 100%;
        }
      }

      ::v-deep .content-box img {
        max-width: 100%;
      }
    }
  }

  .aside-box {
    width: 300px;
    margin-left: 20px;

    .recommend-box {
      margin-top: 20px;
      padding: 20px;
      background: #fff;
    }
  }
}
</style>
