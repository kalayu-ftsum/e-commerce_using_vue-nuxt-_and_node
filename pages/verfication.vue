<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout  justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Admin Login</v-toolbar-title>
                <v-spacer></v-spacer>
                
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <div>IF verfication email not sent Click the Button</div>
               </v-form>

              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" 
                 @click='submit()'              >Send Verfication</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
  export default {
    data: () => ({
      drawer: null,
      email:null,
      password:null,
      token:null
    }),
mounted(){
this.$store.state.login=true
},
    props: {
      source: String
    },
    methods:{
      submit(){
        console.log('submit')
        const credentials={
          email:this.email
        }
    
          console.log(this.$store.state.email)
        axios.post(`${process.env.baseUrl}/api/Users/reset`,{email:this.$store.state.email}).then(res=>{
              if (res.status==200 || res.status==204) {
              console.log('loggedin')
              this.$router.push('/verfication')
          
          }
          else{
              console.log('incorrect')
              this.$router.push('/forgot_password')
          }
        })

      }
    }
  }
</script>
