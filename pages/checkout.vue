<template>
<div>
   <div  class='ma-3 text-xs-center'>
      <h1 > Shipping Information</h1>
    </div>
  <v-layout justify-center class='ma-5'>
   
    <v-flex xs12 sm10 md8 lg4>
      
      <v-card >
      <v-form ref="form">
        <v-card-text>
          <v-text-field
   
            v-model="name"
            label="Full Name"
            placeholder="Enter Full Name"
            :rules="[(v) => !!v || 'Name is required']"
            required
      ></v-text-field>
   
     <vue-tel-input
         ref="phone_number"
    v-model="phone_number"
     
    label="Phone Number"
   placeholder="Enter Your Phone Number"
    :rules="[(v) => !!v || 'Phone Number is required']"
     required
       ></vue-tel-input>
   
<v-text-field
          v-model="email"
              :rules="emailRules"
                  
      
            label="E-mail"
          ></v-text-field>


          <v-text-field
         v-model="address"
           
            label="Address Line"
            placeholder="Enter Address Line"
             :rules="[(v) => !!v || 'Address Line is required']"
                   required
      
          ></v-text-field>
          <v-text-field
            v-model="city"
            label="City"
            placeholder="Enter City"
           
            :rules="[(v) => !!v || 'City is required']"
            required
      
           ></v-text-field>
           
          <v-text-field
      
            v-model="state"
            label="State/Province/Region"
           placeholder="Enter State/Province/Region"
                :rules="[(v) => !!v || 'State is required']"
                   required
      
          ></v-text-field>
          <v-text-field
         v-model="zip"
            label="ZIP / Postal Code"
            placeholder="00000"
            :rules="[(v) => !!v || 'ZIP is required']"
                   required
      
          ></v-text-field>

          <v-autocomplete
            v-model="country"
            
            :items="countries"
            label="Country"
            placeholder="Select..."
                :rules="[(v) => !!v || 'Country is required']"
                   required
      ></v-autocomplete>
          <v-text-field
            
            v-model="apartament"
            label="Apartament"
            placeholder="Enter Apartament(this is Optional)"
    
          ></v-text-field>
          </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          <v-btn flat>Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="my-0"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" flat @click="submit">Submit</v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import axios from 'axios'
import VueTelInput from 'vue-tel-input';
  export default {
   components: {
    VueTelInput,
  },
    data: () => ({
      countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
      errorMessages: '',
     name: null,
      address: null,
      email:null,
      city: null,
      phone_number:null,
      state: null,
      apartament:'No apartament',
      zip: null,
      country: null,
      formHasErrors: false,
       emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ] 
    }),

    computed: {
      form () {
        return {
          name: this.name,
          address: this.address,
          phone_number:this.phone_number,
          city: this.city,
          state: this.state,
          zip: this.zip,
          country: this.country,
          email:this.email,
          apartament:this.apartament
        }
      }
    },

    watch: {
      name () {
        this.errorMessages = ''
      }
    },
 mounted(){
  
 },
    methods: {
      submit () {
  
        if( this.$refs.form.validate()){
           
          var shipping={}
           shipping.customer_name=this.form.name;
           shipping.state=this.form.state;
           shipping.apartament=this.form.apartament;
           shipping.email=this.form.email;
           shipping.address_line=this.form.address;
           shipping.postal_code=this.form.zip;
           shipping.phone=this.form.phone_number;
           shipping.country=this.form.country;
           shipping.city=this.form.city;
           shipping.paid=false;
          axios.post(`${process.env.baseUrl}/api/shippings/`,shipping).then(res=>{
          
          
              var uri=`${process.env.baseUrl}/api/shippings?filter[where][email]=`+this.form.email;
              console.log(uri)
           axios.get(uri).then(res=>{
             var orders=this.$store.getters.cart;
             var shippingId=res.data[0].id;
             for(let i in orders){
                    var fb={}
                     fb.dress_name=orders[i].dressName;
                     fb.quantity=orders[i].quantity;
                     fb.price=orders[i].price;
                     fb.size=orders[i].size

             axios.post(`${process.env.baseUrl}/api/shippings/`+shippingId+"/orders",fb).then(res=>{
               this.$router.push(`/success?session_id=${shippingId}`)
             })
            
            
            } 
            
            })
           
          
          })
        }
      }
    }
  }
</script>

<style>

</style>
