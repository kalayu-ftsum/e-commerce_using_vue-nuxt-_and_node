<template>
  <v-app >
     <Navbar />
   

   <v-layout row wrap>
     



            <v-flex xs12 class='mt-5'>
    
                    <nuxt  />

                </v-flex>

   </v-layout>
 

   

 
<div class='footer'>
<Footer />
</div>





     </v-app>
</template>

<script>
import Navbar from '~/components/adminNavbar.vue'
import Footer from '~/components/footer.vue'

export default {

  components: {
    Navbar,
    Footer
  }
}
</script>
<style scoped>
.sidebar {
 
  width: 240px; /* Set the width of the sidebar */
 
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 40px;
 
}
.footer{
  z-index:2;
}
</style>

