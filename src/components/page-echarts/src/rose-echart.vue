<template>
  <div class="rose-echart">
    <hy-echarts :options="options"></hy-echarts>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { EChartsOption } from 'echarts'
import { IDataType } from '../types'
import HyEcharts from '@/base-ui/echarts'
export default defineComponent({
  components: {
    HyEcharts
  },
  props: {
    roseData: {
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
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: true },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '数量',
            type: 'pie',
            radius: [10, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: props.roseData
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
