<template>
  <!-- Header -->
  <AppHeader />

  <!-- <router-view></router-view> -->

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
  <!-- The vuerouter does a lot of things behind the scenes when switching routes. 
by grabbing the component from the router-view component, We are telling the router we want to control the process of swapping components. This will allow us to apply a transition to the components inside the router view component 

The component component can be considered a ghost component. It's a component registered by view. It doesn't render anything on its own. We can use it for loading a component dynamically.
The component it will render is the component we pass into the IS property,we will bind this property to this component.
Next, we'll pass him the component Slot property.
The component component will render whatever component is provided by the vuerouter component,
our original goal was to apply a transition. We will wrap this component with the transition component.

The components shouldn't transition At the same time, we want the component leading the page to transition first. Afterward, the new component for The route should enter the page. We can achieve this behavior by setting the mode property on the router-view component to out-in.

There's one last step we need to take, the transitions won't work if the components have multiple root elements.
we will receive an error if we attempt to transition a component with this structure.
in The View's directory opened the home and song component files, Both components have multiple root elements.
We're going to wrap the templates of both components with the main tag.
-->
  <!-- Player -->
  <Player />

  <!-- Auth Modal -->
  <AppAuth />
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppAuth from "@/components/AppAuth.vue";
import { mapWritableState } from "pinia";
import useUserStore from "@/stores/user";
import { auth } from "./includes/firebase";
import Player from "./components/Player.vue";

export default {
  name: "App",
  components: { AppHeader, AppAuth, Player },
  computed: {
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
  },
  created() {
    const userFound = auth.currentUser;
    console.log(userFound);
    if (userFound) {
      this.userLoggedIn = true;
    }
  },
};
</script>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0s lienar;
  opacity: 0;
}
</style>
