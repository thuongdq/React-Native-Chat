// Validate Email
export const isValidEmail = (stringEmail: string) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail));

// Validate Password
export const isValidPassword = (stringPassword: string) => stringPassword.length >= 3;