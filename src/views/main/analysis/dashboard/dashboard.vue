<template>
  <div class="dashboard">
    <!-- gutter是横向的间距 -->
    <el-row :gutter="10">
      <!-- 一行里是24份 -->
      <el-col :span="7">
        <hy-card title="分类商品数量(饼图)">
          <!-- :pieData="categoryGoodsCount"是把数据放过来 -->
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </hy-card>
      </el-col>
      <el-col :span="10">
        <hy-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </hy-card>
      </el-col>
      <el-col :span="7">
        <hy-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </hy-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <hy-card title="分类商品的销量">
          <!-- 要传两个属性，直接用v-bind -->
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </hy-card>
      </el-col>
      <el-col :span="12">
        <hy-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </hy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";

import HyCard from "@/base-ui/card";
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart,
} from "@/components/page-echarts";

export default defineComponent({
  name: "dashboard",
  components: {
    HyCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart,
  },
  setup() {
    const store = useStore();
    // 请求数据 在组件内部发起action，在vuex中发送网络请求，真正发送网络请求的地方是service
    store.dispatch("dashboard/getDashboardDataAction");

    // 获取数据
    const categoryGoodsCount = computed(() => {
      //用了computed才能保证vuex的数据请求下来，这里会发生更新
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        //这里的dashboard要在store的types里有才能.出来。后端接口给的数据格式是name和goodsCount，而不是name和value，可以用map做映射
        return { name: item.name, value: item.goodsCount };
      });
    });

    //折线图
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = [];
      const values: any[] = [];
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale;
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name);
        values.push(item.goodsCount);
      }
      return { xLabels, values };
    });

    //柱状图
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = [];
      const values: any[] = [];
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor;
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name); //name和goodsFavor是后端接口给的
        values.push(item.goodsFavor);
      }
      return { xLabels, values };
    });

    //地图
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }; //键值对的形式
      });
    });

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale,
    };
  },
});
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
