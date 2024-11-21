<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

export default defineComponent({
  components: { Line },
  props: {
    hourlyForecast: {
      type: Array as () => Array<{ datetime: string; temp: number; weather: { description: string }; clouds: number }>,
      required: true,
    },
  },
  computed: {
    mappedHourlyForecast() {
      return this.hourlyForecast.map((item) => ({
        timestamp_local: item.datetime,
        temp: item.temp,
        clouds: item.clouds,
      }));
    },
    chartData() {
      const labels = this.mappedHourlyForecast.map((hour) => {
        const date = new Date(hour.timestamp_local);
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      });

      const tempData = this.mappedHourlyForecast.map((hour) => hour.temp);
      const cloudData = this.mappedHourlyForecast.map((hour) => hour.clouds);

      return {
        labels,
        datasets: [
          {
            label: "Temperature (°C)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            data: tempData,
            fill: false,
          },
          {
            label: "Clouds (%)",
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            data: cloudData,
            fill: false,
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: "Time",
            },
          },
          y: {
            title: {
              display: true,
              text: "Value",
            },
            beginAtZero: true,
          },
        },
      };
    },
  },
});
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 400px;
  width: 100%;
}
@media (max-width: 1500px) {
  .weather-table {
    font-size: 0.85rem;
  }
  .days-weather {
    padding: 10px;
  }
  .home-content {
    margin: 2% 4% 2% 4%;
  }
}
@media (max-width: 1200px) {
  .favorite-city {
    grid-template-columns: repeat(1, 1fr);
  }
  .favorite-city p {
    padding: 1.5rem;
    font-size: 0.875rem;
  }
  .days-weather {
    width: 30%;
  }
}
@media (max-width: 1000px) {
  td {
    padding: 0;
  }
  .days-weather {
    width: 33%;
  }
  .userAvatar p {
    font-size: 1rem;
  }
  .home-content {
    margin: 2% 2% 2% 2%;
  }
}
@media (max-width: 900px) {
}
@media (max-width: 768px) {
  .favorite-city {
    grid-template-columns: repeat(1, 1fr);
  }
  .favorite-city p {
    padding: 1.5rem;
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .favorite-city p {
    padding: 1rem;
    font-size: 0.75rem;
  }
}
</style>
