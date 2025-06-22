import { useState } from 'react'
import { FormGroup, Label, Button, Form } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { ForgotPassModel, IForgotPassForm } from '../../models/auth'
import { toast } from 'react-toastify'
import AuthApis from '../../apis/authApis'

function ForgotPassword() {
    // ** States
    const [payload, setPayload] = useState<IForgotPassForm>(ForgotPassModel)

    // ** Hooks
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IForgotPassForm>({
        defaultValues: ForgotPassModel
    });

    const handleChange = (name: keyof IForgotPassForm, value: string) => {
        setPayload(prevState => ({
            ...prevState,
            [name]: value
        }));
        setValue(name, value, { shouldValidate: true });
    };

    // ** Function to handle submit
    const onSubmit = async () => {
        const response = await AuthApis.forgotPass(payload)

        if (response) {
            toast.success('Password reset email has been sent successfully')
        }
    }


    return (
        <div className='auth-form'>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h2>Forgot password</h2>
                <p>Enter your email to reset your password</p>
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
                <Button type='submit' className='btn main-btn submit'>Reset password</Button>
            </Form> 
        </div>
    )
}

export default ForgotPassword