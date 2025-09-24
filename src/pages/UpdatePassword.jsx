import { useForm } from "react-hook-form";
import YardLink from "../components/common/YardLink";
import SmallLoader from "../components/common/SmallLoader";
import YardInput from "../components/common/YardInput";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import YardButton from "../components/common/YardButton";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";

function UpdatePassword() {

  const {register, watch, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const newPasswordValue = watch('password');
  const confirmPasswordValue = watch('confirmpassword');
  const [searchParams] = useSearchParams();
  const [sessionReady, setSessionReady] = useState(false);
  const navigate = useNavigate();
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type');

  useEffect(() => {
    async function initRecoverySession() {
      if(tokenHash && type === 'recovery') {
        const { error: sessionError } = await supabase.auth.verifyOtp({
          type: "recovery",
          token_hash: tokenHash,
        });

        if(sessionError) {
          toast.error('Session error, kindly try again...');
          console.log(sessionError);
        } else {
          setSessionReady(true);
        }
      }
    }

    initRecoverySession();
  }, [tokenHash, type]);

  async function OnPasswordUpdate() {
    if (newPasswordValue !== confirmPasswordValue) {
      toast.error(`Your new password doesn't match your confirm password`);
      return null;
    }

    if (!sessionReady) {
      toast.error('No active session');
      return;
    }

    if (!tokenHash) {
      toast.error('Invalid or missing reset link');
      return;
    }

    const { error: updateUserError } = await supabase.auth.updateUser({
      password: newPasswordValue,
    });

    if (updateUserError) {
      toast.error('Unable to update your password, kindly try again...');
      console.log(updateUserError);
    } else {
      toast.success('Password updated successfully');
      reset();
      navigate('/sign-in');
    }

  }

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
          <h1 className='font-semibold text-2xl text-center'>Update your password</h1>
        </div>
        <form onSubmit={handleSubmit(OnPasswordUpdate)}>
          <div className='mt-10 text-gray-600'>
            <YardInput 
              label='New Password'
              placeholder='Enter you new password'
              type='password'
              id='password'
              name='password'
              iconElement={<EnvelopeIcon className='size-6' />}
              register={register}
              validation={{required: 'New password is required'}}
              error={errors?.password}
            />
            <YardInput 
              label='Confirm Password'
              placeholder='Comfirm password'
              type='password'
              id='confirmpassword'
              name='confirmpassword'
              iconElement={<EnvelopeIcon className='size-6' />}
              register={register}
              validation={{required: 'Confirm password is required'}}
              error={errors?.confirmpassword}
            />
            <YardButton 
              disabled={isSubmitting} 
              id="updatePassword" 
              value='update password'
              type='submit'
              className='flex justify-center items-center w-full md:w-100 my-10 m-[0px_auto] rounded-lg h-10 bg-green-600 text-white button-glow'
            >
                {isSubmitting ? <SmallLoader /> : 'Update Password'}
            </YardButton>
          </div>
        </form>
        <div className='text-center'>
            <YardLink to='/sign-in'>Back to Login</YardLink>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;


