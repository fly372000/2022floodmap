<template>
  <div class="wrap">
    <h4 class="title">vue动态播放本地视频</h4>
    <div class="flex">
      <div class="box">
        <p>一、import <button @click="play1"
                  class="play-btn">play1</button></p>
        <video controls
               ref="videoDom1"
               class="video-box"
               autoplay>
          <source src
                  type="video/mp4" />
        </video>
      </div>

      <div class="box">
        <p>二、require <button @click="play2"
                  class="play-btn">play2</button></p>
        <video controls
               ref="videoDom2"
               class="video-box"
               autoplay>
          <source src
                  type="video/mp4" />
        </video>
      </div>

      <div class="box">
        <p>三、a标签 <a :href="video2"
             target="_blank"
             class="play-btn">play3</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import video1 from "@/public/vidio/动画.mp4";
export default {
  name: "HelloWorld",
  data () {
    return {
      videoUrl1: "",
      videoUrl2: "",
      video2: require("@/public/vidio/动画.mp4")
    };
  },
  methods: {
    play1 () {
      this.$refs.videoDom1.src = video1;
    },
    play2 () {
      this.$refs.videoDom2.src = this.video2;
    }
  }
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  margin: 0 auto;
  width: 200px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
p {
  padding: 10px 8px;
  color: #fff;
  font-weight: bold;
  background: #465af5;
}
.play-btn {
  margin-left: 20px;
  display: inline-block;
  width: 120px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  background: #eee;
  border: 1px solid #cec5c5;

  &:hover {
    background: #f90;
  }
}
.box {
  width: 400px;
  height: 300px;
}
.video-box {
  width: 400px;
  height: 300px;
  border: 1px solid #eee;
}
</style>