import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

const createStore = () => {
    return new Vuex.Store({
    state: {      
      cart:[],
      token:null,
      email:null
    },
    plugins: [createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure:false }),
        removeItem: key => Cookies.remove(key)
      }
    })],
    getters: {
      getToken(state){
     return state.token;
      },
      isAuthenticated(state){
      return state.token!=null || localStorage.getItem('token')!=nullsss
      },
    cart(state) {
        return state.cart;
      },
      items(state) {
        let item=0
        let i;
        for( i in state.cart){
            item+=state.cart[i].quantity
        }
        return item;
      },
    total(state){
      let total=0
      let i;
      for( i in state.cart){
          total+=state.cart[i].quantity*state.cart[i].price
      }
      return total;
    }
  },
    mutations: {
      setEmail(state,email){
        state.email=email
      },
      increment(state,payload){
          const item=state.cart.find(item=>{
            return item.dressName==payload.dressName&&item.size==payload.size
          })
            
            var itemIndex=state.cart.indexOf(item)
            item.quantity++
            state.cart[itemIndex]=item
        
      },
      setToken(state,token){
           state.token=token
      
    }, removeToken(state,token){
      state.token=token
 
},
      decrement(state,payload){
        const item=state.cart.find(item=>{
          return item.dressName==payload.dressName&&item.size==payload.size
        })
          
          var itemIndex=state.cart.indexOf(item)
          item.quantity--
          
          
          state.cart[itemIndex]=item
      
    },
      add(state,payload) {
        const item=state.cart.find(item=>{
          return item.dressName==payload.dressName&&item.size==payload.size
        })
        if(item){
          item.quantity+=parseInt(payload.quantity)
          var itemIndex=state.cart.indexOf(item)
          state.cart[itemIndex]=item
        
        }else{
        const added={
            dressName:payload.dressName,
            price:payload.price,
            quantity:parseInt(payload.quantity),
            image:payload.image,
            size:payload.size
        }
        state.cart.push(added)
      }
   
      },
      remove(state,payload) {
        const item=state.cart.find(item=>{
          return item.dressName==payload.dressName&&item.size==payload.size
        })
     state.cart.splice(state.cart.indexOf(item),1)
      }
    },
    actions:{
      decrement(context,payload){
        if(payload.quantity==1){
          context.commit('remove',{
            dressName:payload.dressName,
            size:payload.size
          })
        }else{
          context.commit('decrement',{
            dressName:payload.dressName,
            size:payload.size
        })
        }
    
    }
      }  })
}


  export default createStore