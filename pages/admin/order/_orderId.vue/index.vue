<template>
<div  class='ma-5 pa-3'  >
	<div class='ma-5' >
<v-layout row wrap>
<v-layout row wrap>
 <v-flex  xs12 sm6 md6>
<no-ssr>
<v-flex  xs12 sm6  md4    >
     <div >

         <v-card width='250px' flat >
        <v-card  flat>
        <v-img
        
          class="white--text"
          height="350px"
          :src="`${process.env.baseUrl}/api/photos/images/download/${shipping.image}`"
        >
         </v-img>
        </v-card>
        <v-card-title>
          <div>
            <b class="grey--text" >{{shipping.processing}} Days</b><br>
            
            <span>{{ shipping.customer_name}}</span>
          </div>
        </v-card-title>
         </v-card>
     </div>
   </v-flex>
</no-ssr>
 </v-flex>
 
</v-layout>
  

 
  <div  class='text-xs-center ma-5' xs12 sm6 md3 >
<h1> Ordered  Items </h1>

  <v-layout row wrap > 
      
   <v-flex   class='mt-2' v-for="order in orders" :key="order.id">
             
  <h2>{{order.dress_name}}</h2>
   <h3> Price: <b>$ </b>{{order.price}}</h3>
   <h3>Size: {{order.size}}</h3>
   <h3> Quantiy: {{order.quantity}}</h3>
    
   </v-flex>
  
      

  </v-layout>
</div>
    </v-layout>
</div>

  </div>
</template>



<script>
import Images from '~/components/orderimage.vue'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
  middleware: 'auth',
   layout(context){
       return 'admin'
    },
    
   mixins: [validationMixin],

    validations: {
      
      quantity: { required}
     
      
      }
    ,
components:{
  Images
},
data(){
return {
    size:'FREE SIZE',
    quantity:0,
    shipping:{},
    orders:{},
    imageName:{},   
  
            
   
    }
}
,
    mounted(){
    
    this.$store.state.isLogged=true
if(this.$store.getters.getToken==null){
    this.$router.push('/login')
}
else{

  
   axios.get(`${process.env.baseUrl}/api/shippings/${this.$route.params.orderId}?access_token=${this.$store.getters.getToken}`).then(res=>{
     this.shipping=res.data
     console.log(this.shipping.id)
  axios.get(`${process.env.baseUrl}/api/shippings/${res.data.id}/orders?access_token=${this.$store.getters.getToken}`).then(res=>{

      this.orders=res.data
   
    })

   })
   }

    },
    methods:{
        Add(){
      this.$store.commit('add',{
        dressName:this.dress.name,
        price:this.dress.price,
        quantity:this.quantity,
        image:this.dress.image,
        size:this.size
      })

  
      this.$router.push('/cart')
  

      
    }
    },
computed: {
  
      quantityErrors () {
        const errors = []
        if (!this.$v.quantity.$dirty) return errors
        !this.$v.quantity.required && errors.push('Quantity is required.')
        return errors
      }
      

}


}
</script>


<style >
.preview-box{
  height:500px !important;
 
}
.thumb-list {
  /* height: ; */
  height:100px !important;
  
}

.responsive-image {
  /* height: auto; */
  height: inherit !important;

}



svg:not(:root).svg-inline--fa {
 

  display: none;
}



</style>
