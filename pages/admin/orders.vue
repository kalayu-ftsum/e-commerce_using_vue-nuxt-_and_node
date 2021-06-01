<template>
  <div  class='mt-5'>
    <v-toolbar flat color="white">
      <v-toolbar-title class="text-md-center">Shipping Information And Ordered Dresses</v-toolbar-title>
      
         <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
       <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <Orders 
         :id='id'
         :dialog="dialog"
         @close='dialog = false'
         
         />
       
        
      
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="shippings"
      :expand="expand"
      :search="search"
      item-key="customer_name"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
            <td>{{ props.item.customer_name }}</td>
      <td class="text-xs-right">{{ props.item.email }}</td>
      <td class="text-xs-right">{{ props.item.phone }}</td>
      <td class="text-xs-right">{{ props.item.country }}</td>
      <td class="text-xs-right">{{ props.item.address_line }}</td>
      <td class="text-xs-right">{{ props.item.city }}</td>
      <td class="text-xs-right">{{ props.item.state }}</td>
      <td class="text-xs-right">{{ props.item.postal_code }}</td>
      <td class="text-xs-right">{{Math.floor((now-new Date(props.item.updated).getTime())/ (1000 * 60 * 60 * 24))}}</td>
      <td class="justify-center ">
          <v-btn color="primary" fab small dark
             class="mr-2"
              @click="editItem(props.item.id)"
           >
          <v-icon
            small
           
          >
            edit
          </v-icon>
          </v-btn>
        </td>
        
      <td class="justify-center  px-0">
         <v-btn color="error" fab small>
         <confirm 
         :name='props.item.customer_name'
         @deleteItem='deleteItem(props.item.id)'

         />
         </v-btn>
        </td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <v-card flat>
 <v-data-table
    v-model="selected"
    :headers="orderHeaders"
    :items="getOrders(props.item.id)"
    item-key="dress_name"
    select-all
    class="elevation-1"
  >
    <template v-slot:items="prop">
      <td>
      
      </td>
      <td>{{ prop.item.dress_name  }}</td>
      <td class="text-xs-center">{{ prop.item.quantity }}</td>
      <td class="text-xs-center">{{ prop.item.price }}</td>
      <td class="text-xs-center">{{ prop.item.size }}</td>
      
      <td class="justify-center  px-0">
         <v-btn color="error" fab small>
         <confirm 
         :name='prop.item.dress_name'
         @deleteItem='deleteOrder(prop.item.id)'

         />
         </v-btn>
         </td>
      
    </template>
  </v-data-table>
        </v-card>
      </template>
    </v-data-table>
  </div>
</template>




<script>
import confirm from '~/components/confirm.vue'
import Orders from '~/components/order.vue'
import axios from 'axios'
  export default {
    middleware: 'auth',
      components:{
          confirm,
          Orders
      },
       layout(context){
       return 'admin'
    },
    data () {
      return {
        now:0,
         search:'',
          id:null ,
      dialog: false,
        selected: [],
        expand: false,
        headers: [
          {
            text: 'Customer Name',
            align: 'left',
            sortable: false,
            value: 'customer_name'
          },
          { text: 'Email', value: 'email',align: 'right' },
          { text: 'Phone Number', value: 'phone',align: 'right' },
          { text: 'Country', value: 'country',align: 'right' },
          { text: 'Address', value: 'address_line',align: 'right' },
          { text: 'City', value: 'city',align: 'right' },
          { text: 'State', value: 'state',align: 'right' },
          { text: 'Zip', value: 'postal_code',align: 'right' },
          { text: 'Orders _ Days Ago', value: 'updated',align: 'right' },
           { text: 'Upload Payment', value: 'payment', sortable: false },
           { text: 'DELETE', value: 'name', sortable: false }
        ],
        orderHeaders: [
          {
            text: 'Dress Name',
            align: 'left',
            sortable: false,
            value: 'dress_name'
          },
          { text: 'Quantity', value: 'quantity',align: 'center' },
          { text: 'Price ( $ )', value: 'price',align: 'center' },
          { text: 'Size', value: 'size',align: 'center' },
           { text: 'DELETE', value: 'name', sortable: false,align: 'center' }
        ],
        shippings:[],
        orders:[]
        
      }
    },
    methods:{
        initialize () {
          this.now =new Date().getTime()
     var uri=`${process.env.baseUrl}/api/shippings?access_token=${this.$store.getters.getToken}`;
      axios.get(uri).then((res) => {
           this.shippings=res.data.filter(item=>{
            return item.paid==false
          })

});

      },
      deleteOrder(id){
          axios.delete(`${process.env.baseUrl}/api/orders/${id}?access_token=${this.$store.getters.getToken}`).then(res=>{
                   console.log(res)
              })

      },
        deleteItem(id){
              axios.delete(`${process.env.baseUrl}/api/shippings/${id}?access_token=${this.$store.getters.getToken}`).then(res=>{
                 axios.delete(`${process.env.baseUrl}/api/shippings/${id}/orders?access_token=${this.$store.getters.getToken}`).then(res=>{
                   
              })   
              })

        },
        getOrders(id){
             axios.get(`${process.env.baseUrl}/api/shippings/`+id+`/orders?access_token=${this.$store.getters.getToken}`).then(res=>{
               
                
                if(res.data){
                     this.orders=res.data
                }
            
                   
               
            })
            
             return this.orders;  
        }
    ,
editItem(id){
       this.id=id;
       this.dialog=true;
      }
    },
    
    created () {
      this.$store.state.isLogged=true
      this.initialize()
    },
  updated () {
    this.$store.state.isLogged=true
      this.initialize()
    },

 mounted(){
      
    this.$store.state.isLogged=true
if(this.$store.getters.getToken==null){
    this.$router.push('/login')
}else{
  this.initialize()
}
  
}
  }
</script>