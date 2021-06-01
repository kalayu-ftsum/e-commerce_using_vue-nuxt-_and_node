<template>
<div>
  <v-container>
  <v-layout
    column
     class="mb-5"
  >
    
   <v-carousel hide-delimiters >
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
       :src="imageUrl(item.image)"
        reverse-transition="fade"
      transition="fade"
    ></v-carousel-item>
           </v-carousel>
  </v-layout>
  
  <div class='wedding'>
<v-layout row wrap > 
   <v-flex xs12 sm6 md3  class='mt-2' v-for="dress in dresses" :key="dress.name">
     <Images  
     :image="dress.image"
     :name="dress.name"
     :price="dress.price"
    :discount="dress.discount"
    :id="dress.id"
     />
   </v-flex>


  </v-layout>
  <div  class='text-xs-center ma-5'  >
<h1> Wedding Dress </h1>
</div>
  <v-layout row wrap > 
      
   <v-flex xs12 sm6 md3  class='mt-2' v-for="wedding in weddings" :key="wedding.name">
  

     <Images  
     :image="wedding.image"
     :name="wedding.name"
     :price="wedding.price"
      :discount="wedding.discount"
      :id="wedding.id"
     />
   </v-flex>
  
      

  </v-layout>

   <div  class='text-xs-center ma-5'  >
<h1> casual Dress </h1>
</div>
  <v-layout row wrap > 
      
   <v-flex xs12 sm6 md3  class='mt-2' v-for="casual in casuals" :key="casual.name">
  

     <Images  
     :image="casual.image"
     :name="casual.name"
     :price="casual.price"
     :discount="casual.discount"
        :id="casual.id"
     />
   </v-flex>
  
      

  </v-layout>
  </div>
  </v-container>  
  </div>
</template>

<script>
import axios from 'axios'
import Images from '~/components/images.vue'

export default {
  data(){
   return {
     dresses:{},
     weddings:{},
     casuals:{},
     items:[]
     
   }
  },
  components: {
    Images
  },
  methods:{
    imageUrl(image){
      return `${process.env.baseUrl}/api/photos/images/download/${image}`
    }
   },
  mounted(){
    console.log(process.env.baseUrl,'this is base url');
    axios.get(`${process.env.baseUrl}/api/dresses?filter[limit]=4`).then(res=>{

      this.dresses=res.data
    })
axios.get(`${process.env.baseUrl}/api/dresses?filter[where][mini_category]=Wedding&filter[limit]=4`).then(res=>{

      this.weddings=res.data
      console.log(res.data)
    })
    axios.get(`${process.env.baseUrl}/api/dresses?filter[where][mini_category]=Casual&filter[limit]=4`).then(res=>{

      this.casuals=res.data
    })
    axios.get(`${process.env.baseUrl}/api/carasouls`).then(res=>{
                 this.items=res.data
                  console.log(res.data)
                 
             })
             console.log(this.items)
  }
}

</script>
<style>
.v-window__container--is-active {
    height: 100% !important;
}



@media only screen and (min-width: 1000px) {
  .container {
    /* max-width: 1185px; */
    max-width: 100%;
  }
}

.container {
  /* margin: auto; */
  /* padding: 24px; */
  margin: 0;
  padding: 0;
}
.wedding{
  margin-left:5px !important
}
</style>
