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
        <hr class="my-6" />
        <!-- Progess Bars -->
        <div class="mb-4">
          <!-- File Name -->
          <div class="font-bold text-sm">Just another song.mp3</div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <!-- Inner Progress Bar -->
            <div
              class="transition-all progress-bar bg-blue-400"
              style="width: 75%"
            ></div>
          </div>
        </div>
        <div class="mb-4">
          <div class="font-bold text-sm">Just another song.mp3</div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <div
              class="transition-all progress-bar bg-blue-400"
              style="width: 35%"
            ></div>
          </div>
        </div>
        <div class="mb-4">
          <div class="font-bold text-sm">Just another song.mp3</div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <div
              class="transition-all progress-bar bg-blue-400"
              style="width: 55%"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppUpload",
  data() {
    return {
      is_dragover: false,
    };
  },
  methods: {
    upload() {
      this.is_dragover = false;
    },
  },
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
