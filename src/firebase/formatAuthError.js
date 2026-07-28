/** User-friendly messages for Firebase Auth errors. */
export function formatAuthError(error) {
  const code = error?.code || ''
  if (code === 'auth/network-request-failed') {
    return 'Network error — cannot reach Firebase. Check your internet connection, disable VPN, or try another network.'
  }
  if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
    return 'Invalid email or password. Check your credentials and try again.'
  }
  if (code === 'auth/too-many-requests') {
    return 'Too many failed attempts. Wait a few minutes and try again.'
  }
  if (code === 'auth/user-disabled') {
    return 'This account has been disabled. Contact your administrator.'
  }
  return error?.message || 'Login failed. Check your email and password.'
}
