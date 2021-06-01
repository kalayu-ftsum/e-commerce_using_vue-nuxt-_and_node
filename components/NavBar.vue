<template>
<nav  app class='orange--text text--darken-5 ' flat color='brown'>
  <div app class='orange--text text--darken-5 ' style='background-color:brown' flat color='brown'>
      <v-toolbar app class='orange--text text--darken-5 ' flat color='brown'>
        
        <v-toolbar-side-icon class="hidden-md-and-up"  @click="drawer=!drawer">
        </v-toolbar-side-icon>
      <v-toolbar-title ><v-btn flat route to='/'   class='orange--text text--darken-5 '>Fasika Tibeb</v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
        
           <div   class="text-xs-center">
      <v-layout justify-space-around flat>
                  <v-flex >
                      <v-expand-x-transition>
                          <div v-show="expand" style="white-space: nowrap">
                                  <Search />
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

     <div   class='orange--text text--darken-3 text-xs-center hidden-sm-and-down'  flat v-for="items in main_category"      :key="items.icon">
        
      <v-menu :nudge-width="100" open-on-hover  
           
        
          offset-y 
          flat
          class='orange--text text--darken-3 text-xs-center '
          >

         
        <template v-slot:activator="{ on }" class=" text-xs-center "  >
           <v-toolbar-title   >
             <v-btn v-on="on"  flat class='golden'   router :to='`/${items.link}`' >
            <span  class='menu1'>{{ items.title}}</span>
            <v-icon dark>arrow_drop_down</v-icon>
            </v-btn>
        </v-toolbar-title>   
        </template>
         
        <v-list class='list'>
          <v-list-tile
            v-for="item in items.list"
            :key="item.title"
             router :to='`/${item.link}`'
             class='listTile'
          >
            <v-list-tile-title v-text="item.title" ></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu> 
 
            </div>
   <div class="text-xs-center">
    <v-badge left>
      <template v-slot:badge  class='warning'>
        <span>{{count}}</span>
      </template>
      <v-icon
       
        color="red lighten-4"
        @click="cart=!cart"
      >
        shopping_cart
      </v-icon>
    </v-badge>


  </div>    
    </v-toolbar>
    <v-navigation-drawer app  v-model="drawer" class="hidden-md-and-up">
    <div    xs12 flat v-for="items in main_category"      :key="items.icon">

     <v-flex xs12 >
  <div     > <v-btn  class='main' block  flat router :to='`/${items.link}`'>{{ items.title}}  </v-btn> </div>
     </v-flex>
        <v-list class='list listDrawer'>
          <v-list-tile
            v-for="item in items.list"
            :key="item.title"
            flat
             router :to='`/${item.link}`'
             class='listTile'
          >
            <v-list-tile-title v-text="item.title" ></v-list-tile-title>
          </v-list-tile>
        </v-list>
       
  
            </div>
     

    </v-navigation-drawer>
    <v-navigation-drawer app  right v-model="cart" >
      <v-layout column wrap>
      <v-flex xs2 offset-xs8>
       <v-btn small class='cartClose error'  @click='cart=false' ><v-icon>clear</v-icon> </v-btn>
       </v-flex>
    <div    xs12 flat v-for="cart in carts"      :key="cart.dressName"  >
       
         <v-flex xs12>
            <v-card  >
              <v-layout>
                <v-flex xs5  >
                  <v-card   router
                  :to='`/dress/${cart.dressName}`' flat>
                  <v-img
                
                   :src="`${api}/api/photos/images/download/${cart.image}`"
                    height="125px"
                    contain
                  ></v-img>
                  </v-card>
                </v-flex>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{cart.dressName}}</div>
                      <div>${{cart.price}}</div>
                    
                    </div>
                    
                      
                                         
                       
                     
                  </v-card-title>
                </v-flex>
                
              </v-layout>
            <v-card-actions class="pa-3">
                Quantity
                <v-spacer></v-spacer>
               <v-btn small wrap class='cartButton' flat fab @click='decrease(cart.dressName,cart.size,cart.quantity)'> 
                          <v-icon size='15px'>fa-minus</v-icon>
                      </v-btn>
                    {{cart.quantity}}
              <v-btn  class='cartButton' flat small fab @click='increase(cart.dressName,cart.size)'>  <v-icon size='15px'>fa-plus</v-icon> </v-btn>
                  
            </v-card-actions>
            </v-card>
          </v-flex>
         
            </div>
      <v-layout row wrap class='ma-3'>
            <v-flex xs2 text-xs-center>
           <v-btn style='height:30px !important'  small router to='/cart' @click='cart=false'> Show Cart</v-btn>

            </v-flex>
            <v-flex xs2 offset-xs3>
           <v-btn style='height:30px !important' color="purple"
        dark
        depressed small router to='/checkout' @click='cart=false'> Checkout</v-btn>

            </v-flex>
            </v-layout>
      </v-layout>
     

    </v-navigation-drawer>
  </div>


  
 
