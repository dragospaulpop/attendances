<template>
  <v-layout>
    <v-container fluid>
      <v-flex xs8 v-if="editdata===true">
        <v-text-field
          name="input-1-3"
          label="Nume"
          single-line
        ></v-text-field>
      </v-flex>
      <v-flex xs8 v-else>
         Nume : {{getuserdetails.nume}}
      </v-flex>
      <v-flex xs8 v-if="editdata===true">
        <v-text-field
          name="input-1-3"
          label="Prenume"
          single-line
        ></v-text-field>
      </v-flex>
      <v-flex xs8 v-else>
         Prenume : {{getuserdetails.prenume}}
      </v-flex>
      <v-btn @click="editdetails" v-if="editdata===false">
        Modifica datele
      </v-btn>
      <v-btn @click="savenewdetails" v-if="editdata===true">
        Salveaza datele
      </v-btn>
    </v-container>
   </v-layout>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      editdata: false,
      savedata: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
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
    editdetails () {
      this.editdata = true
      this.savedata = false
    },
    savenewdetails () {
      this.editdata = false
      this.savedata = true
      this.$store.dispatch('changeName', this.nume)
    }
  }
}
</script>
