<template>
 <v-dialog v-model="dialog" max-width="600px">
          <v-card wrap>
                <v-form   ref='form' v-model='valid' enctype="multipart/form-data" >
         <v-card-title>
           
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

                     <v-layout wrap>
                <v-flex xs12 class='pa-3'>
            </v-flex>
                <v-flex xs12  class='pa-3'>
                    <v-select
     v-model="editedItem.processing"
      :items="mainCategorys"
      label="processing Time"
          :rules="[(v) => !!v || 'Processing is required']"
                   required
      
   
    ></v-select>
            
                </v-flex>
    
				<v-flex  xs12  class="pa-3 text-xs-center text-sm-center text-md-center text-lg-center">
					<img :src="imageFilesUrl" height="150" v-if="imageFilesUrl"/>
					<v-text-field label="Select Front Image" @click='pickFile' 
               :rules="[(v) => !!v || 'Image is required']"
                   required
      
          v-model='imageFilesName' prepend-icon='attach_file'></v-text-field>
					<input
						type="file"
						style="display: none"
						ref="image"
						accept="image/*"
						@change="onFilePicked"
					>
				</v-flex>
       
       		   
              </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn 
            :loading="isLoading"
                     color="blue-grey"
                     class="white--text"
            
             flat @click="submit">Save
               <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
          </v-card-actions>
          </v-form>
        </v-card>

      </v-dialog>   
</template>

<script>
  import axios from 'axios'



export default {

props:['id','dialog'],
 data: () => ({
        isLoading:false,
        valid:false,
        search:'',
        imageId:'',
      menu2: false,
         dressName:'',
        
        imageFilesUrl:null,
        imageFilesName:null,
        imageFilesFile:null,
        editedIndex: -1,
      imageUpdated:'',
      editedItem: {
        image:'',
        processing:null
        },
        defaultItem:
        {
         image:'',
        processing:null 
        }
,      mainCategorys: [
        24,30,12
      ]

      
    }
)

,

    watch: {
      dialog (val) {
          }
    },
    methods:{
       
       
        

     close () {
       this.$emit('close')
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.imageFilesUrl=null
          this.imageFilesName=null
          this.imageFilesFile=null
         this.isLoading=false
          this.imageUpdated=''
          this.editedIndex = -1
        }, 300)
      },
      pickFile () {
            this.$refs.image.click ()
        },
		onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageFilesName = files[0].name
				if(this.imageFilesName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageFilesUrl = fr.result
					this.imageFilesFile = files[0] // this is an image file that can be sent to server...
				})
			} 
    }
   ,
    submit () {
       if( this.$refs.form.validate()){
       this.isLoading=true
        var fImage=new FormData();
          fImage.append('image1',this.imageFilesFile)
     
        axios.post(`${process.env.baseUrl}/api/photos/receit/upload?access_token=${this.$store.getters.getToken}`,fImage).then(res=>{
          if(res){
            axios.get(`${process.env.baseUrl}/api/shippings/${this.id}?access_token=${this.$store.getters.getToken}`).then(res=>{
               
                      var dress={};
                      dress=res.data
                      console.log(res.data)
                      console.log(this.editedItem)
                     dress.processing=this.editedItem.processing;
                     dress.image=this.imageFilesName;
                     dress.paid=true;
                     console.log(dress)
                     
        axios.put(`${process.env.baseUrl}/api/shippings/${this.id}?access_token=${this.$store.getters.getToken}`,dress).then(res=>{
          
          
              this.close()
             } )            
           }) }        

           })
          

        

      }
        }
    

    }
  ,
computed: {
   isUnfilled(){
      let unfilled=false
      Object.keys(this.editedItem).forEach(f => {
          if (!this.editedItem[f]) {unfilled=true
          return
          };    
        })
        return unfilled || !this.imageFilesName
   },
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      mainCategoryErrors () {
        const errors = []
        if (!this.$v.editedItem.processing.$dirty) return errors
        !this.$v.editedItem.processing.required && errors.push('Item is required')
        return errors
      }
      
    }

}
</script>

<style scoped>
.inputPrice input[type='number'] {
    -moz-appearance:textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}


</style>
