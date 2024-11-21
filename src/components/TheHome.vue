<template>
  <div class="home">
    <Toaster richColors position="top-center" />
    <header>
      <section>
        <input type="text" id="city" v-model="city" required placeholder="City" />
        <p @click="getWeather()">
          <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="search-icon">
            <path
              d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z"
              fill-rule="nonzero" />
          </svg>
        </p>
      </section>
      <div class="appName">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M21.192 6.221l-2.881 2.881c-.411-.528-.885-1.002-1.414-1.414l2.881-2.881 1.414 1.414zm-8.192-.152v-4.069h-2v4.069c.328-.041.66-.069 1-.069s.672.028 1 .069zm6.931 6.931c.041.328.069.66.069 1s-.028.672-.069 1h4.069v-2h-4.069zm-1.931 1c0 .342-.035.674-.09 1h-11.82c-.055-.326-.09-.658-.09-1 0-3.314 2.686-6 6-6s6 2.686 6 6zm-2.142-1c-.448-1.721-2.001-3-3.858-3-1.858 0-3.41 1.279-3.857 3h7.715zm-8.754-5.312l-2.881-2.881-1.415 1.414 2.881 2.881c.411-.529.885-1.003 1.415-1.414zm-7.104 5.312v2h4.069c-.041-.328-.069-.66-.069-1s.028-.672.069-1h-4.069zm22 6h-20v-2h20v2zm-3 3h-14v-2h14v2z" />
        </svg>
        <p>Weather<span class="black-part">App</span></p>
      </div>
      <div class="userAvatar">
        <p>Welcome, {{ userLogin }}</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" />
        </svg>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" @click="signOut" class="exit-btn">
          <path
            d="M11 21h8.033v-2l1-1v4h-9.033v2l-10-3v-18l10-3v2h9.033v5l-1-1v-3h-8.033v18zm-1 1.656v-21.312l-8 2.4v16.512l8 2.4zm11.086-10.656l-3.293-3.293.707-.707 4.5 4.5-4.5 4.5-.707-.707 3.293-3.293h-9.053v-1h9.053z" />
        </svg>
      </div>
    </header>
    <section class="home-content">
      <div class="result info-container">
        <div class="result-menu" v-if="hourlyForecast">
          <div class="weather-city">
            <h3 v-if="forecast">Weather Forecast for {{ selectedCity }}</h3>
          </div>
          <h3 class="toggle-weather-btn" @click="toggleChartWeather">{{ toggleWeatherTable ? "Chart" : "List" }}</h3>
          <h3 class="toggle-weather-btn" @click="toggleHoursWeather()">Check other days!</h3>
        </div>
        <div v-if="hourlyForecast" class="table-wrapper">
          <weather-table v-if="toggleWeatherTable" :hourlyForecast="hourlyForecast.data"></weather-table>
          <weather-chart v-else :hourlyForecast="hourlyForecast.data"></weather-chart>
        </div>
        <div class="search-tip" v-else>
          <p>Search city to check a weather</p>
          <p class="emotes">☁️☀️</p>
        </div>
        <div class="favorite-remove-btn" v-if="forecast">
          <svg
            clip-rule="evenodd"
            fill-rule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            @click="addCityToFavorites(city)"
            v-if="!favoriteCities.includes(city)"
            class="favorite-btn">
            <path
              d="m14.123 19.336c-.468.453-.944.913-1.426 1.381-.194.189-.446.283-.697.283s-.503-.094-.697-.283c-4.958-4.813-9.303-8.815-9.303-12.54 0-5.659 7.376-6.978 10-2.461 2.604-4.483 10-3.217 10 2.461 0 .68-.144 1.369-.41 2.07-1.061-1.02-2.503-1.648-4.09-1.648-3.256 0-5.9 2.644-5.9 5.9 0 2 .998 3.77 2.523 4.837zm3.378-9.336c2.58 0 4.499 2.107 4.499 4.499 0 2.58-2.105 4.499-4.499 4.499-2.586 0-4.5-2.112-4.5-4.499 0-2.406 1.934-4.499 4.5-4.499zm.5 3.999v-1.5c0-.265-.235-.5-.5-.5-.266 0-.5.235-.5.5v1.5h-1.5c-.266 0-.5.235-.5.5s.234.5.5.5h1.5v1.5c0 .265.234.5.5.5.265 0 .5-.235.5-.5v-1.5h1.499c.266 0 .5-.235.5-.5s-.234-.5-.5-.5z"
              fill-rule="nonzero" />
          </svg>
          <svg
            clip-rule="evenodd"
            fill-rule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            @click="removeFavoriteCity(city)"
            v-else
            class="remove-btn">
            <path
              d="m14.123 19.336c-.468.453-.944.913-1.426 1.381-.194.189-.446.283-.697.283s-.503-.094-.697-.283c-4.958-4.813-9.303-8.815-9.303-12.54 0-5.659 7.376-6.978 10-2.461 2.604-4.483 10-3.217 10 2.461 0 .68-.144 1.369-.41 2.07-1.061-1.02-2.503-1.648-4.089-1.648-3.257 0-5.9 2.644-5.9 5.9 0 2 .997 3.77 2.522 4.837zm3.377-9.336c2.484 0 4.5 2.016 4.5 4.5s-2.016 4.5-4.5 4.5-4.5-2.016-4.5-4.5 2.016-4.5 4.5-4.5zm.707 4.5s.642-.642 1.061-1.061c.187-.187.187-.519 0-.707-.188-.187-.52-.187-.707 0-.419.419-1.061 1.061-1.061 1.061s-.642-.642-1.061-1.061c-.187-.187-.519-.187-.707 0-.187.188-.187.52 0 .707.419.419 1.061 1.061 1.061 1.061s-.642.642-1.061 1.061c-.187.187-.187.519 0 .707.188.187.52.187.707 0 .419-.419 1.061-1.061 1.061-1.061s.642.642 1.061 1.061c.187.187.519.187.707 0 .187-.188.187-.52 0-.707-.419-.419-1.061-1.061-1.061-1.061z"
              fill-rule="nonzero" />
          </svg>
        </div>
      </div>
      <div class="info-container days-weather" :class="{ showDays: isToggled }">
        <weather-weeks v-if="forecast" :forecastWeeks="forecast.data"></weather-weeks>
      </div>

      <div class="favorites-container">
        <h3>Favorite Cities</h3>
        <div class="favorite-city">
          <div v-for="cityFav in favoriteCities" :key="cityFav">
            <p @click="getWeatherFromFavorite(cityFav)">{{ cityFav }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { auth, database } from "@/firebase";
import { ref as dbRef, get, set, update } from "firebase/database";
import { Toaster, toast } from "vue-sonner";
import WeatherTable from "./layout/TheWeatherTable.vue";
import WeatherChart from "./layout/TheWeatherChart.vue";
import WeatherWeeks from "./layout/TheWeatherWeeks.vue";

const router = useRouter();
const isLoggedIn = ref(true);
const userLogin = ref("");
const favoriteCities = ref<string[]>([]);
const selectedCity = ref("");
const toggleWeatherTable = ref(true);
auth.onAuthStateChanged((user) => {
  if (user) {
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }
});

onMounted(() => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      isLoggedIn.value = true;

      await fetchUserData(user.uid);
    } else {
      isLoggedIn.value = false;
    }
  });
});

