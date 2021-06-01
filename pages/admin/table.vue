<template>
  <div class="ma-5">
    <v-toolbar flat color="white">
      <v-toolbar-title>Uploaded Dresses</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
       <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <FormEdit    
      :id='id'
      :dialog="dialog"
      @close='dialog = false'
      @on='dialog=true'
      />
    
    </v-toolbar>
    
    <v-data-table
      :headers="headers"
      :items="dresses"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.price }}</td>
        <td class="text-xs-right">{{ props.item.discount }}</td>
        <td class="text-xs-right">{{ props.item.trend }}</td>
        <td class="text-xs-right">{{ props.item.main_category }}</td>
        <td class="text-xs-right">{{ props.item.mini_category }}</td>
        <td class="justify-center ">
          <v-btn color="primary" fab small dark
             class="mr-2"
            @click="editItem(props.item.id)"
          >
          <v-icon
         
         
          >
            edit
          </v-icon>
          </v-btn>

          </td>
          <td class="justify-center ">
          <v-btn color="error" fab small>
         <confirm 
         :name=props.item.name
         @deleteItem='deleteItem(props.item.id)'

         />
          </v-btn>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>

      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
  </div>
</template>





<script>

import FormEdit from '~/components/formEdit.vue'
import confirm from '~/components/confirm.vue'
import axios from 'axios';
  export default {
    middleware: 'auth',
    layout(context){
       return 'admin'
    },
    components:{
      FormEdit,
      confirm
    },
    data: () => ({
      search:'',
      id:null ,
      dialog: false,
      headers: [
        {
          text: 'Dress Name',
          align: 'left',
          value: 'name',
          sortable: false 
        },
        { text: 'Price', value: 'price' },
        { text: 'Discount', value: 'discount' },
        { text: 'Trend', value: 'trend' },
        { text: 'Main Category', value: 'mainCategory' },
        { text: 'Mini Category', value: 'miniCategory' },
        { text: 'Edit', value: 'edit', sortable: false },
        { text: 'Delete', value: 'delete', sortable: false }
      ],
      dresses: [],
      
    }),

  mounted(){ 
    
   
                                                                                         

  } ,   

    created () {
      this.initialize()
    },
  updated () {
      this.initialize()
    },

    methods: {
      initialize () {
        var uri=`${process.env.baseUrl}/api/dresses?access_token=${this.$store.getters.getToken}`;
      axios.get(uri).then((res) => {
         this.dresses =res.data;
});
      },

      editItem(id){
       this.id=id;
       this.dialog=true;
      },

      deleteItem (item) {
        
        axios.get(`${process.env.baseUrl}/api/dresses/${item}/images?access_token=${this.$store.getters.getToken}`).then((res) => {
             axios.delete(`${process.env.baseUrl}/api/photos/images/files/${res.data[0].side_right}?access_token=${this.$store.getters.getToken}`).then(res=>{
             })  
            axios.delete(`${process.env.baseUrl}/api/photos/images/files/${res.data[0].side_left}?access_token=${this.$store.getters.getToken}`).then(res=>{
                      })  
            axios.delete(`${process.env.baseUrl}/api/photos/images/files/${res.data[0].front}?access_token=${this.$store.getters.getToken}`).then(res=>{
                 })  
            axios.delete(`${process.env.baseUrl}/api/photos/images/files/${res.data[0].back}?access_token=${this.$store.getters.getToken}`).then(res=>{
                })  

          })
        
          axios.delete(`${process.env.baseUrl}/api/dresses/${item}/images?access_token=${this.$store.getters.getToken}`).then((res) => {

             axios.delete(`${process.env.baseUrl}/api/dresses/${item}?access_token=${this.$store.getters.getToken}`).then((res) => {
        })
          })
           
      },

     

     
    }
  }
</script>

