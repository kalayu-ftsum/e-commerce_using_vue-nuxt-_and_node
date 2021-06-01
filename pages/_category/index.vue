<template>
<div>
  <v-container>
  <v-layout
    column
  
     
  >
    <v-parallax
    dark
      v-for="(item,i) in items"
      :key="i"
      :src="imageUrl(item.image)"
  >
    <v-layout
      align-center
      column
      justify-center
    >
      <h1 class="display-2 font-weight-thin mb-3">{{item.main_category}}</h1>
      <h4 class="subheading">Fasika Tibeb</h4>
    </v-layout>
  </v-parallax>

    </v-layout>
  
  <div >
    <v-layout row wrap  justify-end>
  
      
   <v-flex xs12 md4  v-if='isMain'>
       <div>
         
         <v-menu :nudge-width="20" 
           
        
          offset-y
          
          flat
          class=" text-xs-center "
          >
        <template v-slot:activator="{ on }" class=" text-xs-center "  >
           <v-toolbar-title   >
            <v-btn v-on="on"  flat   router to='' >
            <span >Display All {{sort.title}}</span>
            <v-icon dark>arrow_drop_down</v-icon>
            </v-btn>
        </v-toolbar-title>   
        </template>

        <v-list class='list'>
          <v-list-tile
            class='listTile'
            v-for="item in sort.list"
            :key="item.title"
             router to=''
             @click='find(item.title)'
          >
            <v-list-tile-title v-text="item.title" ></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu> 
      
       </div>

          </v-flex>
    
   <v-flex xs12 md4 >
       <div>
         <v-menu :nudge-width="100" 
           
        
          offset-y
          
          flat
          class=" text-xs-center "
          >
        <template v-slot:activator="{ on }" class=" text-xs-center "  >
           <v-toolbar-title   >
            <v-btn v-on="on"  flat   router to='' >
            <span >Sort By</span>
            <v-icon dark>arrow_drop_down</v-icon>
            </v-btn>
        </v-toolbar-title>   
        </template>

        <v-list>
          <v-list-tile
            v-for="item in itemSort"
            :key="item.title"
             router to=''
             @click='display(item.link)'
          >
            <v-list-tile-title v-text="item.title" ></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu> 
      </div>


          </v-flex>
    </v-layout>
          
<v-layout row wrap > 
   <v-flex xs12 sm6 md3 class='mt-5' v-for="dress in dresses" :key="dress.name">
     <Images  
     :image="dress.image"
     :name="dress.name"
     :price="dress.price"
     :discount="dress.discount"
     :id='dress.id'
     
     />
   </v-flex>
      

  </v-layout>
 </div>
  </v-container>  
  </div>

</template>

<script>
import axios from 'axios'
import Images from '~/components/images.vue'

