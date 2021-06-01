<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout  justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Forgot Password</v-toolbar-title>
                <v-spacer></v-spacer>
                
              </v-toolbar>
              <v-card-text>
                <v-form>
                    <div v-if='error'>
                        Enter The Correct Email OR Try Again
                   </div>
                  <v-text-field prepend-icon="person"    v-model='email' name="email" label="Enter the email" type="text"></v-text-field>
               </v-form>

              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" 
                 @click='submit()'              >Send</v-btn>
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
      token:null,
      error:false
    }),
mounted(){
this.$store.state.login=true
},
    props: {
      source: String
    },
    methods:{
      submit(){

        axios.post(`${process.env.baseUrl}/api/Users/reset`,{email:this.email}).then(res=>{
              if (res.status==200 || res.status==204) {
              this.$store.commit('setEmail',this.email)
              console.log(this.$store.state.email)
              this.$router.push('/verfication')
          
          }
          else{
              this.$router.push('/forgot_password')
              this.error=true
          }

        })

      }
    }
  }
</script>
