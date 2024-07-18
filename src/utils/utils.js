export const formattedClp = (value) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(value) 
}

export const errorMessages = {
  'auth/invalid-email': 'El correo es inválido',
  'auth/invalid-credential': 'Credencial inválida',
  'auth/wrong-password': 'Contraseña incorrecta',
  'auth/user-not-found': 'Usuario no encontrado',
  'auth/invalid-email-verified': 'Email no verificado',
  'auth/weak-password': 'La contraseña es muy débil',
  'auth/email-already-in-use': 'Correo ya está en uso',
  'auth/credential-already-in-use': 'Credencial ya está en uso',
  'auth/too-many-requests':
    'Has solicitado demasiados códigos, intenta más tarde',
  'auth/invalid-verification-code': 'Código inválido',
  'auth/code-expired': 'Código expirado',
  'auth/account-exists-with-different-credential':
    'El número ya está en uso con otra cuenta',
}