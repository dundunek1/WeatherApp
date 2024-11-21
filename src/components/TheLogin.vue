<template>
  <Toaster richColors position="top-center" />
  <div class="login">
    <h2>Log in to get started!</h2>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="login">Email:</label>
        <input type="email" id="login" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <button type="button" class="btn btn-link" @click="goToRegister">Don't have an account? Register with us</button>
      <div v-if="formMessage" :class="{ success: isFormSuccess, error: !isFormSuccess }">
        {{ formMessage }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { Toaster, toast } from "vue-sonner";

const email = ref("");
const password = ref("");
const formMessage = ref("");
const isFormSuccess = ref(false);

const router = useRouter();

const loginUser = async () => {
  if (email.value && password.value) {
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      formMessage.value = "Login successful!";
      isFormSuccess.value = true;
      toast.success("Login successful!");
      router.push("/home");
    } catch (error) {
      toast.error("Invalid login or password.");
      formMessage.value = "Invalid login or password.";
      isFormSuccess.value = false;
    }
  } else {
    toast.warning("Please enter both email and password.");
    formMessage.value = "Please enter both email and password.";
    isFormSuccess.value = false;
  }
};

const goToRegister = () => {
  router.push("/register");
};
</script>

<style scoped>
.login {
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
}
</style>
