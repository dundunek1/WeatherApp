<template>
  <Toaster richColors position="top-center" />
  <section class="register-form">
    <form @submit.prevent="sendForm">
      <label for="login">Login</label>
      <input id="login" type="text" v-model="login" required />

      <label for="email">Email</label>
      <input id="email" type="email" v-model="email" required />

      <label for="password">Password</label>
      <input id="password" type="password" v-model="password" required />

      <button type="submit" class="btn-primary">Register</button>
      <button class="btn btn-link" @click="goToLogin">Already have an account? Log in!</button>
      <div v-if="formMessage" :class="{ success: isFormSuccess, error: !isFormSuccess }">
        {{ formMessage }}
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref as dbRef, set } from "firebase/database";
import { auth, database } from "@/firebase";
import { Toaster, toast } from "vue-sonner";

const login = ref("");
const email = ref("");
const password = ref("");
const favoriteCities = ref<string[]>([]);
const formMessage = ref("");
const isFormSuccess = ref<boolean | null>(null);

const router = useRouter();
const goToLogin = () => {
  router.push("/");
};
const sendForm = async () => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (login.value && email.value && password.value) {
    if (!passwordRegex.test(password.value)) {
      toast.warning("Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.");
      formMessage.value = "Invalid password format.";
      isFormSuccess.value = false;
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;

      const userId = user.uid;
      await set(dbRef(database, `users/${userId}`), {
        login: login.value,
        email: email.value,
        favoriteCities: favoriteCities.value,
      });

      formMessage.value = "Registration successful!";
      isFormSuccess.value = true;

      login.value = "";
      email.value = "";
      password.value = "";
      favoriteCities.value = [];

      router.push("/");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Failed to register. Please try again.");
      formMessage.value = "Failed to register. Please try again.";
      isFormSuccess.value = false;
    }
  } else {
    toast.warning("Please fill in all fields.");
    formMessage.value = "Please fill in all fields.";
    isFormSuccess.value = false;
  }
};
</script>

<style scoped>
.register-form {
  font-family: "Open Sans", sans-serif;
  font-size: 1.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 18px 30px 3px rgba(0, 0, 0, 0.4);
}

.btn {
  margin-top: 10px;
}

.btn-primary {
  margin-top: 10px;
  border-radius: 5px;
  background: linear-gradient(-225deg, #65379b 0%, #886aea 53%, #6457c6 100%);
  cursor: pointer;
  border: none;
  color: white;
  transition: 1s;
}
.btn-primary:hover {
  transform: scale(1.1);
  background: linear-gradient(-225deg, #886aea 0%, #65379b 53%, #6457c6 100%);
}
.btn-link {
  background: none;
  border: none;
  color: #6457c6;
  cursor: pointer;
}
label {
  margin-right: 2rem;
}
input {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  font-size: 1.5rem;
  border-radius: 20px;
}
button {
  padding: 10px;
  font-size: 1.1rem;
}
.success {
  color: green;
}

.error {
  color: red;
  font-size: 1rem;
}
</style>