const fetchUserData = async (uid: string) => {
  try {
    const userRef = dbRef(database, `users/${uid}`);
    const userSnapshot = await get(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.val();
      userLogin.value = userData.login;
      favoriteCities.value = userData.favoriteCities || [];
    } else {
      console.log("No user data found");
      toast.warning("No user data found");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    toast.warning("Error fetching user data");
  }
};

const signOut = () => {
  auth.signOut();
  router.push({ name: "login" });
};

interface ForecastData {
  data: any[];
  city_name: string;
}

interface HourlyForecastData {
  data: {
    datetime: string;
    temp: number;
    weather: {
      description: string;
    };
    clouds: number;
  }[];
}

const city = ref("");
const forecast = ref<ForecastData | null>(null);
const hourlyForecast = ref<HourlyForecastData | null>(null);
const lon = ref<number | null>(null);
const lat = ref<number | null>(null);
const isToggled = ref(false);

const getWeather = async () => {
  const apiKey = "c28ff1b6614ea1e7c3aa5d36ac899c43";
  const rapidApiKey = "8a7aeb50admsh65a7200976309c2p10bee7jsn9cbef9cbcb04";
  const urlWeather = `http://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=1&appid=${apiKey}`;

  try {
    const responseWeather = await fetch(urlWeather);
    if (!responseWeather.ok) {
      throw new Error("Error fetching weather data");
    }
    const dataWeather = await responseWeather.json();
    console.log(dataWeather);

    if (dataWeather.length === 0) {
      throw new Error("City not found");
    }

    const { lat: cityLat, lon: cityLon } = dataWeather[0];
    lat.value = cityLat;
    lon.value = cityLon;

    await fetchForecastData(cityLat, cityLon, rapidApiKey);
    await fetchHourlyWeatherData(cityLat, cityLon, rapidApiKey);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    toast.warning("City not found or other error occurred");
  }
};

const fetchForecastData = async (lat: number, lon: number, rapidApiKey: string) => {
  const url = `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lat=${lat}&lon=${lon}&units=metric&lang=en`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": rapidApiKey,
      "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
    },
  };

  try {
    const weatherResponse = await fetch(url, options);
    if (!weatherResponse.ok) {
      throw new Error("Error fetching detailed weather data");
    }
    const forecastData: ForecastData = await weatherResponse.json();
    console.log(forecastData);

    forecast.value = forecastData;
    selectedCity.value = forecastData.city_name;
  } catch (error) {
    console.error("Error fetching detailed weather data:", error);
    toast.warning("Failed to fetch detailed weather data");
  }
};

