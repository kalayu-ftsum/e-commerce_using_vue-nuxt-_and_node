<template>
  
  
    <div >
      <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        hide-no-data
        hide-selected
        item-text="Description"
        item-value="API"
        placeholder="Start typing to Search"
        append-icon="close"
        @click:append='model=null'
        @keyup.enter="searchA"
        return-object
        >
</v-autocomplete>
 <div  v-if="model">
  {{ fields  }}
</div>
</div>
</template>


<script>
       import axios from 'axios'


  export default {
    data: () => ({
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null
    }),
methods:{
  searchA(){
       this.$router.push('/search/'+this.search)
       
       this.model=null
       this.entries=[]
    
      }
},
    computed: {
      
      fields () {
           var test= Object.keys(this.model).map(key => {
                    return this.model['name'] 
                      })
            this.$router.push('/search/'+test[0])               
       },
      items () {
        return this.entries.map(entry => {
          const Description = entry.name.length > this.descriptionLimit
            ? entry.name.slice(0, this.descriptionLimit) + '...'
            : entry.name

          return Object.assign({}, entry, { Description })
        })
      }
    },

    watch: {
      search (val) {
        // Items have already been loaded
        if (this.items.length > 0) return

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true
         
           // Lazily load input items
        axios.get(`${process.env.baseUrl}/api/dresses`).then(res=>{
          const entries = res.data
            this.entries = entries
            this.isLoading = false

        })
      }
    }
  }
</script>