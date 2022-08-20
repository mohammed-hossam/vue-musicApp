<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <a class="text-white font-bold uppercase text-2xl mr-4" href="#">Music</a>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="!userStore.userLoggedin">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAutModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <a class="px-2 text-white" href="#">Manage</a>
            </li>
            <li>
              <a
                class="px-2 text-white"
                href="#"
                @click.prevent="userStore.signout"
                >Logout</a
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores, mapWritableState } from "pinia";
import useModalStore from "@/stores/modal.js";
import useUserStore from "@/stores/user";

export default {
  name: "AppHeader",
  computed: {
    ...mapStores(useModalStore, useUserStore),

    //   ...mapWritableState(useModalStore,['isOpen'])
    //this will expose the state only and can get only a part of the state, but mapStores will expose all of the store

    //el computed props bt3ml update automatic ll value lw et8yrt w btrg3ha zy mahya lw mfesh 7aga et8yrt, moomkn 23ml nfs el fkra b pinia 3n tre2 el getters, 3shan m23odsh 2ktb el 7etat ele 3ayzha mn el state fel computed w2wfr 3ala fse ktaba.
  },
  methods: {
    toggleAutModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
      console.log(this.modalStore.isOpen);
    },
  },
};
</script>
