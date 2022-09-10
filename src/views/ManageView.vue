<template>
  <main>
    <!-- Main Content -->
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <AppUpload ref="upload" v-bind:addSong="addSong" />

        <div class="col-span-2">
          <div
            class="bg-white rounded border border-gray-200 relative flex flex-col"
          >
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">My Songs</span>
              <i
                class="fa fa-compact-disc float-right text-green-400 text-2xl"
              ></i>
            </div>
            <div class="p-6">
              <!-- song Items -->
              <SongItem
                v-for="(song, index) in songs"
                :key="song.docId"
                :song="song"
                :updateSong="updateSong"
                :removeSong="removeSong"
                :updateUnsavedFlag="updateUnsavedFlag"
                :index="index"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import useUserStore from "@/stores/user.js";
import AppUpload from "../components/AppUpload.vue";
import SongItem from "../components/SongItem.vue";
import { songsCollection, auth } from "@/includes/firebase";
// import { mapWritableState } from "pinia";
export default {
  name: "ManageView",
  components: { AppUpload, SongItem },
  data() {
    return {
      songs: [],
      unsavedFlag: false,
    };
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    addSong(document) {
      const song = { ...document.data(), docId: document.id };
      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  async created() {
    const songsSnapshot = await songsCollection
      .where("uid", "==", auth.currentUser.uid)
      .get(); //where help us to get documents we want
    console.log(songsSnapshot);
    songsSnapshot.forEach((document) => {
      this.addSong(document);
    });
    // console.log(this.songs);
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.upload.cancelUploads();

    if (!this.unsavedFlag) {
      next();
    } else {
      const leave = confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      ); //browser function
      next(leave);
      /* The next function has one optional argument we can pass in a boolean value to tell the router whether to proceed with the navigation if we pass in false, it's the same as not calling the function.
      a true boolean value will tell the router to move on to the next page. */
    }
  },
};
</script>
