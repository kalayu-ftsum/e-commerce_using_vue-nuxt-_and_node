<template>

 <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary"  round dark class="mb-2" v-on="on" @click="$emit('on')">New Item</v-btn>
        </template>
          <v-card wrap>
                <v-form  ref='form'  enctype="multipart/form-data"  v-model='valid'>
         <v-card-title>
           
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

              
                     <v-layout wrap>
                <v-flex xs12 sm6 md4 class='pa-3'>
<v-text-field
      v-model="editedItem.name"
      label="Dresses name"
      :rules="[(v) => !!v || 'Name is required']"
      required
    ></v-text-field>

            </v-flex>
                <v-flex xs12 sm6 md4 class='pa-3'>
                    <v-text-field
      v-model="editedItem.price"
      label="Price"
      prefix='$'
       type='number'
        class="inputPrice"
       :rules="[(v) => !!v || 'Price is required']"
      required
    ></v-text-field>
                </v-flex>
             <v-flex xs12 sm6 md4 class='pa-3'>
                      
    <v-text-field
     class="inputPrice"
     v-model="editedItem.discount"
      label="Discount"
           type='number'
       suffix='%'
        :rules="[(v) => !!v || 'Discount is required']"
        required
    
       min="0"
       max='100'
    ></v-text-field>
                </v-flex>

               <v-flex xs12 sm6 md4 class='pa-3'>
                    <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="editedItem.trend"

            label="Trend"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="editedItem.trend" @input="menu2 = false" :rules="[(v) => !!v || 'Trend is required']"
      required
    ></v-date-picker>
      </v-menu>

                </v-flex>
              <v-flex xs12 sm6 md4 class='pa-3'>

                <v-overflow-btn
          v-model="editedItem.main_category"
          :items="mainCategorys"
          target="#dropdown-example"
           label="Main Category"
      :rules="[(v) => !!v || 'Main Category is required']"
      required
      ></v-overflow-btn>
              </v-flex>
      <v-flex xs12 sm6 md4 class='pa-3'>

                <v-overflow-btn
                   v-model="editedItem.processing"
                   :items="processings"
                   target="#dropdown-example"
                    label="Processing Time"
                   :rules="[(v) => !!v || 'Processing is required']"
                   required
       ></v-overflow-btn>

           
                </v-flex>
             <v-flex xs12 sm6 md4 class='pa-3'>

                  
    <v-select
     v-model="editedItem.mini_category" 
      :items="miniCategorys"
      label="Mini Category"
      :rules="[(v) => !!v || 'Mini Category is required']"
      required
    ></v-select>
                </v-flex>

				<v-flex  xs12 sm6 md4 class="pa-3 text-xs-center text-sm-center text-md-center text-lg-center">
					<img :src="imageFiles.url.front" height="150" v-if="imageFiles.url.front"/>
					<v-text-field label="Select Front Image" @click='pickFileFront' v-model='imageFiles.name.front' 
          :rules="[(v) => !!v || 'Front Image is required']"
          required
    
          prepend-icon='attach_file'></v-text-field>
					<input
						type="file"
						style="display: none"
						ref="imageFront"
						accept="image/*"
						@change="onFilePickedFront"
					>
				</v-flex>
       
       		<v-flex  xs12 sm6 md4 class="pa-3 text-xs-center text-sm-center text-md-center text-lg-center">
					<img :src="imageFiles.url.right" height="150" v-if="imageFiles.url.right"/>
					<v-text-field label="Select Right Image" @click='pickFileRight'
            :rules="[(v) => !!v || 'Right Image is required']"
           required
    
           v-model='imageFiles.name.right' prepend-icon='attach_file'></v-text-field>
					<input
						type="file"
						style="display: none"
						ref="imageRight"
						accept="image/*"
						@change="onFilePickedRight"
					>
				</v-flex>
				<v-flex  xs12 sm6 md4 class="pa-3 text-xs-center text-sm-center text-md-center text-lg-center">
					<img :src="imageFiles.url.left" height="150" v-if="imageFiles.url.left"/>
					<v-text-field label="Select Left Image" @click='pickFileLeft' 
          :rules="[(v) => !!v || 'Left Image is required']"
             required
    
          v-model='imageFiles.name.left' prepend-icon='attach_file'></v-text-field>
					<input
						type="file"
						style="display: none"
						ref="imageLeft"
						accept="image/*"
						@change="onFilePickedLeft"
					>
				</v-flex>

        <v-flex  xs12 sm6 md4 class="pa-3 text-xs-center text-sm-center text-md-center text-lg-center">
					<img :src="imageFiles.url.back" height="150" v-if="imageFiles.url.back"/>
					<v-text-field label="Select Back Image" @click='pickFileBack'
            :rules="[(v) => !!v || 'Back Image is required']"
            required
    
           v-model='imageFiles.name.back' prepend-icon='attach_file'></v-text-field>
					<input
						type="file"
						style="display: none"
						ref="imageBack"
						accept="image/*"
						@change="onFilePickedBack"
					>
				</v-flex>


     
             
              </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn   :loading="isLoading"
                     color="blue-grey"
                     class="white--text"
                     @click='save'
                   >Save
                   
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
       valid:false,
        isLoading:false,
        imageId:'',
        date: new Date().toISOString().substr(0, 10),
      menu2: false,
         dressName:'',
        
        imageFiles:{
          name:{
            front: '',
            back:'',
            left:'',
            right:''
                 },
         url:{
           front:'',
           left:'',
           right:'',
           back:''       
 
         },
         file:{
           front:'',
           left:'',
           right:'',
           back:''
         }
          
        },
        imageFilesDefault:{
          name:{
            front: '',
            back:'',
            left:'',
            right:''
                 },
         url:{
           front:'',
           left:'',
           right:'',
           back:''       
 
         },
         file:{
           front:'',
           left:'',
           right:'',
           back:''
         }
          
        }
      

      

        ,

        editedIndex: -1,
      imageUpdated:{
          imageNameFront:'',
          imageNameLeft:'',
          imageNameRight:'',
          imageNameBack:''
        },

      editedItem: {
        name: '',
        price: 0,
        processing:null,
        discount:null,
        trend:new Date().toISOString().substr(0, 10),
        mini_category:null,
        main_category:null,
        image:'k'
        },
        processings:[
             24,
             7,
             14

        ],
        defaultItem:
        {
         name: '',
        price: 0,
        discount:null,
        trend:new Date().toISOString().substr(0, 10),
        mini_category:null,
        main_category:null,
        image:'k'
        ,processing:null

        }
