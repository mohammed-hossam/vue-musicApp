import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import veeValidatePlugin from "./includes/validation";
import "./assets/base.css";
import "./assets/main.css";
import { auth } from "./includes/firebase";

//mail:mohammedhossam7777@gmail.com, password: mM478963214

//The recommended way to get the current user is by setting an observer on the Auth object:
//3shan 2st5dm el auth.currentUser mzbot w tgeb el state bta3t el user fe3lan ll vueapp, lazm 23ml el 2wel observer 3shan el firebase y3rf ytab3 el state bta3t el user, w 3shan 2st5dmha fl vue app lma yft7 lazm kda el 2wel 2kon 3aml el observer fa hwa hena 3aml ene h3ml initialize ll vue app b3d ma 27ot el observer bta3 el firebase 3shan 2a2dr 23ml access ll state bta3t el user b3d kda fel vue app. welmfrod en el firebase by3rf state el user 3n tre2 el tkoen ele by3mlo create w y5zno hwa m3 nfso

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(veeValidatePlugin);
    app.mount("#app");
  }
});