const fetchHourlyWeatherData = async (lat: number, lon: number, rapidApiKey: string) => {
  const url = `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly?lat=${lat}&lon=${lon}&lang=en&hours=12&units=metric`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": rapidApiKey,
      "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching hourly weather data");
    }
    const hourlyForecastData: HourlyForecastData = await response.json();
    console.log(hourlyForecastData);

    hourlyForecast.value = hourlyForecastData;
  } catch (error) {
    console.error("Error fetching hourly weather data:", error);
    toast.warning("Failed to fetch hourly weather data");
  }
};

const getWeatherFromFavorite = (favoriteCity: string) => {
  city.value = favoriteCity;
  getWeather();
};

const toggleHoursWeather = () => {
  isToggled.value = !isToggled.value;
};
const toggleChartWeather = () => {
  toggleWeatherTable.value = !toggleWeatherTable.value;
};
const addCityToFavorites = async (city: string) => {
  if (!auth.currentUser) {
    throw new Error("User not logged in");
  }

  const uid = auth.currentUser.uid;
  const userRef = dbRef(database, `users/${uid}`);

  try {
    const userSnapshot = await get(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.val();
      const favoriteCitiesList = userData.favoriteCities || [];

      if (!favoriteCitiesList.includes(city)) {
        favoriteCitiesList.push(city);
        await set(userRef, {
          ...userData,
          favoriteCities: favoriteCitiesList,
        });
        favoriteCities.value = favoriteCitiesList;
      } else {
        toast.info("City already in favorites");
      }
    } else {
      throw new Error("User data not found");
    }
  } catch (error) {
    console.error("Error adding city to favorites:", error);
    throw error;
  }
};
const removeFavoriteCity = async (cityToRemove: string) => {
  const user = auth.currentUser;

  if (user) {
    try {
      const userRef = dbRef(database, `users/${user.uid}`);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        const currentFavoriteCities: string[] = userData.favoriteCities || [];

        const updatedFavoriteCities = currentFavoriteCities.filter((city) => city !== cityToRemove);

        await update(userRef, {
          favoriteCities: updatedFavoriteCities,
        });

        console.log(`City "${cityToRemove}" removed from favorites.`);

        favoriteCities.value = updatedFavoriteCities;
      } else {
        console.log("No user data found");
      }
    } catch (error) {
      console.error("Error removing city from favorites:", error);
    }
  } else {
    console.log("No user is currently logged in");
  }
};
</script>
<style scoped>
.home {
  font-family: "Open Sans", sans-serif;
}
header {
  display: flex;
  height: 5vh;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(-225deg, #65379b 0%, #886aea 53%, #6457c6 100%);
  box-shadow: 0px 18px 30px 3px rgba(0, 0, 0, 0.4);
  padding: 1% 5% 1% 5%;
}
header input {
  border: 1px solid white;
  border-radius: 15px;
  padding: 0.8rem;
  font-size: 1rem;
  width: 100%;
  font-weight: 600;
  font-family: "Open Sans", sans-serif;
}
.black-part {
  color: black;
}
svg {
  width: 30px;
  height: auto;
  fill: white;
  filter: drop-shadow(2px 5px 2px rgb(0 0 0 / 0.4));
  cursor: pointer;
}
.search-icon {
  width: 40px;
}
.userAvatar {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.userAvatar p {
  margin-right: 10px;
  font-size: 1.5rem;
  font-weight: 600;
}
.userAvatar svg {
  transform: scale(1.2);
  transition: 1s linear;
}
.exit-btn {
  transform: scale(2);
  fill: tomato;
  margin-left: 20px;
}
.userAvatar svg:hover {
  transform: scale(1.4);
}
header section {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}
.emotes {
  font-size: 3rem;
}
.appName {
  gap: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  text-shadow: -2px 5px 13px black;
}
.appName svg {
  width: 40px;
  height: 40px;
  fill: white;
}
.result {
  margin: 0;
  z-index: 10;
  background-color: white;
  padding: 20px;
  position: relative;
  width: 50%;
  height: auto;
  box-shadow: 0px 18px 30px 3px rgba(0, 0, 0, 0.4);
  border-radius: 20px;
}

h3 {
  margin: 0;
  padding: 0;
}
.toggle-weather-btn {
  cursor: pointer;
}
.info-container {
  box-sizing: border-box;
  background-color: white;
  padding: 20px;
  min-height: 100%;
  border-radius: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.weather-city {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.weather-city svg {
  margin-left: 5px;
  fill: red;
}
.favorites-container {
  height: 90%;
  border-radius: 20px;
}
.favorite-city {
  width: 100%;
  display: grid;
  gap: 20%;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(auto, 1fr);
}

.favorite-city p {
  box-sizing: border-box;
  text-align: center;
  margin: 0;
  padding: 30px;

  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.5s ease;
  box-shadow: 0px 4px 45px 5px rgba(0, 0, 0, 0.6);
}
.favorite-city p:hover {
  transform: scale(1.1);
}
.days-weather::-webkit-scrollbar-track {
  background: none;
  border-radius: 10px;
}

.days-weather::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
  border: 3px solid #f1f1f1;
}
.days-weather {
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  font-size: 100%;
  right: 40%;
  background-color: rgba(255, 255, 255, 0.3);
  width: 23%;
  transition: 1s ease-out;
  box-shadow: 0px 18px 30px 3px rgba(0, 0, 0, 0.4);
}
.days-weather ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.days-weather table {
  height: 100%;
  width: 100%;
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
.showDays {
  right: 0;
}

.home-content {
  box-sizing: border-box;

  margin: 2% 5% 2% 5%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: start;
  height: 85vh;
}

.search-tip {
  position: relative;
  margin: 0;
  top: 50%;
  font-size: 2rem;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.search-tip p {
  margin: 0;
  padding: 0;
}

.weather-table {
  font-weight: 600;
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1rem;
}

.favorite-remove-btn {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.favorite-remove-btn svg {
  filter: drop-shadow(4px 0px 59px 22px rgba(0, 0, 0, 0.6));
}
.favorite-btn {
  fill: red;
}
.remove-btn {
  fill: black;
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
.result-menu {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0;
  padding: 0;
}
/* .column-row-container {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: start;
  width: 100%;
  height: 100%;
} */
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
