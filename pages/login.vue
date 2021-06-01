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
                  <div v-if="error" class='red'>
                    Enter correct Email Or Password
                  </div>
                  <v-text-field prepend-icon="person"                   v-model='email' name="email" label="email" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock"       v-model='password' name="password" label="Password" type="password"></v-text-field>
                   <div><a href='/forgot_password'>Forget Password</a></div>
                </v-form>

              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" 
                 @click='submit()'              >Login</v-btn>
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
      error:false,
      isLogin:false
    }),
mounted(){

},
    props: {
      source: String
    },
    methods:{
    submit(){
      let credentials={
        email:this.email,
        password:this.password
      }
   axios.post(`${process.env.baseUrl}/api/Users/login`,credentials).then(res=>{
     if(res.status=200&&res.data.id){
       this.isLogin=true
       this.$store.commit('setToken',res.data.id)
       this.$router.push('/admin/table')
     }
     else{
       this.error=true
     }
   }).catch(err=>{
   if(err){
this.error=true

   }
      
   })       
    }
  }
  }
</script>
