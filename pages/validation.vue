<template>

<div id="app">
  <v-app id="inspire">
    <v-form v-model="valid" ref="form">
    <v-text-field
      label="Name"
      v-model="name"
      :rules="nameRules"
      :counter="10"
      required
    ></v-text-field>
    <v-text-field
      label="E-mail"
      v-model="email"
      :rules="emailRules"
      required
    ></v-text-field>
    <v-select
      label="Item"
      v-model="select"
      :items="items"
      :rules="[(v) => !!v || 'Item is required']"
      required
    ></v-select>
    <v-checkbox
      label="Do you agree?"
      v-model="checkbox"
      :rules="[(v) => !!v || 'You must agree to continue!']"
      required
    ></v-checkbox>

    <v-btn @click="submit" :class="{ red: !valid, green: valid }">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
  </v-app>
</div>

</template>

<script >

export default {
  data () {
      return {
        valid: false,
        name: 'Default',
        nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
        ],
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        select: null,
        items: [
          'Item 1',
          'Item 2',
          'Item 3',
          'Item 4'
        ],
        checkbox: true
      }
    },
    methods: {
      submit () {
        this.$refs.form.validate()
        console.log( this.$refs.form.validate())
      },
      clear () {
        this.$refs.form.reset()
      }
    }
}


</script>

<style>
</style>
