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
              <img :src="article?.author?.avatar" alt="" />
            </div>
            <ul>
              <li>{{ article?.author?.name }}</li>
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
      <Comment :articleId="article?.id" />

      <Panel @showComment="handleToShowComment" :article="article" />
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
import { getArticleDetail, addArticleStar } from '../../../api/article'
import Comment from './components/comment'
import Panel from './components/panel'
import Author from './components/Author.vue'
import Related from './components/related'

const route = useRoute()

const article = ref({
  id: route.params.id
})
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

@media screen and (min-width: 1200px) {
  .detail-box {
    max-width: 1020px;
    margin: 20px auto;
  }
}
@media (min-width: 768px) and (max-width: 1199px) {
  .detail-box {
    margin: 0 20px;
    .aside-box {
      display: none;
    }
  }
}
@media (max-width: 767px) {
  .detail-box {
    max-width: 100%;
    .main-box {
      width: 100%;
      .article-box {
        padding: 20px 5px;
      }
      .comment-box {
        padding: 20px 5px;
      }
    }

    .aside-box {
      display: none;
    }
  }
}
</style>
