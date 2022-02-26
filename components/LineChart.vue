<script lang="ts" setup>
import { ExtractComponentData, LineChart } from "vue-chart-3";
import {
  Chart,
  Tooltip,
  ChartData,
  ChartOptions,
  LineController,
} from "chart.js";
Chart.register(Tooltip, LineController);
const data = ref([600, 400, 620, 300, 200, 600, 230, 300, 200, 200, 100, 1200]);
const lineRef = ref<ExtractComponentData<typeof LineChart>>();

const options = ref<ChartOptions<"line">>({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Total Investment",
    },
  },
});

const testData = computed<ChartData<"line">>(() =>
  // height: "366px",
  ({
    labels: [ "January", "February", "March", "April", "May", "June", "July", "Aug", "Sep", "Nov", "Dec", ],
    datasets: [
      {
        data: data.value,
        fill: false,
        pointBackgroundColor: "#4A5568",
        borderWidth: 3,
        pointBorderWidth: 4,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 8,
        pointHoverBorderColor: "rgb(74,85,104,0.2)",
        tension: 0.5,
      },
    ],
  })
);
</script>
<template>
  <div>
    <LineChart ref="lineRef" :chartData="testData" :options="options" />
  </div>
</template>
<style></style>
