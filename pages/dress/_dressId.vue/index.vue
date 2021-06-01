<template>
<div  class='ma-5 pa-3'  >
	<div class='ma-5' >

<v-layout row wrap>
 <v-flex  xs12 sm6 md6>
<no-ssr>
<ProductZoomer
  :base-images="images"
  :base-zoomer-options="zoomerOptions"
     style='height:600px;width:300px'
/>
</no-ssr>
 </v-flex>
 <v-flex xs12 sm6 md6>
<v-layout column wrap>

    <v-flex xs12 sm5 md6>
    <h1>  {{$route.params.dressId }} </h1>

    </v-flex>
<v-form ref='form' >    
          <v-flex xs12 sm6 class="py-2">
            <p>SIZE</p>
            <v-btn-toggle v-model="size" mandatory active-class>
              <v-btn  value="FREE SIZE" class='pa-3'>
                FREE SIZE
              </v-btn>
              <v-btn  value="XS" class='pa-3'>
                XS
              </v-btn>
              <v-btn  value="S" class='pa-3'>
                S
              </v-btn>
              <v-btn  value="M" class='pa-3'>
                M
              </v-btn>
              <v-btn  value="L" class='pa-3'>
                L
              </v-btn><v-btn flat value="XL" class='pa-3'>
                XL
              </v-btn>
              <v-btn  value="XXL" class='pa-3'>
                XXL
              </v-btn>
            </v-btn-toggle>
          </v-flex>
          <v-flex xs4>Price   

            <p>$ {{dress.price-(dress.discount/100)}}</p>
          </v-flex>
<v-flex xs3>
    <v-text-field
    type='number'
    min=1
      v-model="quantity"
      label="Quantity"
      :rules="[(v) => !!v || 'Quantity is required']"
      required
     
    ></v-text-field>
</v-flex>
<v-flex xs6>
   <v-btn color="error" dark large @click='Add()'>Add to Cart</v-btn>
  </v-flex>
   </v-form>
          </v-layout>
 </v-flex>
 
</v-layout>
  </div>

 
  <div  class='text-xs-center ma-5'  >
<h1> Related Items </h1>
</div>
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

  </div>
</template>



<script>
import Images from '~/components/images.vue'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
    asyncData (context) {
  
     return axios.get(`${context.env.baseUrl}/api/dresses?filter[where][name]=${context.params.dressId}&filter[limit]=1`).then(res=>{
             
         
    return axios.get(`${context.env.baseUrl}/api/dresses/${res.data[0].id}/images`).then(res=>{
    return{images:{
         
        normal_size: [
         {
            id:1,
            url:`${context.env.baseUrl}/api/photos/images/download/${res.data[0].front}`
          },
           {
            id:2,
            url:`${context.env.baseUrl}/api/photos/images/download/${res.data[0].back}`
          },
           {
            id:3,
            url:`${context.env.baseUrl}/api/photos/images/download/${res.data[0].side_left}`
          },
           {
            id:4,
            url:`${context.env.baseUrl}/api/photos/images/download/${res.data[0].side_right}`
          }
        ]
      }
    }
          
       
       })
      
        })
  

      }

  ,
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
    quantity:1,
    dress:{},
    dresses:{},
    imageName:{},   
    zoomerOptions: {
    zoomFactor:4 ,
    pane: "pane",
    hoverDelay: 300,
    namespace: "zoomer",
    move_by_click:true,
    scroll_items: 7,
    choosed_thumb_border_color: "#dd2c00"
}
            
   
    }
}
,
    mounted(){
   axios.get(`${process.env.baseUrl}/api/dresses?filter[where][name]=${this.$route.params.dressId}`).then(res=>{
     this.dress=res.data[0]
  
  axios.get(`${process.env.baseUrl}/api/dresses?filter[where][or][0][main_category]=${this.dress.main_category}&filter[where][or][1][mini_category]=${this.dress.mini_category}&filter[order]=updated%20desc&filter[limit]=4`).then(res=>{

      this.dresses=res.data
   
    })

   })
   
  axios.get(`${process.env.baseUrl}/api/dresses?filter[where][or][0][main_category]=${this.dress.main_category}&filter[where][or][1][mini_category]=${this.dress.mini_category}&filter[where][limit]=2`).then(res=>{

      this.dresses=res.data
   
    })
    },
    methods:{
        Add(){
      if( this.$refs.form.validate()){
      this.$store.commit('add',{
        dressName:this.dress.name,
        price:this.dress.price,

        quantity:this.quantity,
        image:this.dress.image,
        size:this.size
      })
          
      this.$router.push('/cart')
      }

      
    }
    },
computed: {
  
      

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
