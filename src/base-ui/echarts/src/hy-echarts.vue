<template>
  <div class="hy-echarts">
    <div ref="echartsDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEcharts from '../hooks/use-echarts'
export default defineComponent({
  props: {
    options: {
      type: Object as PropType<EChartsOption>,
      required: true
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '360px'
    }
  },
  setup(props) {
    const echartsDivRef = ref<HTMLElement>()

    onMounted(() => {
      const { setOptions } = useEcharts(echartsDivRef.value!)
      watchEffect(() => {
        setOptions(props.options)
      })
    })

    return {
      echartsDivRef
    }
  }
})
</script>
<style lang="scss"></style>
