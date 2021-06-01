<template>
     <div class='ma-5'>
       <v-layout row wrap>
         <v-flex xs12 md4 v-for='shipping in shippings' :key='shipping.id'>
      <v-card width='250px' flat >
        <v-card  flat>
        <v-img
        
          class="white--text"
          height="350px"
          :src="`${process.env.baseUrl}/api/photos/receit/download/${shipping.image}`"
        >
         </v-img>
        </v-card>
        <v-card-title>
          <div>
            <b class="grey--text" >{{shipping.processing}} Days</b><br>
            
            <span>{{ shipping.customer_name }}</span>
              <Counter
           :started="shipping.updated" 
           :duration="shipping.processing" />  
          </div>
        </v-card-title>
        <v-card-actions>
          
           <v-btn route :to="`/admin/order/${shipping.id}`" >
           Show Orders
          
           </v-btn>
         <v-btn color="error" fab small> 
         <confirm 
         :name='shipping.customer_name'
         @deleteItem='deleteItem(shipping.id,shipping.image)'

         />
            </v-btn>
       
                 
        </v-card-actions>
      </v-card>
         </v-flex>
       </v-layout>

  </div>
</template>


<script>
import confirm from '~/components/confirm.vue'
import Counter from '~/components/counter.vue'
import axios from 'axios'
export default {
  middleware: 'auth',
components:{
 confirm ,
Counter
},
data(){
    return{
     shippings:{}
    }
},
  props:['image','price','name','id'],
   layout(context){
       return 'admin'
    },
   methods:{
    initialize () {
     var uri=`${process.env.baseUrl}/api/shippings?filter[where][paid]=true&access_token=${this.$store.getters.getToken}`;
      axios.get(uri).then((res) => {
         this.shippings =res.data;
         console.log(this.shippings)
         
});

      },
      deleteItem (item,image) { 
            
             axios.delete(`${process.env.baseUrl}/api/shippings/${item}/orders?access_token=${this.$store.getters.getToken}`).then((res) => {
                axios.delete(`${process.env.baseUrl}/api/photos/images/files/${image}?access_token=${this.$store.getters.getToken}`).then(res=>{
                  axios.delete(`${process.env.baseUrl}/api/shippings/${item}?access_token=${this.$store.getters.getToken}`).then(res=>{
                  
        
          })
        
          })
             })    
    
      }    

  
     },
mounted(){
   
  this.initialize()

  
}
    ,
created(){
   
  this.initialize()

  
}
   
   ,updated(){
   
  this.initialize()

  
}


}

</script>

