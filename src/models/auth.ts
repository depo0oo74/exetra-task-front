// Login form interface
export interface ILoginForm {
    email: string;
    password: string;
}

// Login form model schema
export const loginModel: ILoginForm = {
    email: '',
    password: ''
}

// Signup form interface
export interface ISignUpForm {
    username: string;
    email: string;
    password: string;
    cpassword: string;
}

// Signup form model schema
export const signUpModel: ISignUpForm = {
    username: '',
    email: '',
    password: '',
    cpassword: ''
}

// forgot password form interface
export interface IForgotPassForm {
    email: string;
}

// forgot password form model schema
export const ForgotPassModel: IForgotPassForm = {
    email: ''
}

// reset password form interface
export interface IResetPassForm {
    password: string;
    cpassword: string;
}

// reset form model schema
export const ResetPassModel: IResetPassForm = {
    password: '',
    cpassword: ''
}