export default {
  data(){
   return {
     isMain:false,
     sort:{},
    trend:'collections',
    itemSort:[
    {title:'Alphabetically A-Z', link:'NameAsc'},
    {title:'Alphabetically Z-A', link:'NameDesc'},
    {title:'Price High to Low', link:'PriceDesc'},
    {title:'Price Low to High', link:'PriceAsc'},
    {title:'Date New to Old', link:'DateDesc'},
    {title:'Date Old to New', link:'DateAsc'},
    ],
    mainCategory:'',
    mini_category : [
          'T-Shirt With Trouser',
           'Coat with trouser',
           'Gabi',
           'Wedding ',
           'Baptism',
           'Engagment',
           'Graduation',
           'Red corpet',
           'Teletafi',
           'Tilf',
           'Fetil',
           'Luand me fetil',
           'Nexela',
           'Necklace',
           'Bracelet',
          'Casual',
         
        ],
    main_category:[
    'Men Cloth',
    'Decotion',
    "Women's",
    'kids',
    'Others'
    ],

    main_categorys:[
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
    ],

    dresses:{},
   items:[]
   }
  },
  components: {
    Images
  },
  methods:{
    display(order){
       if(order=='NameAsc'){
       axios.get(`${process.env.baseUrl}/api/dresses?filter[where][main_category]=${this.$route.params.category}&filter[order]=name%20asc&filter[limit]=4`).then(res=>{
                 this.dresses=res.data
         })
       }else if(order=='NameDesc'){
       axios.get(`${process.env.baseUrl}/api/dresses?filter[where][main_category]=${this.$route.params.category}&filter[order]=name%20desc&filter[limit]=4`).then(res=>{
                 this.dresses=res.data
         })
       }else if(order=='PriceAsc'){
   axios.get(`${process.env.baseUrl}/api/dresses?filter[where][main_category]=${this.$route.params.category}&filter[order]=price%20asc&filter[limit]=4`).then(res=>{
                 this.dresses=res.data
         })
       
       }else if(order=='PriceDesc'){
   axios.get(`${process.env.baseUrl}/api/dresses?filter[where][main_category]=${this.$route.params.category}&filter[order]=price%20desc&filter[limit]=4`).then(res=>{
                 this.dresses=res.data
         })
       
       }else if(order=='DateAsc'){
       axios.get(`${process.env.baseUrl}/api/dresses?filter[where][main_category]=${this.$route.params.category}&filter[order]=trend%20asc&filter[limit]=4`).then(res=>{
                 this.dresses=res.data
         })
       
       }else if(order=='DateDesc'){
  axios.get(`${process.env.baseUrl}/api/dresses?filter[where][main_category]=${this.$route.params.category}&filter[order]=trend%20desc&filter[limit]=4`).then(res=>{
                 this.dresses=res.data
         })
       
       }
    },
    find(miniCategory){
         axios.get(`${process.env.baseUrl}/api/dresses?filter[where][main_category]=${this.$route.params.category}&filter[where][mini_category]=${miniCategory}&filter[order]=updated%20desc&filter[limit]=4`).then(res=>{
                 this.dresses=res.data
         })
    },
      imageUrl(image){
      return `${process.env.baseUrl}/api/photos/images/download/${image}`
    }
  },
  mounted(){
      if(this.$route.params.category){
      if( this.main_category.includes(this.$route.params.category)){
             axios.get(`${process.env.baseUrl}/api/dresses?filter[where][main_category]=${this.$route.params.category}&filter[order]=updated%20desc&filter[limit]=4`).then(res=>{
                 this.dresses=res.data
                 this.mainCategory=this.$route.params.category
                 this.isMain=true
                 console.log(this.main_categorys)
                 if(this.$route.params.category=='Men Cloth'){
                   this.sort=this.main_categorys[0]
                 }else if(this.$route.params.category=='Decotion'){
                   this.sort=this.main_categorys[1]
                 }else if(this.$route.params.category=="Women's"){
                   this.sort=this.main_categorys[2]
                 }else if(this.$route.params.category=='Others'){
                   this.sort=this.main_categorys[3]
                 }else if(this.$route.params.category=='Kids'){
                   this.sort=this.main_categorys[4]
                 }
                 
                 else{
                 this.sort=''
                 }
             })
       axios.get(`${process.env.baseUrl}/api/carasouls?filter[where][main_category]=${this.$route.params.category}&filter[order]=updated%20desc&filter[limit]=1`).then(res=>{
                 this.items=res.data
                 
             })
      }else if( this.mini_category.includes(this.$route.params.category)){
             axios.get(`${process.env.baseUrl}/api/dresses?filter[where][mini_category]=${this.$route.params.category}&filter[order]=updated%20desc&filter[limit]=4`).then(res=>{
                 this.dresses=res.data
                
                 this.mainCategory=res.data[0].main_category
               axios.get(`${process.env.baseUrl}/api/carasouls?filter[where][main_category]=${res.data[0].main_category}&filter[order]=updated%20desc&filter[limit]=1`).then(res=>{
                 this.items=res.data
                  
                 
             })

             })
      
      }else if(this.$route.params.category.includes(this.trend)){
          axios.get(`${process.env.baseUrl}/api/dresses?filter[where][trend]=${this.$route.params.category}`).then(res=>{
                 this.dresses=res.data
             })
      }
      }
    
  }
}

</script>
<style>

@media only screen and (min-width: 1000px) {
  .container {
    /* max-width: 1185px; */
    max-width: 100%;
  }
}

.container {
  /* margin: auto; */
  /* padding: 24px; */
  margin: 0;
  padding: 0;
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

</style>
