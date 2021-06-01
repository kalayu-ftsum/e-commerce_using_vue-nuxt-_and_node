<template>
<div class='search'>
<v-layout row 
   

> 

   <v-flex  xs12 sm6  md4 v-for="shipping in shippings" :key="shipping.id"   >
     <div >
     <Images  
     :image="shipping.image"
     :name="shipping.customer_name"
     :price="shipping.processing"
     :id="shipping.id"
         />
     </div>
   </v-flex>
      

  </v-layout>
<div v-if='error'>
  <h1>{{$route.params.search}} Not Found </h1>
  <v-btn router to='/admin/table'>Back To Home</v-btn>
  </div>

</div>
</template>

<script>
import axios from 'axios'
import Images from '~/components/orderimage.vue'
export default {
  middleware: 'auth',
 layout(context){
       return 'admin'
    },
data(){
return {
    shippings:{},
    error:false
}}
,components: {
    Images,
    
  },
    mounted(){
    this.$store.state.isLogged=true
if(this.$store.getters.getToken==null){
    this.$router.push('/login')
}
else
{  
        var nameD=`?access_token=${this.$store.getters.getToken}&filter[where][paid]=true&filter={"where":{"customer_name":{"like":"${this.$route.params.search}","options":"i"}}}`;
              var uri=`${process.env.baseUrl}/api/shippings`+nameD;
        
             axios.get(uri).then(res=>{
               console.log(res.data)
           if(res.data[0]){
             this.shippings=res.data
}else{
  this.error=true
}

             })
   

}
    }

}
</script>


<style  scoped>

 .layout{
   margin-top:80px !important
 }

</style>
