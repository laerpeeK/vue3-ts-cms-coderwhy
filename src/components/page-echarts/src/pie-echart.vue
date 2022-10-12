<template>
  <div class="pie-echart">
    <hy-echarts :options="options"></hy-echarts>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import HyEcharts from '@/base-ui/echarts'
import { IDataType } from '../types'
import { EChartsOption } from 'echarts'
export default defineComponent({
  components: {
    HyEcharts
  },
  props: {
    pieData: {
      type: Array as PropType<IDataType[]>,
      required: true
    }
  },
  setup(props) {
    const options = computed<EChartsOption>(() => {
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          left: 'left'
        },
        series: [
          {
            name: '数量',
            type: 'pie',
            radius: '50%',
            data: props.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
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
<style lang="scss"></style>
