<template>

  <el-table :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName">

    <el-table-column prop="name"
                     label="行政区"
                     width="180" />
    <el-table-column prop="num"
                     label="行政区代码"
                     width="180" />
    <el-table-column prop="type"
                     label="行政区类型"
                     width="180" />
    <el-table-column prop="area"
                     label="淹没面积" />
    <el-table-column prop="data"
                     label="淹没区类型"
                     width="180" />
    <el-table-column prop="zhanbi"
                     label="淹没占比"
                     width="300" />
  </el-table>
</template>

<script lang="ts" setup>
interface User {
  name: string
  num: string
  type: string
  area: string
  data: string
  zhanbi: string
}

const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: User
  rowIndex: number
}) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}

const tableData: User[] = [
  {
    name: '管城回族区',
    num: '410104',
    type: '市辖区',
    area: '487.965653593182',
    data: '五年一遇',
    zhanbi: '2.3746%',
  },
  {
    name: '金水区',
    num: '410105',
    type: '市辖区',
    area: '521.734045908019',
    data: '五年一遇',
    zhanbi: '2.1506%',
  },
  {
    name: '中牟县',
    num: '410122',
    type: '县',
    area: '53974.15461062237',
    data: '五年一遇',
    zhanbi: '37.8091%',
  },
  {
    name: '管城回族区',
    num: '410104',
    type: '市辖区',
    area: '1015.2931612069062',
    data: '十年一遇',
    zhanbi: '4.9408%',
  },
  {
    name: '金水区',
    num: '410105',
    type: '市辖区',
    area: '1756.9620009280138',
    data: '十年一遇',
    zhanbi: '7.2424%',
  },
  {
    name: '中牟县',
    num: '410122',
    type: '县',
    area: '61945.604413911366',
    data: '十年一遇',
    zhanbi: '43.3932%',
  },
  {
    name: '管城回族区',
    num: '410104',
    type: '市辖区',
    area: '2204.225568995952',
    data: '二十年一遇',
    zhanbi: '10.7265%',
  },
  {
    name: '惠济区',
    num: '410108',
    type: '市辖区',
    area: '273.77830829611406',
    data: '二十年一遇',
    zhanbi: '1.1756%',
  },
  {
    name: '金水区',
    num: '410105',
    type: '市辖区',
    area: '9795.83355068216',
    data: '二十年一遇',
    zhanbi: '40.3796%',
  },
  {
    name: '新郑市',
    num: '410184',
    type: '县级市',
    area: '1.022532474792275',
    data: '二十年一遇',
    zhanbi: '0.0012%',
  },
  {
    name: '中牟县',
    num: '410122',
    type: '县',
    area: '73063.64720393368',
    data: '二十年一遇',
    zhanbi: '51.1814%',
  },
  {
    name: '管城回族区',
    num: '410104',
    type: '市辖区',
    area: '2558.5124608153415',
    data: '五十年一遇',
    zhanbi: '12.4506%',
  },
  {
    name: '惠济区',
    num: '410108',
    type: '市辖区',
    area: '839.3831429349759',
    data: '五十年一遇',
    zhanbi: '3.6042%',
  },
  {
    name: '金水区',
    num: '410105',
    type: '市辖区',
    area: '12342.81255908034',
    data: '五十年一遇',
    zhanbi: '50.8785%',
  },
  {
    name: '新郑市',
    num: '410184',
    type: '县级市',
    area: '1.5192315538317613',
    data: '五十年一遇',
    zhanbi: '0.0017%',
  },
  {
    name: '中牟县',
    num: '410122',
    type: '县',
    area: '74683.81066961463',
    data: '五十年一遇',
    zhanbi: '52.3163%',
  },
  {
    name: '管城回族区',
    num: '410104',
    type: '市辖区',
    area: '2821.5981722893926',
    data: '一百年一遇',
    zhanbi: '13.7309%',
  },
  {
    name: '惠济区',
    num: '410108',
    type: '市辖区',
    area: '1829.5928640755349',
    data: '一百年一遇',
    zhanbi: '7.8561%',
  },
  {
    name: '金水区',
    num: '410105',
    type: '市辖区',
    area: '14173.814174800029',
    data: '一百年一遇',
    zhanbi: '58.4261%',
  },
  {
    name: '新郑市',
    num: '410184',
    type: '县级市',
    area: '1.5192312470129807',
    data: '一百年一遇',
    zhanbi: '0.0017%',
  },
  {
    name: '中牟县',
    num: '410122',
    type: '县',
    area: '76128.70267174403',
    data: '一百年一遇',
    zhanbi: '53.3285%',
  },
  {
    name: '管城回族区',
    num: '410104',
    type: '市辖区',
    area: '3084.9810504401403',
    data: '历史最高',
    zhanbi: '15.0126%',
  },
  {
    name: '惠济区',
    num: '410108',
    type: '市辖区',
    area: '2907.598514122914',
    data: '历史最高',
    zhanbi: '12.4849%',
  },
  {
    name: '金水区',
    num: '410105',
    type: '市辖区',
    area: '15676.421559096292',
    data: '历史最高',
    zhanbi: '64.6201%',
  },
  {
    name: '新郑市',
    num: '410184',
    type: '县级市',
    area: '2.0304977912005286',
    data: '历史最高',
    zhanbi: '0.0023%',
  },
  {
    name: '中牟县',
    num: '410122',
    type: '县',
    area: '77368.24690740132',
    data: '历史最高',
    zhanbi: '54.1968%',
  },
]
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
