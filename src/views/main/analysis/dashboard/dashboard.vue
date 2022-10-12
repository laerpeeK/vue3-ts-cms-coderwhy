<template>
  <div class="dashboard">
    <div class="dashboard-graph">
      <el-row :gutter="10">
        <el-col :span="7">
          <hy-card title="分类商品数量(饼图)">
            <pie-echart :pieData="goodsCategoryCount"></pie-echart>
          </hy-card>
        </el-col>
        <el-col :span="10">
          <hy-card title="不同城市商品销量">
            <map-echart :mapData="goodsAddressSale"></map-echart>
          </hy-card>
        </el-col>
        <el-col :span="7">
          <hy-card title="分类商品销量(玫瑰图)">
            <rose-echart :roseData="goodsCategoryCount"></rose-echart>
          </hy-card>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="dashboard-graph__second">
        <el-col :span="12">
          <hy-card title="分类商品销量">
            <line-echart :lineData="goodsCategorySale"></line-echart>
          </hy-card>
        </el-col>
        <el-col :span="12">
          <hy-card title="分类商品收藏">
            <bar-echart :barData="goodsCategoryFavor"></bar-echart>
          </hy-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import {
  PieEchart,
  MapEchart,
  RoseEchart,
  LineEchart,
  BarEchart
} from '@/components/page-echarts'
import HyCard from '@/base-ui/card'
export default defineComponent({
  components: {
    HyCard,
    PieEchart,
    MapEchart,
    RoseEchart,
    LineEchart,
    BarEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('main/getDashBoardDataAction')

    //分类商品数量
    const goodsCategoryCount = computed(() => {
      return store.state.main.goodsCategoryCount.map((item) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    //不同城市商品销量
    const goodsAddressSale = computed(() => {
      return store.state.main.goodsAddressSale.map((item) => {
        return { name: item.address, value: item.count }
      })
    })

    //分类商品销量
    const goodsCategorySale = computed(() => {
      const xLabels: string[] = []
      const values: number[] = []
      const goodsCategorySaleRaw = store.state.main.goodsCategorySale
      for (const item of goodsCategorySaleRaw) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })

    //分类商品收藏
    const goodsCategoryFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const goodsCategoryFavorRaw = store.state.main.goodsCategoryFavor
      for (const item of goodsCategoryFavorRaw) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })

    return {
      goodsCategoryCount,
      goodsAddressSale,
      goodsCategorySale,
      goodsCategoryFavor
    }
  }
})
</script>
<style lang="scss">
.dashboard {
  padding: 2rem;
}

.dashboard-graph__second {
  margin-top: 2rem;
}
</style>
