<template>
  <table class="weather-table days-table">
    <thead>
      <tr>
        <th>Day</th>
        <th>Temperature</th>
        <th>Weather</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(day, index) in forecastWeeks.slice(0, 20)" :key="index">
        <td>{{ day.valid_date.split("-")[2] }}.{{ day.valid_date.split("-")[1] }}</td>
        <td>{{ day.temp }}°C</td>
        <td>{{ day.weather.description }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
export default {
  props: {
    forecastWeeks: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style>
.weather-table {
  font-weight: 600;
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1rem;
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
