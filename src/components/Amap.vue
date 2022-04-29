<template>
  <div class="amap">
    <!-- 地图容器 -->
    <div ref="amap"
         class="amap_view"></div>
    <!-- 搜索栏 -->
    <el-input id="map_input"
              v-model.trim="searchVal"
              placeholder="请输入查找地址"
              size="small"></el-input>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

export default {
  setup () {
    const amap = ref(null);
    const searchVal = ref("");
    let map = null;

    onMounted(() => {
      loadAMap();
    });

    onBeforeUnmount(() => {
      map && map.destroy();
      map = null;
    });

    const loadAMap = () => {
      AMapLoader.load({
        key: "e5761f5df1d30e2ffedee67d693ff590" /* Web端JS API key */,
        version: "2.0",
        plugins: ["AMap.Scale", "AMap.ToolBar"]
      })
        .then(AMap => {
          initMap(AMap);
        })
        .catch(e => {
          console.error(e);
        });
    };

    const initMap = AMap => {
      map = new AMap.Map(amap.value, {
        resizeEnable: true /* 城市定位 */,
        center: [113.62, 34.75],
        zooms: [1, 21],
        zoom: 4
      });

      // 比例尺
      map.addControl(new AMap.Scale());
      // 工具条
      map.addControl(new AMap.ToolBar());

      // 标记
      let maker = new AMap.Marker({
        title: "郑州市",
        position: map.getCenter()
      });
      map.add(maker);

      // 关键字搜索
      AMap.plugin(["AMap.PlaceSearch", "AMap.AutoComplete"], function () {
        let auto = new AMap.AutoComplete({ input: "map_input" });
        let placeSearch = new AMap.PlaceSearch({ map: map }); //构造地点查询类
        //注册监听，当选中某条记录时会触发
        auto.on("select", function (e) {
          placeSearch.setCity(e.poi.adcode);
          placeSearch.search(e.poi.name); //关键字查询查询
        });
      });
    };

    return { amap, searchVal };
  }
};
</script>

<style lang="scss" scoped>
.amap {
  width: 100%;
  height: 600px;
  border: 1px solid #ccc;
  position: relative;

  .amap_view {
    width: 100%;
    height: 725px;
  }
  .el-input {
    width: 256px;
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
