<template>
  <v-footer
    dark
    height="auto"
  >
    <v-card
      flat
      tile
      class="brown lighten-1 white--text text-xs-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in symbole"
          :href="icon.link"
          :key="icon.icon"
          class="mx-3 white--text"
          icon
        >
          <v-icon size="24px">{{ icon.icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
       Ethiopian Traditional Clothes. The habesha kemis is the traditional clothing of women in Ethiopia. This ankle length, chiffon-made, snow white dress is usually worn at formal events.
       Ethiopian Traditional Clothes. The habesha kemis is the traditional clothing of women in Ethiopia. This ankle length, chiffon-made, snow white dress is usually worn at formal events.
       Ethiopian Traditional Clothes. The habesha kemis is the traditional clothing of women in Ethiopia. This ankle length, chiffon-made, snow white dress is usually worn at formal events.
       
       </v-card-text>

      <v-divider></v-divider>
  <v-card-text class="white--text pl-0">

Fasika Tibeb
<br />
Habesha's Brand 🇪🇷 🇪🇹
<br />
📱 +251937929911
<br />
  +251927699487
<br />
📞+251 11 154 1218 store
<br />
Bitcoin is accepted
<br />
✈️ Worldwide delivery DHL 
    
  </v-card-text>

  <v-divider></v-divider>
  <h3 >Developers</h3>
   Kalayu Ftsum
   
   Muez Haftu
      
   Awet Nega
   <br />

       <v-divider></v-divider>
      <v-card-text class="white--text">
        &copy;2019 — <strong>Fasika Tibeb
        </strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      symbole: [
        {icon:'fab fa-facebook',link:"https://www.facebook.com/Fasikatibeb/"}
        ,{icon:'fab fa-instagram',link:"https://www.instagram.com/official_fasikatibeb/?hl=en"}
        ,{icon:'fab fa-twitter',link:""}
        ,{icon:'fab fa-google-plus',link:""}
        ,{icon:'fab fa-linkedin',link:""}
      ]
    })
  }
</script>