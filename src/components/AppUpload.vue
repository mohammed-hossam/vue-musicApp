<template>
  <div class="col-span-1">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Upload</span>
        <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <!-- Upload Dropbox -->
        <div
          class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
          :class="{
            'bg-green-400 border-green-400 border-solid': is_dragover,
          }"
          @drag.prevent.stop=""
          @dragstart.prevent.stop=""
          @dragend.prevent.stop="is_dragover = false"
          @dragover.prevent.stop="is_dragover = true"
          @dragenter.prevent.stop="is_dragover = true"
          @dragleave.prevent.stop="is_dragover = false"
          @drop.prevent.stop="upload($event)"
        >
          <h5>Drop your files here</h5>
        </div>
        <input @change="upload($event)" type="file" multiple />
        <hr class="my-6" />
        <!-- Progess Bars -->

        <div class="mb-4" v-for="file in uploads" :key="file.name">
          <!-- File Name -->
          <div class="font-bold text-sm" :class="file.text_class">
            <i :class="file.icon"></i>
            {{ file.name }}
          </div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <!-- Inner Progress Bar -->
            <div
              class="transition-all progress-bar"
              :class="file.variant"
              :style="{ width: file.current_progress + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, auth, songsCollection } from "@/includes/firebase";

export default {
  name: "AppUpload",
  data() {
    return {
      is_dragover: false,
      uploads: [],
    };
  },
  methods: {
    upload($event) {
      console.log($event);
      //for some reason chorme will not log the files, unless we access the files directly, its a bug in chrome.
      // const { files } = $event.dataTransfer;
      // console.log(files);
      const files = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files]; //b3ml check lw 3mlen drag wala directUpload

      files.forEach((file) => {
        //check if not mp3 file
        if (file.type !== "audio/mpeg") {
          return;
        } else {
          //We're creating a reference to the storage, the reference represents the path in our storage, a.k.a. the bucket you Earl, it's the same URL you'll find in the configuration object for Firebase.(vue-musicapp.appspot.com)
          const storageRef = storage.ref(); //'vue-musicapp.appspot.com/songs/eample.com'
          const songsRef = storageRef.child(`/songs/${file.name}`);
          const task = songsRef.put(file);
          const uploadedIndex =
            this.uploads.push({
              task,
              current_progress: 0,
              name: file.name,
              variant: "bg-blue-400",
              icon: "fas fa-spinner fa-spin",
              text_class: "",
            }) - 1;
          /* We need to create this (storageRef) for Firebase to know where to upload the file, we can instruct Firebase to upload  the file to a subdirectory, by passing in a path to the reference function.

            For example, if we passed in songs, then Firebase will upload the file to the songs directory.
            It's always a good idea to store the file in a subdirectory to keep things organized.

            We're not going to use the reference we created.
            It's considered good practice to create a separate reference for Subdirectories.
            This way(songsRef) we have a reference for the root storage and another for these subdirectory.

            The child method will create another reference, the main difference between the child and reference
            function is that the child function will create a path relative to the parent reference. */

          task.on(
            "state_changed",
            //handle progress
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              this.uploads[uploadedIndex].current_progress = progress;
            },
            //handle error
            (error) => {
              console.log(error);
              this.uploads[uploadedIndex].variant = "bg-red-400";
              this.uploads[uploadedIndex].icon = "fas fa-times";
              this.uploads[uploadedIndex].text_class = "text-red-400";
            },
            //handle success
            async () => {
              const song = {
                uid: auth.currentUser.uid,
                display_name: auth.currentUser.displayName,
                original_name: task.snapshot.ref.name,
                modified_name: task.snapshot.ref.name,
                genre: "",
                comment_count: 0,
              };

              song.url = await task.snapshot.ref.getDownloadURL();
              const songRef = await songsCollection.add(song); //add will make firebase add random id for the doc, while set allow us to add the id we want
              const songSnapshot = await songRef.get();
              this.uploads[uploadedIndex].variant = "bg-green-400";
              this.uploads[uploadedIndex].icon = "fas fa-check";
              this.uploads[uploadedIndex].text_class = "text-green-400";
            }
          );

          /* The put method we called to initiate the upload will return an object, this object will emit events we can listen to during the upload.
            If we want to listen to the events, we'll need to assign the object to a variable.
            The name of the variable will be called task.
            Firebase calls the object returned by the function a task snapshot.
            right after creating the task variable, We're going to call the on function from it.

            This function will let us listen to events on the object, the name of the event we'll want to listen for is called State Changed.
            The state changed event will get admitted on three occasions.
            It'll let you know (1)the progress of the upload, (2)if the upload failed or (3)if it succeeded there, these are the three scenarios will want to handle.  We can pass in three functions to handle each one.

            The first function we pass, will be for the progress of the upload. We have access to one parameter called snapshot, we'll accept the parameter.
            The snapshot object contains information about the current upload in the resource section of this lecture,
            I provide a link to the upload files documentation page for Firebase.(https://firebase.google.com/docs/storage/web/upload-files)
            On the sidebar, there's a link to a section called Monitor Upload Progress, click on it.
            This part of the page documents the properties you can find in these snapshot object in the second table.
            You'll find the list of properties there are two properties will want to use there, the bytes transferred
            and the total by its properties.
            The transferred property represents the number of bytes transferred so far, the total bytes property
            represents how many bytes are expected to be transferred.
            Both properties will help us calculate the progress of the upload. */
        }
      });
      this.is_dragover = false;
    },
    cancelUploads() {
      this.uploads.forEach((upload) => {
        upload.task.cancel();
      });
      /* You can run a guard for when a user leaves a route, the fourth guard can be defined inside the component.
However, we face an issue.
Navigation guards must be defined in the component that's registered to the router.
The upload component is not the component we registered on the manage route.
It's a child component of the manage component. */
    },
  },
  // beforeUnmount() {
  //   this.uploads.forEach((file) => {
  //     file.task.cancel();
  //   });
  // },
};
</script>

<!-- @drag The drag event is emitted when the element it's applied to is being dragged.
For example, if I were to click on the element in the browser and begin dragging it, this would trigger-->

<!-- @dragstart  The drag start event is emitted when an element is starting to be dragged.-->

<!-- @dragend  The drag and event is emitted when an element is no longer being dragged.-->

<!-- @dragover  The drag over event is emitted while the user is hovering something over the element the event is applied to.-->

<!-- @dragenter  The drag enter event is emitted when the user begins to drag something onto the element.-->

<!-- @dragleave  The drag leave event is emitted when the item that was previously being dragged over the element is no longer being dragged over it.-->

<!-- @drop Lastly, the drop event is emitted when the user has released the element or text that was being dragged. This event can be triggered when the user releases their mouse or by pressing the escape key-->
