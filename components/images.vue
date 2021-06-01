<template>
     <div>
      <v-card width='250px' flat >
        <v-card  router :to='`/dress/${name}`' flat>
        <v-img
        
          class="white--text"
          height="350px"
          :src="`${api}/api/photos/images/download/${image}`"
        >
         </v-img>
        </v-card>
        <v-card-title>
          <div>
            <b class="grey--text" >$ {{price-(discount/100)}}</b><br>
            
            <span>{{ name }}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <SocialMedia />
         
        </v-card-actions>
      </v-card>


  </div>
</template>


<script>
import SocialMedia from '~/components/socialmedia.vue'
import axios from 'axios'
export default {
  data(){
  return {
    api:process.env.baseUrl
  }
  },
components:{
SocialMedia
},
  props:['image','price','name','id','discount'],
   computed:{

   },
   methods:{
    }
    
}

</script>

