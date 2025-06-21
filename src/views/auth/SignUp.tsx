import { useState } from 'react';
import { FormGroup, Label, Button, Form } from 'reactstrap'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form';
import { signUpModel, ISignUpForm } from '../../models/auth'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import AuthApis from '../../apis/authApis'

function Signup() {
    // ** States
    const [payload, setPayload] = useState<ISignUpForm>(signUpModel)
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)
    const [isCPasswordShown, setIsCPasswordShown] = useState<boolean>(false)

    // ** Hooks
    const navigate = useNavigate() 
    const { register, handleSubmit, formState: { errors } } = useForm<ISignUpForm>();

    // ** Function to handle change
    const handleChange = (name: string, value: string) => {
        setPayload(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    // ** Function to handle submit
    const onSubmit = async () => {
        const response = await AuthApis.signup(payload)
        if (response) {
            toast.success('User created successfully. Please log in now')
            navigate('/login')
        }
    }


    return (
        <div className='auth-form'>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h2>Create a new account</h2>
                <p>Welcome, please enter your details to continue</p>
                <p className='another-choice header-choice'>
                  Already have an account ? <br /> <Link to="/login" className='btn'>Login now</Link>
                </p>
                <FormGroup>
                    <Label for='username'>
                        Username
                    </Label>
                    <input
                        {...register('username', {
                            required: {value: true, message: 'Username is required'},
                            minLength: {value: 3, message: 'Username must have at least 3 characters'}
                        })}
                        className='form-control'
                        name='username'
                        type='text'
                        placeholder='username ...' 
                        onChange={e => handleChange('username', e.target.value)}
                        value={payload.username}
                    />
                    {errors?.username && <span className='error-msg'>{errors?.username?.message as string}</span>}
                </FormGroup>
                <FormGroup>
                    <Label for='email'>
                        Email
                    </Label>
                    <input
                        {...register('email', {
                            required: {value: true, message: 'Email is required'},
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                 message: 'This email is not valid'
                            },
                        })}
                        className='form-control'
                        name='email'
                        type='text'
                        placeholder='Enter your email ...' 
                        onChange={e => handleChange('email', e.target.value)}
                        value={payload.email}
                    />
                    {errors?.email && <span className='error-msg'>{errors?.email?.message as string}</span>}
                </FormGroup>
                <FormGroup>
                    <Label for='password'>
                        Password
                    </Label>
                    <Button type='button' className='show-password' onClick={() => setIsPasswordShown(!isPasswordShown)}>
                        {isPasswordShown ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />} 
                    </Button>
                    <input
                        {...register('password', {
                            required: { value: true, message: 'Password is required' },
                            minLength: { value: 8, message: 'Password must have at least 8 characters' },
                            validate: {
                              containsOneLetter: value =>
                                /[A-Za-z]/.test(value) || 'Password must have at least 1 letter',
                              containsOneSpecialCharacter: value =>
                                /[^A-Za-z0-9\s]/.test(value) || 'Password must have at least 1 symbol',
                            }
                        })}
                        className='form-control'
                        name='password'
                        placeholder='Enter your password ...'
                        type={isPasswordShown ? 'text' : 'password'}
                        onChange={e => handleChange('password', e.target.value)}
                        value={payload.password}
                    />
                    {errors?.password && <span className='error-msg'>{errors?.password?.message as string}</span>}
                </FormGroup>
                <FormGroup>
                    <Label for='cpassword'>
                        Confirm password
                    </Label>
                    <Button type='button' className='show-password' onClick={() => setIsCPasswordShown(!isCPasswordShown)}>
                        {isCPasswordShown ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />} 
                    </Button>
                    <input
                        {...register('cpassword', {
                            required: { value: true, message: 'Confirm password is required' },
                            validate: {
                              matchPassword: value =>
                                payload.password == value || 'Passwords not match',
                            }
                        })}
                        className='form-control'
                        name='cpassword'
                        placeholder='Enter your password ...'
                        type={isCPasswordShown ? 'text' : 'password'}
                        onChange={e => handleChange('cpassword', e.target.value)}
                        value={payload.cpassword}
                    />
                    {errors?.cpassword && <span className='error-msg'>{errors?.cpassword?.message as string}</span>}
                </FormGroup>
                <Button type='submit' className='btn main-btn submit'>Sign up</Button>
            </Form> 
        </div>
    )
}

export default Signup