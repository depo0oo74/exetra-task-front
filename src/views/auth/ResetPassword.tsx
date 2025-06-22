import { useState } from 'react';
import { FormGroup, Label, Button, Form } from 'reactstrap'
import { Link, useNavigate, useParams } from 'react-router'
import { useForm } from 'react-hook-form';
import { ResetPassModel, IResetPassForm } from '../../models/auth'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import AuthApis from '../../apis/authApis'

function ResetPassword() {
    // ** States
    const [payload, setPayload] = useState<IResetPassForm>(ResetPassModel)
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)
    const [isCPasswordShown, setIsCPasswordShown] = useState<boolean>(false)

    // ** Hooks
    const navigate = useNavigate() 
    const { token } = useParams()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IResetPassForm>({
        defaultValues: ResetPassModel
    });

    // ** Function to handle change
    const handleChange = (name: keyof IResetPassForm, value: string) => {
        setPayload(prevState => ({
            ...prevState,
            [name]: value
        }));
        setValue(name, value, { shouldValidate: true });
    }

    // ** Function to handle submit
    const onSubmit = async () => {
        const response = await AuthApis.resetPass(payload, token as string)
        if (response) {
            toast.success('Your password has been reset successfully, Login now')
            navigate('/login')
        }
    }


    return (
        <div className='auth-form'>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h2>Reset your password</h2>
                <p>Enter your new password to continue</p>
                <FormGroup>
                    <Label for='password'>
                        Password <sup>*</sup>
                    </Label>
                    <Button type='button' className='show-password' onClick={() => setIsPasswordShown(!isPasswordShown)}>
                        {isPasswordShown ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />} 
                    </Button>
                    <input
                        {...register('password', {
                            required: { value: true, message: 'Password is required' },
                            minLength: { value: 8, message: 'Password must have at least 8 characters' },
                            validate: {
                              containsOneCapitalLetter: value =>
                                /[A-Z]/.test(value) || 'Password must have at least 1 capital letter',
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
                        Confirm password <sup>*</sup>
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
                <Button type='submit' className='btn main-btn submit'>Reset password</Button>
            </Form> 
        </div>
    )
}

export default ResetPassword