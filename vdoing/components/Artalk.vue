<template>
  <div>
    <!-- 自定义评论 -->
    <h2 id="commentArea">评论</h2>
    <div id="Comments"></div>
  </div>
</template>

<script>
import "artalk/dist/Artalk.css";

export default {
  mounted() {
    if (typeof window != "undefined") {
      // 初始化Artalk
      this.initArtalk();
    }
  },
  methods: {
    initArtalk() {
      const ArtalkComponent = () => ({
        component: import("artalk"),
      });

      ArtalkComponent().component.then(function (result) {
        const Artalk = result.default;

        new Artalk({
          el: "#Comments",
          pageKey: "", // 页面链接
          pageTitle: "", // 页面标题
          server: "https://talk.xuqilong.top", // 后端地址
          site: "程序员 Life",
        });
      });
    },
  },
};
</script>
