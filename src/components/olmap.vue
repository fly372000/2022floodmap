
<template>
  <div id="map-container"
       style="width:100%;height:725px;">
    <div style="position:absolute;right:10px;top:70px;z-index:999;width:200px;">
      <!-- <el-tree :data="treeData2"
        show-checkbox node-key="id"
        @check-change="handleCheckChange2"
        ref="tree2" highlight-current>
      </el-tree> 
      <hr>-->
      <el-tree :data="treeData"
               :props="defaultProps"
               show-checkbox
               node-key="id"
               @check-change="handleCheckChange"
               ref="tree"
               highlight-current>
      </el-tree>
    </div>
  </div>
</template>
<script>
import { loadCss, loadModules } from 'esri-loader'
export default {
  name: 'MapServer',
  data () {
    return {
      SF311Layer: null,
      DamageAssessmentLayer: null,
      haveSublayers: null,
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      /* treeData2: [
         {
           label: 'StoryMapPlaces5',
           id: 'StoryMapPlaces5',
         },
         {
           label: 'StoryMapPlaces7',
           id: 'StoryMapPlaces7',
         },
       ], */
      treeData: [
        {
          label: '五年一遇淹没区',
          id: 0,
        },
        {
          label: '十年一遇淹没区',
          id: 1,
        },
        {
          label: '二十年一遇淹没区',
          id: 2,
        },
        {
          label: '五十年一遇淹没区',
          id: 3,
        },
        {
          label: '一百年一遇淹没区',
          id: 4,
        },
        {
          label: '历史最高淹没区',
          id: 5,
        },
      ],
      map: '',
      gisConstructor: {}, // gis 构造函数
      gisModules: [
        'dojo/_base/declare',
        'esri/layers/ArcGISTiledMapServiceLayer', // 切片服务图层
        'esri/layers/ArcGISDynamicMapServiceLayer', // 动态服务图层
        'esri/geometry/Extent', // 范围
        'esri/map',
      ],
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    /**
     * @name: 单个图层切换
     */
    /* handleCheckChange2() {
      let checked = this.$refs.tree2.getCheckedKeys()
      let allData = this.treeData2.map(item => item.label)
      allData.forEach(item => {
        let layer = this.map.getLayer(item)
        layer.setVisibility(false)
      })
      checked.forEach(item => {
        let layer = this.map.getLayer(item)
        layer.setVisibility(true)
      })
    }, */

    /**
     * @name: 图层切换（子图层）
     */
    handleCheckChange () {
      let checked = this.$refs.tree.getCheckedKeys()
      let layer = this.map.getLayer('DamageAssessment')
      layer.setVisibility(false)
      layer.setVisibility(true)
      layer.setVisibleLayers(checked)
    },

    /**
     * @name: 加载图层
     */
    loadLayersFun () {
      const layerList = [
        /* {
          url:
            'https://sampleserver6.arcgisonline.com/arcgis/rest/services/StoryMaps/StoryMapPlaces5/MapServer',
          id: 'StoryMapPlaces5',
          opacity: 1,
          visible: false,
          type: 'dynamic',
        },
        {
          url:
            'https://sampleserver6.arcgisonline.com/arcgis/rest/services/StoryMaps/StoryMapPlaces7/MapServer',
          id: 'StoryMapPlaces7',
          opacity: 1,
          visible: false,
          type: 'dynamic',
        }, */
        {
          url:
            'http://localhost:6080/arcgis/rest/services/flood/floodwebmap/MapServer',
          id: 'DamageAssessment',
          opacity: 0.5,
          visible: false,
          type: 'dynamic',
        },
      ]
      layerList.forEach(item => {
        if (item.type === 'dynamic') {
          let layer = new this.gisConstructor.ArcGISDynamicMapServiceLayer(
            item.url,
            {
              id: item.id,
              opacity: item.opacity || 1,
              visible: item.visible,
            }
          )
          this.map.addLayer(layer)
        }
      })

      let layer = this.map.getLayer('DamageAssessment')
      console.log(layer.layerInfos) // 通过 layerInfos 获取子服务失败，需要判断图层是否加载完成
      if (layer.loaded) {
        console.log(layer.layerInfos)
      } else {
        // eslint-disable-next-line no-undef
        dojo.connect(layer, 'onLoad', (layer) => {
          // 子图层数据加载完成可以动态设置 treeData
          console.log(layer.layerInfos)
        })
      }
    },

    /**
     * @name: 地图点击事件
     */
    mapClickFun () {
      this.map.on('click', event => {
        console.log(event)
      })
    },

    // 初始化地图
    init () {
      // 加载 css
      loadCss('https://js.arcgis.com/3.32/esri/css/esri.css')
      // 加载模块
      loadModules(this.gisModules, {
        url: 'https://js.arcgis.com/3.32/',
      })
        .then(this.initMap)
        .then(this.loadLayersFun)
        .then(this.mapClickFun)
    },
    initMap (args) {
      // 将 ArcGIS 的每个功能模块都存放到 gisConstructor 中
      for (let k in args) {
        let name = this.gisModules[k].split('/').pop()
        this.gisConstructor[name] = args[k]
      }

      this.map = new this.gisConstructor.map('map-container', {
        basemap: 'osm',
        logo: false,
        slider: true,
      })
      let extent = {
        xmin: 113.41668704461378,
        ymin: 34.624481046450924,
        xmax: 114.37894444149305,
        ymax: 35.062255290745455,
      }
      this.map.setExtent(
        new this.gisConstructor.Extent(
          extent.xmin,
          extent.ymin,
          extent.xmax,
          extent.ymax
        )
      )
    },
  },
}
</script>
