import { EnvelopeIcon } from "@heroicons/react/24/outline";
import YardInput from "../components/common/YardInput";
import YardButton from "../components/common/YardButton";
import { Link } from "react-router-dom";
import SmallLoader from "../components/common/SmallLoader";
import { useForm } from "react-hook-form";
import YardLink from "../components/common/YardLink";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ForgotPasswordPage() {
    const { register, handleSubmit, setFocus, reset, formState: { errors, isSubmitting }} = useForm();
    const [emailSent, setEmailSent] = useState(false);

    async function OnPasswordReset(data) {
        console.log(data);
        try {
            const res = await axios.post('https://ostjnxcfscqbkjzrofhr.supabase.co/functions/v1/ResetPassword', 
                data, {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY}`
                    }
                }
            );
            toast.success('Password link sent to your email');
            setEmailSent(true);
            reset();
            return res?.data;
        } catch (error) {
            console.log(error);
            toast.error(`An error occured: ${error}`);
        }
    }

    useEffect(function () {
        setFocus('email');
    }, [setFocus]);

    return (
        <div className="grid place-items-center overflow-hidden min-h-[100dvh] bg-gray-50 dark:bg-[#121212]">
            <div className='w-80 md:w-120 rounded-lg backdrop-blur-2xl bg-white p-5 shadow-2xl dark:bg-[#171717]'>
                <div className='flex gap-5 justify-center items-center'>
                    <Link to='/'>
                        <img src='/src/assets/yard_house.webp' alt='Yard Logo' className='w-15 h-15' />
                    </Link>
                    <span className='font-bold text-3xl'>Yard</span>
                </div>

                <div className='mt-6 space-y-2'>
                    <h1 className='font-semibold text-2xl text-center'>Reset your password</h1>
                    <p className='text-center text-xs md:text-sm'>Enter your email address and we'll send you a link to reset your password</p>
                </div>

                {emailSent && <div>Hey check your email</div> }

                {!emailSent && 
                <form onSubmit={handleSubmit(OnPasswordReset)}>
                    <div className='mt-10 text-gray-600'>
                        <YardInput 
                            label='Email'
                            placeholder='Enter you email'
                            type='email'
                            id='email'
                            name='email'
                            iconElement={<EnvelopeIcon className='size-6' />}
                            register={register}
                            validation={{required: 'Email is required'}}
                            error={errors?.email}
                            // ref={forgotPasswordEmail}
                        />

                        <YardButton 
                            // onClick={handleResetEmail} 
                            disabled={isSubmitting} 
                            id="resetPassword" 
                            value='reset password'
                            type='submit'
                            className='flex justify-center items-center w-full md:w-100 my-10 m-[0px_auto] rounded-lg h-10 bg-green-600 text-white button-glow'
                        >
                            {isSubmitting ? <SmallLoader /> : 'Send Reset Link'}
                        </YardButton>
                    </div>
                </form>
                }

                <div className='text-center'>
                    <YardLink to='/sign-in'>Back to Login</YardLink>
                </div>

            </div>
        </div>
    );
}

export default ForgotPasswordPage;