</nav>
</template>

<script>
import Search from './search.vue'

export default {
data () {
    return {
         api:process.env.baseUrl,
         search:null,
        login:false,
        show:false,
        loggedin:false,
        cart:false,
        drawer:false,
         expand: false,
      menu: [
        { icon: 'home', title: 'Link A', link:'/' },
        { icon: 'info', title: 'Link B' , link:'/info'},
        { icon: 'warning', title: 'Link C' , link:'/home'}
      ],
main_category:[
        {title:'Men Cloth', link:'Men Cloth',list:[
                                             {title:'T-Shirt With Trouser',link:'T-Shirt With Trouser'},
                                             {title: 'Coat with trouser',link:'Coat with trouser'}
                                              ,{title:'Gabi',link:'Gabi'} ]
        
         },
        {title:'Decotion',link:'Decotion',list:[
                 {title: 'Wedding ',link: 'Wedding'},
                 {title:'Baptism',link:'Baptism'},
                 {title:'Engagment',link:'Engagment'},
                 {title:'Graduation',link:'Graduation'},
                 {title: 'Red corpet',link: 'Red Corpet'}
    ]},
{title: "Women's",link:"Women's",list:[
                        {title:'Teletafi',link:'Teletafi'},
                        {title:'Tilf',link:'Tilf'},
                        {title:'Fetil',link: 'Fetil'},
                        {title:'Luand me fetil',link:'Luand Me Fetil'},
                        {title:'Nexela',link:'Nexela'}
   
  ]},
        {title:"Others",link:"Others",list:[
        
          {title:'Necklace',link:'Necklace'}, 
           {title:'Bracelet',link:'Bracelet'},
            {title:'Shoes',link:'Shoes'},
             {title:'Casual',link:'Casual'}     
        
      
    ]},
        {title: "kids",link:"Kids",list:[
    {title:'Kids',link:'Kids'}
  ]},
    ]
    }
  },
  mounted(){
  this.login=this.$store.state.login
  this.loggedin=this.$store.state.isLogged
  },

   components:{
        Search
    },
  computed:{
    isLogin(){
      if(this.login==this.$store.state.login){
          return this.login
      }
      else{
        return this.$store.state.login
      }
        
    },
    isLoggedin(){
      if(this.loggedin==this.$store.state.isLogged){
          return this.loggedin
      }
      else{
        return this.$store.state.isLogged
      }
        
    },
    count(){
      return this.$store.getters.items;
    },
    carts(){
      return this.$store.getters.cart;
    }
  },
  methods: {
    logout(){
      this.$store.commit('removeToken',null)
      this.$store.state.isLogged=false
      this.$router.push('/login')
    },
     searchA(){
       this.$router.push('/admin/search/'+this.search)
       
       this.model=null
       this.entries=[]
    
      },
    menuItems () {
      return this.menu
    },
    increase(name,size){
      this.$store.commit('increment',{
        dressName:name,
        size:size
      })
    },
    decrease(name,size,quantity){
      this.$store.dispatch('decrement',{
        dressName:name,
        size:size,
        quantity:quantity
      })
    }
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
