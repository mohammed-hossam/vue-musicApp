import { defineStore } from "pinia";
import { Howl, Howler } from "howler";
import helper from "@/includes/helper";
export default defineStore("player", {
  state: () => ({
    currentSong: {},
    sound: {},
    seek: "00:00",
    duration: "00:00",
    playerProgress: "0%",
  }),
  actions: {
    async newSong(song) {
      if (this.sound instanceof Howl) {
        this.sound.unload(); //unload will destroy the howl instance
      }

      this.currentSong = song;
      this.sound = new Howl({
        src: [song.url],
        html5: true,
      });

      this.sound.play();
      this.sound.on("play", () => {
        requestAnimationFrame(this.progress);
      });
    },
    progress() {
      this.seek = helper.formatTime(this.sound.seek());
      this.duration = helper.formatTime(this.sound.duration());
      this.playerProgress = `${
        (this.sound.seek() / this.sound.duration()) * 100
      }%`;
      if (this.sound.playing()) {
        requestAnimationFrame(this.progress);
      }
    },
    async toggleAudio() {
      //  console.log("welcome from toggleAudio");
      if (!this.sound.playing) {
        //here we are checking if the function exists in the object, to make sure that the howel object is instentiated
        return;
      }
      if (this.sound.playing()) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    },
    updateSeek(e) {
      if (!this.sound.playing) {
        return;
      }
      const { x, width } = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - x;
      const percentage = clickX / width;
      const newSeekSeconds = this.sound.duration() * percentage;
      this.sound.seek(newSeekSeconds);
      this.sound.once("seek", this.progress);
      /* The seek function we're calling will temporarily pause the audio, and in the progress Function  We're continuously dispatching the progress action within itself. It will notice the audio isn't playing anymore. If that's the case, the action will stop dispatching itself. We don't want this to happen because we know that the audio needs to change position. We can start the loop again by dispatching the action.

      After the audio has changed its position, We're using a function called once. The once function will listen for an event. If the event is emitted, it'll run the callback function passed into it. This callback function will only run once. the name of the event we're listening to is called seek. Howler Will Emit this event when the audio has officially changed position. At this point, the audio will start playing again. */
    },
  },
  getters: {
    playing(state) {
      if (state.sound.playing) {
        return state.sound.playing();
      }

      return false;
    },
  },
  //
});
