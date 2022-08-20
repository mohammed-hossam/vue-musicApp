import { defineStore } from "pinia";
import { auth, usersCollection } from "@/includes/firebase";

//modal is id to identify the store
export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async register(values) {
      const userCreditinals = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );
      console.log(userCreditinals);
      //e7na 5lena el rules en mynf3sh 7ad y3ml wrtie fl database ela lw hwa 3aml register w leh account 3n tre2 allow write: if request.auth.uid != null;(ka2no by3ml check ll token y3ny) , w dah kda el firebase by3mlo automatic, fa 25lee baly en lw 3mlt el 2wel add ll data 2bl ma3ml create ll user dah hydee error, la2n lazm ykon el user mwgod el 2wal.
      // await usersCollection.add({
      //   name: values.name,
      //   email: values.email,
      //   age: values.age,
      //   country: values.country,
      // });
      //hena lma n3ml usersCollection.add s3tha el firebase hy3ml create ll doc b id mn 3ndo random, bs e7na 3yzen el id ele yt3ml ukon el id bta3 el user msh random, fa bna5od le id bta3 el user ele firebase brdo by3mlo lma bn3ml create ll user
      await usersCollection.doc(userCreditinals.user.uid).set({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
      });

      //lma firebase y3ml create ll user by3mlo profile bykon fe data 3obara 3n displayName, w image, w hena e7na bn8yrhom zy ma7na 3yzen
      await userCreditinals.user.updateProfile({
        displayName: values.name,
      });

      this.userLoggedIn = true;
    },
    async authenticate(values) {
      //lw el signin mng7sh s3tha hy5osh 3ala el catch ele 3mleno fl component nfso
      await auth.signInWithEmailAndPassword(values.email, values.password);
      this.userLoggedIn = true;
    },
    async signout() {
      const user = await auth.signOut();
      console.log(user);
      this.userLoggedIn = false;
    },
  },
  //
});
