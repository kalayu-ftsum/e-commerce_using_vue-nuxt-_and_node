<template>
     <div>
      <v-card width='250px' flat >
        <v-card  flat>
        <v-img
        
          class="white--text"
          height="350px"
          :src="`${api}/api/photos/receit/download/${image}`"
        >
         </v-img>
        </v-card>
        <v-card-title>
          <div>
            <b class="grey--text" >{{price}} Days</b><br>
            
            <span>{{ name }}</span>
          </div>
        </v-card-title>
        <v-card-actions>
         <v-btn router :to='`/admin/order/${id}`' >Show Orders</v-btn>
         
        </v-card-actions>
      </v-card>


  </div>
</template>


<script>
import axios from 'axios'
export default {
  data(){
  return {
    api:process.env.baseUrl
  }
  },
  props:['image','price','name','id'],
   computed:{

   },
   methods:{
    

  
     
  

      
    }
    
   

}

</script>

