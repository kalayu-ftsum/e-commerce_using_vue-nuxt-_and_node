<template>
<div class='ma-5'>
  <div ref="card" ></div>
  <button v-on:click="purchase">Purchase</button>
     
  </div>
</template>

<script>
import axios from 'axios'

export default {

  data(){
   return{
  stripe:null,
  elements:null,
  card:null
   }
 },
  mounted() {
 
    if (process.browser) {
     this.stripe=Stripe("pk_test_Ed16pQhJvgHymjeAEzdrfFP900DHUGuXdm");
    this.elements = this.stripe.elements();
    var style = {
  base: {
    color: '#32325d',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

// Create an instance of the card Element.
    this.card = this.elements.create('card', {style: style});
    this.card.mount(this.$refs.card);
      
      } else {
      this.onScriptLoaded();
    }
  },
  methods: {
    onScriptLoaded(event = null) {
      if (event) {
        console.log("Was added");
      } else {
        console.log("Already existed");
      }

     },
    purchase() {

  let self = this;
  console.log('purchase happen')
  this.stripe.createToken(this.card).then(function(result) {
    if (result.error) {
    } else {
 axios.post("http://localhost:8000/",{ token:result.token.id }).then(res => {
console.log(res);
});
    }
  });


  },

}
}
</script>
 