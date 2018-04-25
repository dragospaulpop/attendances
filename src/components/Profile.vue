 <template>
   <v-container grid-list-sm class="pa-4">
     <v-layout wrap>
       <v-flex xs12>
        <v-text-field
          name="nume"
          :value = getuserdetails.nume
          id="nume"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          name="prenume"
          :value = getuserdetails.prenume
          id="prenume"
        ></v-text-field>
      </v-flex>
       <v-flex xs12>
        <v-text-field
          name="parolaactuala"
          label="Parolă actuală"
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
             label="Parolă nouă"
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
             label="Confirmă parolă nouă"
             hint="Minim 8 caractere"
             v-model="confirmPassword"
             min="8"
             :type="e1 ? 'password' : 'text'"
             :rules="[comparePasswords]"
             id = "newpsw"
           >
         </v-text-field>
       </v-flex>
      <v-btn @click="savenewdetails">
        Salveaza datele
      </v-btn>
      <v-btn flat color="primary" router to = "/">Back</v-btn>
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
    }
  }
}
</script>
