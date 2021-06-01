<template>
<div class='ma-5'>
  
  <button v-on:click="purchase">Purchase</button>
     
  </div>

</template>
<script>
import axios from 'axios'
export default{
    methods:{
   purchase(){
       axios.get("http://localhost:8000/pay").then(res => {
  console.log(res);
});
   }

    }
}

</script>