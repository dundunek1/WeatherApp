<template>
  <table class="weather-table hours-table">
    <thead>
      <tr>
        <th>Hour</th>
        <th>Temperature</th>
        <th>Weather</th>
        <th>Clouds</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(hour, index) in hourlyForecast" :key="index">
        <td>{{ hour.datetime.split(":")[1] }}:00</td>
        <td>{{ hour.temp.toFixed(1) }}°C</td>
        <td>{{ hour.weather.description }}</td>
        <td>{{ hour.clouds }}%</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
interface Hour {
  datetime: string;
  temp: number;
  weather: {
    description: string;
  };
  clouds: number;
}

export default {
  props: {
    hourlyForecast: {
      type: Array as () => Hour[], // Define the type of the array elements
      required: true,
    },
  },
};
</script>

<style scoped>
.weather-table {
  font-weight: 600;
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1rem;
}
table {
  font-size: 1.2rem;
  height: 100%;
  width: 100%;
}
.table-wrapper {
  flex: 1;
  overflow: auto;
}
.hours-table th {
  color: #333;
  padding: 12px;
  text-align: center;
  border-bottom: 2px solid #ddd;
}

.days-table th {
  padding: 12px;
  text-align: center;
  border-bottom: 2px solid #9274f6;
}
.days-table td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #9274f6;
}
.hours-table td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
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
