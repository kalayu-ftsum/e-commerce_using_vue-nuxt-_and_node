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
      <CarasoulUpload    
      :id='id'
      :dialog="dialog"
      @close='dialog = false'
      @on='dialog=true'
      />
    </v-toolbar>
    
    <v-data-table
      :headers="headers"
      :items="carousels"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
       
        <td class="text-xs-center">{{ props.item.main_category }}</td>
      
        <td class="justify-center ">
          <v-btn color="primary" fab small dark
             class="mr-2"
              @click="editItem(props.item.id)"
           >
          <v-icon
            small
           
          >
            edit
          </v-icon>
          </v-btn>
        </td>
          <td >
           <v-btn color="error" fab small> 
         <confirm 
         :name=props.item.name
         @deleteItem='deleteItem(props.item.id,props.item.image)'

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

import CarasoulUpload from '~/components/carasoulUpload.vue'
import axios from 'axios';
import confirm from '~/components/confirm.vue'
  export default {
    middleware: 'auth',
    layout(context){
       return 'admin'
    },
    components:{
      confirm ,
      CarasoulUpload
    },
    data: () => ({
      search:'',
      id:null ,
      dialog: false,
      headers: [
        {
          text: 'Dress Name',
          align: 'left',
          value: 'name'
        },
        { text: 'Main Category', value: 'mainCategory',align:'center' },
        
        { text: 'Edit', value: 'edit', sortable: false },
        { text: 'Delete', value: 'delete', sortable: false }
      
      ],
      carousels: []
      
    }),
mounted(){
      
    this.$store.state.isLogged=true
if(this.$store.getters.getToken==null){
    this.$router.push('/login')
}else{
  this.initialize()
}
  
},

    created () {
      this.$store.state.isLogged=true
      this.initialize()
    },
  updated () {
    this.$store.state.isLogged=true
      this.initialize()
    },

    methods: {
      initialize () {
        var uri=`${process.env.baseUrl}/api/carasouls`;
      axios.get(uri).then((res) => {
         this.carousels =res.data;
});
      },

      editItem(id){
       this.id=id;
       this.dialog=true;
      },

      deleteItem (item,image) { 
            
             axios.delete(`${process.env.baseUrl}/api/carasouls/${item}?access_token=${this.$store.getters.getToken}`).then((res) => {
                axios.delete(`${process.env.baseUrl}/api/photos/images/files/${image}?access_token=${this.$store.getters.getToken}`).then(res=>{
        
          })
             })    

        
        
          

             
           
      },

     

     
    }
  }
</script>

