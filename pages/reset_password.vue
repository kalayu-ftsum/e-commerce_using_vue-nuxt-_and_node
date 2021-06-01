<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout  justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Reset Password</v-toolbar-title>
                <v-spacer></v-spacer>
                
              </v-toolbar>
              <v-card-text>
                <v-form>
                    <div v-if='error'>
                        Password not matched
                   </div>
                  <v-text-field prepend-icon="person"    v-model='newPassword' name="password" label="Enter the New Password" type="password"></v-text-field>
                  <v-text-field prepend-icon="person"    v-model='confirmedPassword' name="confirm" label="Confirm Password" type="password"></v-text-field>
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
      newPassword:null,
      confirmedPassword:null,
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
       if(this.newPassword==this.confirmedPassword){
        
        axios.post(`${process.env.baseUrl}/api/Users/reset-password?access_token=${this.$route.query.access_token}`,{newPassword:this.newPassword}).then(res=>{
              if (res.status==200 || res.status==204) {
              this.$router.push('/login')
          
          }
          else{
              this.$router.push('/forgot_password')
             
          }

        })
       }
       else{
       this.error=true
       }
      }
    }
  }
</script>
