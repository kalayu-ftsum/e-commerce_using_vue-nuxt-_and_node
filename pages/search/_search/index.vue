<template>
<div class='search'>
<v-layout row 
   

> 

   <v-flex  xs12 sm6  md4 v-for="dress in dresses" :key="dress.name"   >
     <div >
     <Images  
     :image="dress.image"
     :name="dress.name"
     :price="dress.price"
     :id="dress.id"
         />
     </div>
   </v-flex>
      

  </v-layout>
<div v-if='error'>
  <h1>{{$route.params.search}} Not Found </h1>
  <v-btn router to='/'>Back To Home</v-btn>
  </div>

</div>
</template>

<script>
import axios from 'axios'
import Images from '~/components/images.vue'
export default {
data(){
return {
    dresses:{},
    error:false
}}
,components: {
    Images,
    
  },
    mounted(){

        var nameD='?filter={"where":{"name":{"like":"'+this.$route.params.search+'","options":"i"}}}';
              var uri=`${process.env.baseUrl}/api/dresses`+nameD;
        
             axios.get(uri).then(res=>{
               console.log(res.data)
           if(res.data[0]){
             this.dresses=res.data
}else{
  this.error=true
}

             })
   


    }

}
</script>


<style  scoped>

 .layout{
   margin-top:80px !important
 }

</style>
