<template>
  <b-container class="w-75 mt-5">
    <b-row class="border border-1 rounded-4 r-container">
      <b-col class="text-start p-5">
        <b-container>
          <b-form @submit="onRegister" v-if="show">
            <h3 class="mt-4 mb-5 text-center">Registrar cuenta</h3>
            <label for="" class="r-text-inter">Correo electronico</label>
            <b-form-input class="mb-5 r-input" type="email" v-model="email" required
              autocomplete="current-email"></b-form-input>
            <label for="input-live" class="r-text-inter">Contraseña</label>
            <b-form-input class="mb-3 r-input" type="password" v-model="password" minlength="8" maxlength="15" required
              autocomplete="current-password"></b-form-input>
            <div class="text-center mb-5">
              <b-button variant="success" type="submit" class="mb-2 r-button w-50">Registrar</b-button>

            </div>
          </b-form>
        </b-container>
      </b-col>
      <b-col cols="6" class="p-0 d-none d-lg-block col-md-5 col-lg-5 col-xl-5">
        <b-img class="r-image rounded-end-4 w-100 h-100"
          src="https://cdn-3.expansion.mx/dims4/default/134c22d/2147483647/strip/true/crop/2204x1361+0+0/resize/1800x1112!/format/webp/quality/80/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F73%2F44%2F67577a564d988ffb066a34ff425b%2Fistock-1297795284.jpg"
          alt="imagen-registro"></b-img>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import registerServices from "./services/Register";
import CryptoJS from 'crypto-js';

export default {
  data() {
    return {
      show: true,
      email: null,
      password: null,
    }
  },
  methods: {
    async onRegister(event) {
      event.preventDefault();
      const emailRegex = /^(?=.*[@])(?=.*(gmail\.com))[\S]+$/;
      const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;

      if (!this.email || !emailRegex.test(this.email)) {
        console.error("Correo electrónico no válido. Solo se permiten Gmail");
        return;
      }

      if (!this.password || !passRegex.test(this.password)) {
        console.error("La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial.");
        return;
      }
      const sanitizedEmail = this.email.trim();
      const sanitizedPassword = this.password.trim();
      
      const secretKey = 'claveSecreta12345';

      const encryptedEmail = CryptoJS.AES.encrypt(sanitizedEmail, secretKey).toString();
      const encryptedPassword = CryptoJS.AES.encrypt(sanitizedPassword, secretKey).toString();

      try {
        const message = await registerServices.register(encryptedEmail, encryptedPassword);
        console.log(message);
      } catch (error) {
        console.error(error);
      }
    }
  }

}
</script>

<style></style>