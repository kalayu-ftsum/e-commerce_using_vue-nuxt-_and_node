<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
       <v-icon v-on="on"
            small
          
          >
            delete
          </v-icon>

      </template>
      <v-card>
        <v-card-title class="headline">Are You Sure?</v-card-title>
        <v-card-text>to delete {{name}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">No</v-btn>
          <v-btn color="green darken-1" flat @click="$emit('deleteItem') ,dialog = false">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
  export default {
    props:['name'],
    data () {
      return {
        dialog: false
      }
    }
  }
</script>