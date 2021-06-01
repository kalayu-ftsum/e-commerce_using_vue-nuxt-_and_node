<template>
  <div class="text-xs-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on }">
        <v-btn
          flat
           class='orange ' dark
          v-on="on"
        >
         Share <v-icon>share</v-icon>
        </v-btn>
      </template>

      <v-card>
          <v-layout column wrap class='component'>
        <no-ssr>
 <social-sharing url="https:fasikatibeb.com/"
                      title="Habesha Traditional Cloth"
                      description="Most fast "
                      quote="Fasika Tibeb is the edge of betterness and enhancement in Traditonal cloth"
                      hashtags="FasikaTibeb,EthiopianTraditonalCloth,HabeshaTraditionalCloth,EritreanTraditionalCloth"
                      twitter-user="FasikaTibeb"
                      inline-template>
  <div class='headerDiv'>
      <network network="email" >
          <i class="fa fa-envelope"></i> Email
      </network>
      
          
      <network network="facebook" >
        <button class='share-buttons' >
          <i class='fab fa-facebook icon ' aria-hidden="true"></i>Facebook</button>
      </network>
      <network network="instagram" class='social'>  
          <i class='fab fa-instagram' aria-hidden="true"></i>Facebook
      </network>
      <network network="googleplus" class='social'>
        <i class="fab fa-google-plus"></i> Google +
      </network>
      <network network="skype">
        <i class="fab fa-skype" ></i> Skype
      </network>
      <network network="sms">
        <i class="fab fa-commenting-o"></i> SMS
      </network>
      <network network="telegram">
        <i class="fab fa-telegram"></i> Telegram
      </network>
      <network network="twitter">
        <i class="fab fa-twitter"></i> Twitter
      </network>
      <network network="whatsapp">
        <i class="fab fa-whatsapp"></i> Whatsapp
      </network>
  </div>
</social-sharing

>
</no-ssr>

          </v-layout>
      </v-card>
    </v-menu>
  </div>
</template>





<script>import SocialSharing from 'vue-social-sharing';
 

export default{
  component:{
    SocialSharing
  }

,
    data: () => ({
      fav: true,
      menu: false,
      message: false,
      hints: true
    })
  }
</script>


<style scoped>
.component{
  border-radius: 10px !important;
  padding:10px !important;

}
.share-buttons{
   height:200px !important;
   width:200px !important;
}
.headerDiv{
  display: contents;
  border-radius: 10px !important;
  padding:5px !important;
}
.social{
  height:100px !important;
  width:100px !important;
   padding:5px !important;
}
.icon{
  align-content: center !important;
  margin:10px !important;
  height:100px !important;
  width:100px !important
}
.fa-envelope {
   width: 40px;
   height:100px !important;
   width:100px !important
}
</style>
