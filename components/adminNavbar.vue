<template>
<nav  app class='orange--text text--darken-5 ' flat color='brown'>
  
      <v-toolbar app class='orange--text text--darken-5 ' flat color='brown'>
        
        <v-toolbar-side-icon class="hidden-md-and-up"  @click="show=!show">
        </v-toolbar-side-icon>
      <v-toolbar-title ><v-btn flat route to='/admin/table'   class='orange--text text--darken-5 '>Fasika Tibeb</v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
        
           <div   class="text-xs-center">
      <v-layout justify-space-around flat>
                  <v-flex >
                      <v-expand-x-transition>
                          <div v-show="expand" style="white-space: nowrap">
                               <v-text-field v-model='search'
                               placeholder="Start typing to Search"
                               append-icon="close"
                               @click:append='search=null'
                                @keyup.enter="searchA"
        
                               
                                ></v-text-field>
                          </div>
                       </v-expand-x-transition>
                    </v-flex>
                    <v-flex>
                          <v-btn
                              icon
                         
                              flat
                              @click="expand = !expand"
                            >
                            <v-icon>search</v-icon>
                          </v-btn>

                        </v-flex>
                  </v-layout>

</div>

     <div   class='orange--text text--darken-3 text-xs-center hidden-sm-and-down'  >
        <v-btn   flat class='golden'   router to='/admin/table' >
            <span  class='menu1'>Home</span>
            </v-btn>
            </div>
            <div   class='orange--text text--darken-3 text-xs-center hidden-sm-and-down'  >
            <v-btn   flat class='golden'   router to='/admin/orders' >
            <span  class='menu1'>Orders</span>
            </v-btn>
            </div>
            <div   class='orange--text text--darken-3 text-xs-center hidden-sm-and-down'  >
            <v-btn   flat class='golden'   router to='/admin/payedCustomer' >
            <span  class='menu1'>Paid Customer</span>
            </v-btn>
            </div>
            <div   class='orange--text text--darken-3 text-xs-center hidden-sm-and-down'  >
            <v-btn   flat class='golden'   router to='/admin/carouselTable' >
            <span  class='menu1'>Carousel</span>
            </v-btn>
            </div>
            <div   class='orange--text text--darken-3 text-xs-center hidden-sm-and-down'  >
            <v-btn   flat class='golden'   router to='' @click='logout' >
            <span  class='menu1'>Logout</span>
            </v-btn>
            </div>
    </v-toolbar>
  
    <v-navigation-drawer app  v-model="show" class="hidden-md-and-up">
    <div    xs12  >
<v-layout column wrap>
   <v-list class='list listDrawer'>
          <v-list-tile
             class='listTile mt-3'
             router to='/admin/table'
          >
            <v-list-tile-title >Home</v-list-tile-title>
          </v-list-tile>

          <v-list-tile
             class='listTile'
             router to='/admin/orders'
          >
            <v-list-tile-title >Orders</v-list-tile-title>
          </v-list-tile>


          <v-list-tile
             class='listTile'
             router to='/admin/PayedCustomer'
          >
            <v-list-tile-title >Paid Customer</v-list-tile-title>
          </v-list-tile>
             <v-list-tile
             class='listTile'
             router to='/admin/carouselTable'
          >
            <v-list-tile-title >Carousel</v-list-tile-title>
          </v-list-tile>
      
      
        </v-list>
      
     
</v-layout>
            </div>
     

    </v-navigation-drawer>
 
</nav>
</template>

<script>
import Search from './search.vue'
import axios from 'axios'
import { async } from 'q';

export default {
data () {
    return {
         search:null,
        show:false,
        drawer:false,
         expand: false
    
    }
  },
  mounted(){
  this.login=this.$store.state.login
  this.loggedin=this.$store.state.isLogged
  },

   components:{
        Search
    },
  methods: {
  
logout() {
   axios.post(`${process.env.baseUrl}/api/Users/logout?access_token=${this.$store.getters.getToken}`).then(res=>{
    this.$store.commit('setToken',null)
    this.$router.push('/login')
  })
  
  
     
 
} 
    ,
     searchA(){
       this.$router.push('/admin/search/'+this.search)
       
       this.model=null
       this.entries=[]
    
      },
    
    
  }
}
</script>

<style scoped>
.cartButton{
    height:40px !important;
    width:40px !important;
    background-color:#263238 !important;
    color:white
    }
nv{
   height: 68px;
 margin: 0px 8px;
}
.v-btn {
 height: 68px;
 margin: 0px 8px;
}
.golden{
  margin:0px !important
}
.golden:hover{
  background-color:#BCAAA4;
  text-align:left !important
}
.main{
  margin-left:0px !important;
  background-color:#795548;
  height:50px;
  padding:10px 0px!important
}
.main:hover{
   background-color:antiquewhite;
  border-left-style: solid;
  border-left-width:5px;
  border-left-color:rgb(168, 107, 16)
}
.list{
 background-color:#BCAAA4
}
.listTile:hover{
  background-color:antiquewhite;
  border-left-style: solid;
  border-left-width:5px;
  border-left-color:#FF3D00
}
.menu1{
  color:whitesmoke !important
}
.menu1:hover{
color:black !important
}
.cartClose{
     height:50px !important;
     width:50px !important;
     margin-right: 0px !important;

}
</style>
