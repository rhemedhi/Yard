import { Link } from "react-router-dom";
import YardButton from "../components/common/YardButton";
import { FcGoogle } from "react-icons/fc";
import { Apple, Facebook, Lock, LogIn, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import YardInput from "../components/common/YardInput";
import YardLink from "../components/common/YardLink";
import { useEffect } from "react";
import UseIsMobile from "../hooks/UseIsMobile";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UseUser } from "../context/UserContext";
import SmallLoader from "../components/common/SmallLoader";

function SignIn() {

  const { register, handleSubmit, setFocus, formState: { errors, isSubmitting }} = useForm();
  const isMobile = UseIsMobile();
  const navigate = useNavigate();
  const {setIsAuthenticated, SignIn, setCurrentUser} = UseUser();

  useEffect(function () {
    setFocus('email');
  }, [setFocus]);

  async function onLogin(data) {
    const responseSignIn = await SignIn(data);
    if (responseSignIn?.session?.user) {
      setIsAuthenticated(true);
      setCurrentUser(responseSignIn.session.user);
      navigate('/');
    }
  }

  function handleTestToast() {
    toast.success('successfully');
  }

  return (
    <div className="signInContainer ">

      <div className="signInHeader mt-7">
        <div className="flex gap-5 justify-center items-center">
          <Link className="" to='/'><img src="./src/assets/yard_house.webp" alt="yard_Logo" className="w-15"/></Link>
          <h1 className="font-semibold text-4xl">Yard</h1>
        </div>

        <div className="text-center mt-5">
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-gray-500 mt-2 mb-5">Sign in to your account to continue</p>
        </div>
      </div>

      <div className="loginProviderButtons grid gap-3 justify-center">
        <YardButton onClick={handleTestToast} className={`p-2 rounded-lg flex justify-center items-center gap-3 hover:bg-green-500 transition-all duration-500 w-80 md:w-100`}>
          <span className="block w-fit"><FcGoogle /></span>
          <span>Sign in with Google</span>
        </YardButton>
        <YardButton className={`p-2 rounded-lg flex justify-center items-center gap-3 hover:bg-green-500 transition-all duration-500 w-80 md:w-100`}>
          <span className="block w-fit"><Facebook color="#228be6" size={17}/></span>
          <span>Sign in with Facebook</span>
        </YardButton>
        <YardButton className={`p-2 rounded-lg flex justify-center items-center gap-3 hover:bg-green-500 transition-all duration-500 w-80 md:w-100`}>
          <span className="block w-fit"><Apple size={17} /></span>
          <span>Sign in with Apple</span>
        </YardButton>
      </div>

      <div className={`orContinueWith text-center ${isMobile ? 'w-80' : 'w-100'} m-[0px_auto]`}>
        <p className="continueWithLine relative text-gray-500 my-5">
          or
          <span className="absolute left-0 w-[45%] bg-gray-200 h-[1px] top-1/2"></span>
          <span className="absolute right-0 w-[45%] bg-gray-200 h-[1px] top-1/2"></span>
        </p>
      </div>

      <div className="signInForm flex justify-center items-center">
        <div>
          <form onSubmit={handleSubmit(onLogin)} className="space-y-2">
            <YardInput 
              label='Email' 
              iconElement={<Mail color="gray" size={17}/>}
              placeholder='Email'
              id='email'
              name='email'
              register={register}
              validation={{required: 'Email is required'}}
              error={errors?.email}
            />
            <YardInput 
              label='Password' 
              iconElement={<Lock color="gray" size={17}/>}
              type='password'
              placeholder='Password'
              id='password'
              name='password'
              page='signin'
              register={register}
              validation={{required: 'Password is required'}}
              error={errors?.password}
            />
            <div className="submit my-7">
              <YardButton disabled={isSubmitting} type="submit" id="submit" value='sign in' className={`bg-green-600 h-10 rounded-lg flex justify-center items-center gap-2 text-white hover:bg-green-500 transition-all duration-500 w-80 md:w-100`}>
                {isSubmitting ? <SmallLoader /> : 
                <>
                  <span className="block w-fit"><LogIn size={15}/></span>
                  <span>Sign In</span>
                </>
                }
              </YardButton>
            </div>
            <div className="my-5 text-center">
              <span className="text-gray-500 pr-2">Don't have an account?</span> 
              <YardLink to='/sign-up' className='text-green-600'>Create an account</YardLink>
            </div>
          </form>
        </div>
      </div>

      <div className={`termsAndPolicies flex justify-center ${isMobile ? 'w-80' : 'w-100'} m-[0px_auto] text-xs text-gray-600`}>
        <p className="text-center mb-2">
          By continuing, you agree to Yard's <YardLink to='/terms' className="text-green-600">Terms of Service</YardLink> and <YardLink to='/privacy' className="text-green-600">Privacy Policy</YardLink>, and to receive periodic emails with updates.
        </p>
      </div>

    </div>
  );
}

export default SignIn;