<template>
  <main>
    <!-- Header -->
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            et dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
            suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
            pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="/assets/img/introduction-music.png"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="card-title">Songs</span>
          <!-- Icon -->
          <i
            class="fa fa-headphones-alt float-right text-green-400 text-xl"
          ></i>
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <SongHomeViewItem
            v-for="song in songs"
            :key="song.docId"
            :song="song"
          />
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script>
import { songsCollection } from "../includes/firebase";
import SongHomeViewItem from "@/components/SongHomeViewItem.vue";

export default {
  name: "HOMEView",
  components: { SongHomeViewItem },
  data() {
    return {
      songs: [],
      maxPerPage: 3,
      pendingRequest: false,
    };
  },
  async created() {
    this.getSongs();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    async getSongs() {
      if (this.pendingRequest) {
        return;
      }

      this.pendingRequest = true;

      let songsSnapshots;
      if (this.songs.length) {
        const lastDocument = await songsCollection
          .doc(this.songs[this.songs.length - 1].docId)
          .get();

        songsSnapshots = await songsCollection //startAfter 3shan 2st5dmha lazm 2kon 3aml 2blha orderby
          .orderBy("modified_name")
          .startAfter(lastDocument)
          .limit(this.maxPerPage)
          .get();
      } else {
        songsSnapshots = await songsCollection
          .orderBy("modified_name")
          .limit(this.maxPerPage)
          .get();
      }

      songsSnapshots.forEach((document) => {
        this.songs.push({ ...document.data(), docId: document.id });
      });
      this.pendingRequest = false;
    },
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      // Alternative (less strict)
      // const bottomOfWindow =
      //   Math.round(scrollTop) + innerHeight > offsetHeight - 100;
      const bottomOfWindow =
        Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfWindow) {
        console.log("infinte scroll activated");
        this.getSongs();
      }
    },
  },
};
</script>
