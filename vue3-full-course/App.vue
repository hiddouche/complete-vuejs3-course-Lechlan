<template>
  <AppHeader @toggleModal='toggleModal' />
  <router-view></router-view>
  <teleport to='#my-nice-modal'>
    <LoginModal v-if='showModal' theme='' @click='click'>
      <template #header>
        <h1>Login</h1>
      </template>
      <template #default>
        <form @submit.prevent='submit'>
          <div class="form-group">
            <label for="">Email</label>
            <input v-model='username' type="text" placeholder='Email'>
          </div>
          <div class="form-group">
            <label for="">Password</label>
            <input v-model='password' type="password" placeholder='Password'>
          </div>
          <button class='submit-btn' type='submit'>Login</button>
        </form>
      </template>
      <template #footer>
        <p>footer</p>
      </template>
    </LoginModal>
  </teleport>
</template>

<script>

import { ref, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { db } from './firebase/config'
import AppHeader from './components/AppHeader.vue'
import LoginModal from './components/LoginModal.vue'

export default {

  components: {
    AppHeader,
    LoginModal
  },

  setup(props, ctx) {

    const router = useRouter()
    const route = useRoute()
    const showModal = ref(false)
    const username = ref('')
    const password = ref('')

    onBeforeMount(() => {
      // db.auth().onAuthStateChanged(user => {
      //   if (!user){
      //     router.replace('/accordion')
      //   } else if (route.path == '/login' || route.path == '/register' ){
      //     router.replace('/')
      //   }
      // })
    })
    
    const click = (event) => {
      if (event.target.classList.contains('backdrop') || event.target.classList.contains('close-modal') ) showModal.value = false
    }

    const toggleModal = (event) => {
      showModal.value = event
    }

    const submit = () => {

      showModal.value = false
    }

    return {
      username,
      password,
      showModal,
      click,
      toggleModal,
      submit
    }
  }

}
</script>

<style lang='scss'>
  body {
    margin:0;
    padding:0;
  }

  .form-group {
        display:flex;
        flex-direction: column;
        margin-bottom: 2rem;

        input {
          padding:.8rem 2rem;
          margin-top:.2rem;
          border:none;
          background-color: rgba($color: rgb(211, 199, 199), $alpha: .15);
          outline: none;
          box-shadow: 1px 2px 2px rgba($color: black, $alpha: .15);
        }
      }

      .submit-btn {
        display:block;
        width: 100%;
        padding:.5rem 2rem;
        font-size: 120%;
        background-color: purple;
        color: #FFF; 
        margin-top: 3rem;
        border-radius:5px;
        cursor:pointer;    
      }
</style>