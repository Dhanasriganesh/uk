import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config'

/** Wait until Firebase Auth has finished its initial state check. */
export function waitForAuthReady() {
  return new Promise((resolve) => {
    if (!auth) {
      resolve()
      return
    }
    const unsub = onAuthStateChanged(auth, () => {
      unsub()
      resolve()
    })
  })
}
