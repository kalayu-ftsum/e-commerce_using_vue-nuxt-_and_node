<template>
 <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" round dark  class="mb-2" v-on="on" @click="$emit('on')">Upload Carasoul</v-btn>
        </template>
          <v-card wrap>
                <v-form   v-model='valid' enctype="multipart/form-data" ref="form" >
         <v-card-title>
           
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

                     <v-layout wrap>
                <v-flex xs12 class='pa-3'>
<v-text-field
      v-model="editedItem.name"
      label="Dresses name"
      :rules="[(v) => !!v || 'Name is required']"
      required
     ></v-text-field>

            </v-flex>
                <v-flex xs12  class='pa-3'>
                    <v-select
     v-model="editedItem.main_category"
      :items="mainCategorys"
      label="Main Category"
     :rules="[(v) => !!v || 'Main Category is required']"
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
                    color="blue-grey"
                     class="white--text"
            flat 
           
            @click="save"
            
            >
            
                    <v-icon right dark>cloud_upload</v-icon>
            Save
            
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
           valid: false,
        imageId:'',
      menu2: false,
         dressName:'',
        
        imageFilesUrl:null,
        imageFilesName:null,
        imageFilesFile:null,
        editedIndex: -1,
      imageUpdated:'',
      editedItem: {
        name: '',
        image:'',
        main_category:null
        },
        defaultItem:
        {
         name: '',
         image:'',
        main_category:null 
        }
,      mainCategorys: [
        'Men Cloth',
        'Decotion',
        "Women's",
        "Others",
        "kids"
      ]

      
    }
)

,

    watch: {
      dialog (val) {
        if(val&&this.id){
             this.editItem(this.id)
        }
      }
    },
    methods:{
       editItem (item) {
       axios.get(`${process.env.baseUrl}/api/carasouls/${item}`).then((res) => {
          
            this.editedItem = res.data
             this.imageUpdated=this.editedItem.image
        })
       }
        ,

     close () {
        
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.imageFilesUrl=null
          this.imageFilesName=null
          this.imageFilesFile=null
          this.imageUpdated=''
          this.editedIndex = -1
           this.$emit('close')
        },100)
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
		
    save () {
      if(   this.$refs.form.validate()){
        if (this.id) {
            
          var fImage=new FormData();
          if(this.imageFilesFile){
           fImage.append('image1',this.imageFilesFile);
         this.editedItem.image=this.imageFilesName;
           axios.delete(`${process.env.baseUrl}/api/photos/images/files/${this.imageUpdated}?access_token=${this.$store.getters.getToken}`).then(res=>{
             })  
          } 
            
      if(fImage) {axios.post(`${process.env.baseUrl}/api/photos/images/upload?access_token=${this.$store.getters.getToken}`,fImage).then(res=>{
          
        })
        }
          axios.put(`${process.env.baseUrl}/api/carasouls/${this.id}?access_token=${this.$store.getters.getToken}`,this.editedItem).then((res) => {
            this.close()
         
         })

        } else {
          
           this.submit()    
            
        }
      }
      },
    submit () {
       
   var fImage=new FormData();
          fImage.append('image1',this.imageFilesFile)
          var dress={};
          dress=this.editedItem;
          dress.image=this.imageFilesName;
        axios.post(`${process.env.baseUrl}/api/photos/images/upload?access_token=${this.$store.getters.getToken}`,fImage).then(res=>{
          if(res){
        axios.post(`${process.env.baseUrl}/api/carasouls?access_token=${this.$store.getters.getToken}`,dress).then(res=>{
          
          
              this.close()
             } )            
          }        

           })
          

        

        
        }
    

    }
  ,
computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Carasoul' : 'Edit Carasoul'
      },
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
