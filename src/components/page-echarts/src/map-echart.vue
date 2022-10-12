<template>
  <div class="map-echart">
    <hy-echarts :options="options"></hy-echarts>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import HyEcharts from '@/base-ui/echarts'
import { IDataType } from '../types'
import { EChartsOption } from 'echarts'
import { convertData } from '../utils'

export default defineComponent({
  components: {
    HyEcharts
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    mapData: {
      type: Array as PropType<IDataType[]>,
      required: true
    }
  },
  setup(props) {
    const options = computed<EChartsOption>(() => {
      return {
        backgroundColor: '#fff',
        title: {
          text: '全国商品销量统计',
          left: 'center',
          textStyle: {
            color: '#222'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params: any) {
            return params.name + ' : ' + params.value[2]
          }
        },
        visualMap: {
          min: 0,
          max: 60000,
          left: 20,
          bottom: 20,
          calculable: true,
          text: ['高', '低'],
          inRange: {
            color: [
              'rgb(70, 240, 252)',
              'rgb(250, 220, 46)',
              'rgb(245, 38, 186)'
            ]
          },
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: 'china',
          roam: 'scale',
          emphasis: {
            areaColor: '#f4cccc',
            borderColor: 'rgb(9, 54, 95)',
            itemStyle: {
              areaColor: '#f4cccc'
            }
          }
        },
        series: [
          {
            name: '销量',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(props.mapData),
            symbolSize: 12,
            emphasis: {
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
              }
            }
          },
          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            aspectScale: 0.75,
            tooltip: {
              show: false
            }
          }
        ]
      }
    })

    return {
      options
    }
  }
})
</script>
