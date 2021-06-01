<template>
  <v-app >
     <Navbar />
   

   <v-layout row wrap>
     



            <v-flex xs12 class='mt-5'>
    
                    <nuxt  />
                </v-flex>

   </v-layout>
 <div class='social' >
          <v-btn fab icon>
               <v-avatar
                size="40px"
              >
                <img
                  src="~/assets/imo.png"
                  alt="Avatar"
                >
             
                

              </v-avatar>
              </v-btn>
          
           <v-btn fab icon href="">
               <v-avatar
                size="40px"
              >
                <img
                  src="~/assets/whatsapp.png"
                  alt="Avatar"
                >
             
                

              </v-avatar>
              </v-btn>
          
             </div>
             

   

 
<div class='footer'>
<Footer />
</div>





     </v-app>
</template>

<script>
import Navbar from '~/components/NavBar.vue'
import Footer from '~/components/footer.vue'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>
<style scoped>
.social{
position:fixed;
margin-left:90% !important;
margin-right:0% !important;
margin-top:30% !important;
margin-bottom:10% !important;
z-index:100 !important;
}
.sidebar {
 
  width: 240px; /* Set the width of the sidebar */
 
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 40px;
 
}
.footer{
  z-index:200;
}
</style>

