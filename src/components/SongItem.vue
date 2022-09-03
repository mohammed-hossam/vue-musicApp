<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        v-on:click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>

    <!-- edit from  -->
    <div v-show="showForm">
      <!-- alert msg -->
      <div
        class="text-white text-center font-bold p-4 rounded mb-4"
        v-if="show_alert"
        :class="alert_variant"
      >
        {{ alert_msg }}
      </div>
      <VeeForm
        :validation-schema="schema"
        v-on:submit="edit"
        :initial-values="song"
      >
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <VeeField
            name="modified_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <VeeField
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          v-bind:disabled="in_submission"
        >
          Submit
        </button>
        <button
          type="button"
          v-on:click.prevent="showForm = false"
          v-bind:disabled="in_submission"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
        >
          Go Back
        </button>
      </VeeForm>
    </div>
  </div>
</template>

<script>
import { songsCollection, storage } from "../includes/firebase";
export default {
  name: "SongItem",
  props: {
    song: { type: Object, required: true },
    updateSong: { type: Function, required: true },
    removeSong: { type: Function, required: true },
    updateUnsavedFlag: { type: Function },
    index: { type: Number, required: true },
  },
  data() {
    return {
      showForm: false,
      schema: {
        modified_name: "required",
        genre: "alpha_spaces",
      },
      in_submission: false,
      show_alert: false,
      alert_variant: "bg-blue-500",
      alert_msg: "Please wait! updating song info.",
    };
  },
  methods: {
    async edit(values) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = "bg-blue-500";
      this.alert_msg = "Please wait! updating song info.";

      try {
        const x = await songsCollection.doc(this.song.docId).update(values);
      } catch (error) {
        console.error(error);
        this.in_submission = false;
        this.alert_variant = "bg-red-500";
        this.alert_msg =
          "An unexpected error occurred. Please try again later.";
        return;
      }

      this.updateSong(this.index, values);
      this.updateUnsavedFlag(false);
      this.in_submission = false;
      this.alert_variant = "bg-green-500";
      this.alert_msg = "Success! Your song has been updated.";
    },
    async deleteSong() {
      //delete song form the storage
      const storageRef = storage.ref();
      const songRef = storageRef.child(`/songs/${this.song.original_name}`);
      await songRef.delete();

      //delete song form firestore
      await songsCollection.doc(this.song.docId).delete();

      //delete song form the manageView
      this.removeSong(this.index);
    },
  },
};
</script>