,
        miniCategorys : [
          'T-Shirt With Trouser',
           'Coat with trouser',
           'Gabi',
           'Wedding',
           'Baptism',
           'Engagment',
           'Graduation',
           'Red corpet',
           'Teletafi',
           'Tilf',
           'Fetil',
           'Luand me fetil',
           'Nexela',
           'Necklace',
           'Bracelet'
          ,
          'Casual',
         
        ],
      mainCategorys: [
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
       axios.get(`${process.env.baseUrl}/api/dresses/${item}`).then((res) => {
           axios.get(`${process.env.baseUrl}/api/dresses/${item}/images`).then((res) => {
              var imageName=res.data[0]
              this.imageId=imageName.id
              this.imageFiles.name.front=imageName.front
              
              this.imageFiles.name.left=imageName.side_left
              this.imageFiles.name.right=imageName.side_right
              this.imageFiles.name.back=imageName.back

              this.imageUpdated.imageNameFront=imageName.front
              this.imageUpdated.imageNameLeft=imageName.side_left
              this.imageUpdated.imageNameRight=imageName.side_right
              this.imageUpdated.imageNameBack=imageName.back  
                   
           })
            this.editedItem = res.data
             this.editedItem.trend = res.data.trend.toString().substr(0, 10)
        })
       }
        ,

     close () {
         
          this.editedItem = Object.assign({}, this.defaultItem)
          this.imageFiles = Object.assign({}, this.imageFilesDefault)
         
          this.imageUpdated=null
          this.editedIndex = -1
          this.isLoading=false
          this.$emit('close')
          
    
      },
      pickFileFront () {
            this.$refs.imageFront.click ()
        },
        pickFileRight () {
            this.$refs.imageRight.click ()
        },
        pickFileLeft () {
            this.$refs.imageLeft.click ()
        },
		pickFileBack () {
            this.$refs.imageBack.click ()
        },
		onFilePickedFront (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageFiles.name.front = files[0].name
				if(this.imageFiles.name.front.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageFiles.url.front = fr.result
					this.imageFiles.file.front = files[0] // this is an image file that can be sent to server...
				})
			} 
    }
    ,
		
		onFilePickedRight (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageFiles.name.right = files[0].name
				if(this.imageFiles.name.right.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageFiles.url.right = fr.result
					this.imageFiles.file.right = files[0] // this is an image file that can be sent to server...
				})
			}
    }
    ,
		onFilePickedLeft (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageFiles.name.left = files[0].name
				if(this.imageFiles.name.left.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageFiles.url.left = fr.result
					this.imageFiles.file.left = files[0] // this is an image file that can be sent to server...
				})
			} 
    }
    
     ,
		onFilePickedBack (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageFiles.name.back = files[0].name
				if(this.imageFiles.name.back.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageFiles.url.back = fr.result
					this.imageFiles.file.back = files[0] // this is an image file that can be sent to server...
				})
			} 
		}
    , 
    save () {
 
     if(   this.$refs.form.validate()){
      



        this.isLoading=true
        if (this.id) {
            
          var fImage=new FormData();
          if(this.imageFiles.file.front){
           fImage.append('image1',this.imageFiles.file.front);
         this.editedItem.image=this.imageFiles.name.front;
           axios.delete(`${process.env.baseUrl}/api/photos/images/files/${this.imageUpdated.imageNameFront}?access_token=${this.$store.getters.getToken}`).then(res=>{
             })  
          } 
         if(this.imageFiles.file.left)  {
           axios.delete(`${process.env.baseUrl}/api/photos/images/files/${this.imageUpdated.imageNameLeft}?access_token=${this.$store.getters.getToken}`).then(res=>{
             })  
             fImage.append('image2',this.imageFiles.file.left);
             
         }  
         if(this.imageFiles.file.right) {
           axios.delete(`${process.env.baseUrl}/api/photos/images/files/${this.imageUpdated.imageNameRight}?access_token=${this.$store.getters.getToken}`).then(res=>{
             })  
             fImage.append('image3',this.imageFiles.file.right);
         }  
         if(this.imageFiles.file.back){
        axios.delete(`${process.env.baseUrl}/api/photos/images/files/${this.imageUpdated.imageNameBack}?access_token=${this.$store.getters.getToken}`).then(res=>{
             })  
           
          fImage.append('image4',this.imageFiles.file.back);
         }   
      if(fImage) {axios.post(`${process.env.baseUrl}/api/photos/images/upload?access_token=${this.$store.getters.getToken}`,fImage).then(res=>{
          
        }).catch(err=>{

        })
        }
          axios.put(`${process.env.baseUrl}/api/dresses/${this.id}?access_token=${this.$store.getters.getToken}`,this.editedItem).then((res) => {
                  var imageName={}
              imageName.front=this.imageFiles.name.front
              imageName.side_left=this.imageFiles.name.left
              imageName.side_right=this.imageFiles.name.right
              imageName.back=this.imageFiles.name.back    
              axios.put(`${process.env.baseUrl}/api/dresses/${this.id}/images/${this.imageId}?access_token=${this.$store.getters.getToken}`,imageName).then((res) => {
                           this.close()
              })
      
        })

        } else {
          
           this.submit()    
            
        }
}
      },
    submit () {
       
        var fImage=new FormData();
          fImage.append('image1',this.imageFiles.file.front)
          fImage.append('image2',this.imageFiles.file.left)
          fImage.append('image3',this.imageFiles.file.right)
          fImage.append('image4',this.imageFiles.file.back)
         
          var name=this.editedItem.name;
          var dress={};
          dress=this.editedItem;
          dress.image=this.imageFiles.name.front;
        axios.post(`${process.env.baseUrl}/api/photos/images/upload?access_token=${this.$store.getters.getToken}`,fImage).then(res=>{
          if(res){
       
        axios.post(`${process.env.baseUrl}/api/dresses?access_token=${this.$store.getters.getToken}`,dress).then(res=>{
          console.log(res)
          console.log(this.editedItem.name)
          var nameD='?filter={"where":{"name":{"like":"'+name+'","options":"i"}}}';
              var uri=`${process.env.baseUrl}/api/dresses`+nameD;
          
           axios.get(uri).then(res=>{
             console.log
             if(res){

                
             var fb={};
             fb.front=this.imageFiles.name.front;
             fb.back=this.imageFiles.name.back;
             fb.side_left=this.imageFiles.name.left;
             fb.side_right=this.imageFiles.name.right;
          

      console.log(res)
             axios.post(`${process.env.baseUrl}/api/dresses/`+res.data[0].id+`/images?access_token=${this.$store.getters.getToken}`,fb).then(res=>{
              this.close()
             console.log(res)
             })
        


             }
            
                      

           })
          

      
 })

          }
      console.log(res)                   
  });
        

        
        }
    

    }
  ,
computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Cloth' : 'Edit Cloth'
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
