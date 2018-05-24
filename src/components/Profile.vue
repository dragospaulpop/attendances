 <template>
   <v-container fluid grid-list-xl>
     <v-layout wrap>
       <v-flex xs6>
        <v-btn color="primary" @click="addPicture" :value = "pictureSelect">Select profile pic</v-btn>
        <input type="file"  style="display:none" ref="pictureInput" accept="image/*" @change="pictureSelect">

        <!-- <v-btn color="primary" @click="touploadPicture">Update profile pic</v-btn> -->
       </v-flex>
       <v-flex xs6>
        <img :src="imageUrl" height="150">
       </v-flex>
       <v-flex xs6>
        <v-text-field
          name="nume"
          label="Last name"
          :value = getuserdetails.nume
          id="nume"
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          name="prenume"
          label="First name"
          :value = getuserdetails.prenume
          id="prenume"
        ></v-text-field>
      </v-flex>
       <v-flex xs6>
        <v-text-field
          name="parolaactuala"
          label="Current password"
          hint="Minim 8 caractere"
          v-model="oldpass"
          min="8"
          :type="e1 ? 'password' : 'text'"
          id = "oldpsw"
          required
        >
        </v-text-field>
       </v-flex>
       <v-flex xs6>
         <v-text-field
             label="New password"
             name="parolanoua"
             hint="Minim 8 caractere"
             v-model="password"
             min="8"
             :append-icon-cb="() => (e1 = !e1)"
             :type="e1 ? 'password' : 'text'"
             counter
           >
           </v-text-field>
         </v-flex>
         <v-flex xs6>
           <v-text-field
             name="parolanouaconfirm"
             label="Confirm new password"
             hint="Minim 8 caractere"
             v-model="confirmPassword"
             min="8"
             :type="e1 ? 'password' : 'text'"
             :rules="[comparePasswords]"
             id = "newpsw"
           >
         </v-text-field>
       </v-flex>
       <v-flex xs12>
        <v-btn @click="savenewdetails">Salveaza datele</v-btn>
        <v-btn flat color="primary" router to = "/">Back</v-btn>
       </v-flex>
    </v-layout>
   </v-container>
 </template>

<script>
import firebase from '@/firebase'
export default {
  name: 'Profile',
  data () {
    return {
      password: '',
      email: '',
      e1: true,
      oldpass: '',
      confirmPassword: '',
      user1: null,
      imageUrl: '',
      image: null,
      selectedFile: null,
      downloadURL: null,
      rules: {
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Email invalid.'
        }
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Parolele nu corespund' : ''
    },
    events () {
      return this.$store.getters.events
    },
    userdetails () {
      return this.$store.getters.userdetails
    },
    keysUsers () {
      return this.$store.getters.keysUsers
    },
    getuserdetails () {
      const x = this.keysUsers.indexOf(this.user.uid)
      const userdet = this.userdetails[x]
      return userdet
    }
  },
  methods: {
    savenewdetails () {
      const nume = document.getElementById('nume').value
      const prenume = document.getElementById('prenume').value
      const cale = firebase.database().ref('users/' + this.user.uid)
      const parolanoua = document.getElementById('newpsw').value
      cale.update({nume: nume, prenume: prenume})
      firebase.auth().signInWithEmailAndPassword(this.user.email, this.oldpass).then(function () {
        cale.update({nume: nume, prenume: prenume})
        firebase.auth().currentUser.updatePassword(parolanoua).then(function () {
          window.alert('Parola a fost schimbată')
        }).catch(function (error) {
          console.log(error.message)
        })
      }).catch(function (error) {
        console.log(error.message)
      })
    },
    addPicture () {
      this.$refs.pictureInput.click()
    },
    pictureSelect (payload) {
      const selectedFile = payload.target.files[0]
      const filesName = this.user.uid
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(selectedFile)
      this.imageUrl = selectedFile
      const storageRef = firebase.storage().ref('/users/' + filesName)
      const uploadTask = storageRef.put(selectedFile)
      // push in storage
      uploadTask.on('state_changed', snapshot => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
      }, error => {
        console.log(error)
      }, () => {
        console.log('succes')
        var downloadURL = uploadTask.snapshot.downloadURL
        console.log('Done. Enjoy', downloadURL)
        this.image = downloadURL
      })
      // push in databasesdas
      return firebase.database().ref('/users/' + this.user.uid + '/image/').set({
        image: this.image
      })
    }
  }
}
</script>
