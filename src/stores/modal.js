import { defineStore } from "pinia";

//modal is id to identify the store
export default defineStore("modal", {
  state: () => {
    isOpen: false;
  },

  getters: {
    hiddenClass(state) {
      return !state.isOpen ? "hidden" : "";
    },
  },
});
