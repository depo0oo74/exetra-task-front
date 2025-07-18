import { useState } from 'react';
import { FormGroup, Label, Button, Form } from 'reactstrap'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form';
import { loginModel, ILoginForm } from '../../models/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import AuthApis from '../../apis/authApis';
import { useAuth } from '../../hooks/useAuth';

function Login() {
    // ** States
    const [payload, setPayload] = useState<ILoginForm>(loginModel)
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)

    // ** Hooks
    const navigate = useNavigate();
    const { checkAuth } = useAuth();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ILoginForm>({
        defaultValues: loginModel
    });

    const handleChange = (name: keyof ILoginForm, value: string) => {
        setPayload(prevState => ({
            ...prevState,
            [name]: value
        }));
        setValue(name, value, { shouldValidate: true });
    };

    // ** Function to handle submit
    const onSubmit = async () => {
        interface Iresponse {
            data?: {
                accessToken: string
            }
        } 
        const response: Iresponse | undefined = await AuthApis.login(payload)

        if (response) {
            await checkAuth()
            toast.success('Logged in successfully')
            navigate('/')
        }
    }


    return (
        <div className='auth-form'>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h2>Login</h2>
                <p>Enter your email and password to log in</p>
                <FormGroup>
                    <Label for='email'>
                        Email <sup>*</sup>
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
                        Password <sup>*</sup>
                    </Label>
                    <Button type='button' className='show-password' onClick={() => setIsPasswordShown(!isPasswordShown)}>
                        {isPasswordShown ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />} 
                    </Button>
                    <input
                        {...register('password', {
                            required: { value: true, message: 'Password is required' }
                        })}
                        className='form-control'
                        name='password'
                        placeholder='Enter your password ...'
                        type={isPasswordShown ? 'text' : 'password'}
                        onChange={e => handleChange('password', e.target.value)}
                        value={payload.password}
                    />
                    {errors?.password && <span className='error-msg'>{errors?.password?.message as string}</span>}
                    <Link to='/forgot-password' className='btn forgot-password'>Forgot your password ?</Link>
                </FormGroup>
                <p className='another-choice'>
                    Don't have an account ?<br /> <Link to='/signup' className='btn'>Sign up now</Link>
                </p>
                <Button type='submit' className='btn main-btn submit'>Login</Button>
            </Form> 
        </div>
    )
}

export default Login