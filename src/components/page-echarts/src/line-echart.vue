<template>
  <div class="line-echart">
    <hy-echarts :options="options"></hy-echarts>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { IDataType2 } from '../types'
import HyEcharts from '@/base-ui/echarts'
import { EChartsOption } from 'echarts'
export default defineComponent({
  components: {
    HyEcharts
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    lineData: {
      type: Object as PropType<IDataType2>,
      required: true
    }
  },
  setup(props) {
    const options = computed<EChartsOption>(() => {
      return {
        title: {
          text: props.title
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {},
        toolbox: {
          feature: {
            savAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: props.lineData.xLabels
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '销量',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: props.lineData.values
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
