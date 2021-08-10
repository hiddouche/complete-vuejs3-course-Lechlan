import { ref } from "vue"
import { auth } from "../firebase/config"

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {

  error.value = null
  isPending.value = true
  try {
    const res = await auth.signInWithEmailAndPassword (email, password)
    if (!res) throw new Error ("could not complete the signup")
    error.value = null
    isPending.value = false
    return res
  } catch (err) {
    console.log(err.message)
    error.value = "Incorrect login credentials"
    isPending.value = false
  }

}

const useLogin = () => {
  return {login, isPending, error}
}

export default useLogin