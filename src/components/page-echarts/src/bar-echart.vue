<template>
  <div class="bar-echart">
    <hy-echarts :options="options"></hy-echarts>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { IDataType2 } from '../types/index'
import { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import HyEcharts from '@/base-ui/echarts'
export default defineComponent({
  components: {
    HyEcharts
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    barData: {
      type: Object as PropType<IDataType2>,
      required: true
    }
  },
  setup(props) {
    const options = computed<EChartsOption>(() => {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        xAxis: {
          data: props.barData.xLabels,
          axisLabel: {
            inside: true,
            color: '#fff'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: props.barData.values
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
