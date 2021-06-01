<template>
  <div>
    <v-layout column class='ma-5 '  >
<v-flex v-for='item in cart' :key='item.dressName' class='ma-2' >
 
    <v-layout row>
    <v-flex xs12 md6>
      <v-card>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <v-flex
              xs12 md6
            >
              <v-card   router
                  :to='`/dress/${item.dressName}`'  flat>
                <v-img
                  :src="`${api}/api/photos/images/download/${item.image}`"
                  height="300px"
                >
                </v-img>

                 </v-card>
            </v-flex>
            
    <v-flex xs12 md6 class='pa-3 text-xs-center'>
     <h1> {{item.dressName}}</h1>
     <p> {{item.price }}</p>
     <span> {{item.quantity}}</span>
         <span> {{item.size}}</span>
   
    </v-flex>
   
          </v-layout>
        </v-container>
        <v-card-actions>
                  <v-spacer></v-spacer>
                 <v-btn @click='remove(item.dressName)' class='error'>Remove</v-btn>
                  </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
 </v-flex>
 <v-flex xs4  >
   <span >Total $ {{ total}}</span>
  </v-flex>
  <v-flex xs2 offset-xs7 >
   <v-btn class='success' right @click='$router.push("/checkout")'>CheckOut </v-btn>
  </v-flex>
    </v-layout>


  </div>
</template>

<script>
export default {
data(){
    return{
        cart:[],
        api:process.env.baseUrl
    }
}
,
computed:{
total(){
    return this.$store.getters.total
}
},
methods:{
    remove(name){
    this.$store.commit('remove',name)
    }
}
,
mounted(){
    this.cart=this.$store.getters.cart;
}

}
</script>

<style>

</style>
