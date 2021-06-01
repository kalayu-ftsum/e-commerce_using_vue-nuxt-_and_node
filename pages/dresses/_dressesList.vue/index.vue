<template>
<div>
  <v-container>
  
<v-layout row wrap > 
   <v-flex xs12 sm6 md3 class='mt-5' v-for="dress in dresses" :key="dress.name">
     <Images  
     :image="dress.image"
     :name="dress.name"
     :price="dress.price"
     :discount="dress.discount"
     :id='dress.id'
     
     />
   </v-flex>
      

  </v-layout>
  </v-container>  
  </div>
</template>

<script>
import axios from 'axios'
import Images from '~/components/images.vue'

export default {
  data(){
   return {
    mini_category : [
          'T-Shirt With Trouser',
           'Coat with trouser',
           'Gabi',
           'Wedding ',
           'Baptism',
           'Engagment',
           'Graduation',
           'Red corpet',
           'Teletafi',
           'Tilf',
           'Fetil',
           'Luand me fetil',
           'Nexela',
           'Necklace',
           'Bracelet',
          'Casual',
         
        ],
     dresses:{}
  }},
  components: {
    Images
  },
  computed:{
  },
  mounted(){
      if(this.$route.params.dressesList){
        console.log(this.$route.params.dressesList)
     if(this.mini_category.includes(this.$route.params.dressesList)){
         console.log(this.$route.params.dressesList)
           axios.get(`${process.env.baseUrl}/api/dresses?filter[where][mini_category]=${this.$route.params.dressesList}&filter[order]=updated%20desc&filter[limit]=3`).then(res=>{
                 this.dresses=res.data
                  console.log(res.data)
             })
      } else{
        this.dresses={}
      }
      }
    
  }
}

</script>
