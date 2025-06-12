import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import YardButton from "../components/common/YardButton";
import { Circle, CircleCheck, CircleSmall, Lock, Mail, Shield, User, UserPlus } from "lucide-react";
import YardInput from "../components/common/YardInput";
import YardLink from "../components/common/YardLink";
import { useEffect, useState } from "react";
import UseIsMobile from "../hooks/UseIsMobile";
import { UseUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import SmallLoader from "../components/common/SmallLoader";

function SignUp() {

  const [passwordHelper, setPasswordHelper] = useState(null);
  const { register, handleSubmit, watch, setValue, setFocus, formState: { errors, isSubmitting }} = useForm();
  const passwordValue = watch('password', '');
  const isAgent = watch('isAgent');
  const isAgreed = watch('isAgreed');
  const isMobile = UseIsMobile();
  const {SignUp} = UseUser();
  const navigate = useNavigate();

  let checkUpperCase = /[A-Z]/,
    checkLowerCase = /[a-z]/,
    checkNumber = /[0-9]/,
    checkSpecialCharacter = /[!@#$%^&*()=,.?":;/_{}|\\+<>~`-]/;

  useEffect(function () {
    setFocus('fullname')
  }, [setFocus]);

  async function onSignUp(data) {
    let usertype, username, freshData = data;
    usertype = isAgent ? 'Agent' : 'Client';

    username = freshData.fullname.split(' ')[0].at(0) + freshData.fullname.split(' ')[1] + Math.floor(10000 + Math.random() * 99999);

    let newData = {...freshData, usertype, username};
    const responseSignUp = await SignUp(JSON.stringify(newData));

    if (responseSignUp) {
      navigate('/sign-in');
    }
  }

  function handlePasswordOnFocus() {
    setPasswordHelper(true);
  }

  function handleIsAgent() {
    setValue('isAgent', !isAgent);
  }

  function handleIsAgreed() {
    setValue('isAgreed', !isAgreed);
  }

  return (
    <div className="signUpContainer ">
      <div className="signUpHeader mt-7">
        <div className="flex gap-5 justify-center items-center">
          <Link className="" to='/'><img src="./src/assets/yard_house.webp" alt="yard_Logo" className="w-15"/></Link>
          <h1 className="font-semibold text-4xl">Yard</h1>
        </div>
  
        <div className="text-center mt-5">
          <h2 className="text-2xl font-bold">Create an account</h2>
          <p className="text-gray-500 mt-2 mb-5">Sign up to start finding properties</p>
        </div>
      </div>

      <div className="signUpForm flex justify-center items-center">
        <div>
          <form onSubmit={handleSubmit(onSignUp)} className={`space-y-2`}>
            <YardInput
              label='Full Name' 
              iconElement={<User color="gray" size={17}/>}
              placeholder='Full Name'
              id='fullname'
              name='fullname'
              register={register}
              validation={{
                required: 'Full Name is required', 
                minLength: { 
                  value: 5,
                  message: 'Full Name must be at least 5 characters long'
                }
              }}
              error={errors?.fullname}
            />
            <YardInput 
              label='Email' 
              iconElement={<Mail color="gray" size={17}/>}
              placeholder='Email'
              id='email'
              name='email'
              register={register}
              validation={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, //michael@gmail.com
                  message: 'Invalid Email Address'
                }
              }}
              error={errors?.email}
            />
            <YardInput 
              label='Password' 
              iconElement={<Lock color="gray" size={17}/>}
              type='password'
              placeholder='Password'
              id='password'
              name='password'
              page='signup'
              register={register}
              validation={{
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()=,.?":;/_{}|\\+<>~`-])[A-Za-z\d!@#$%^&*()=,.?":;/_{}|\\+<>~`-]{8,}$/,
                  message: 'Invalid Password'
                }
              }}
              error={errors?.password}
              onFocus={handlePasswordOnFocus}
            />
            {passwordHelper && (<div className={`passwordHelper text-gray-500 text-sm mt-5 ${isMobile ? 'w-80' : 'w-100'} m-[0px_auto]`}>
              <div className="flex gap-2">
                {checkUpperCase.test(passwordValue) ? <CircleCheck color="green" size={20} /> : <CircleSmall color="gray" size={20}/>}
                <span>UpperCase letter</span>
              </div>
              <div className="flex gap-2">
                {checkLowerCase.test(passwordValue) ? <CircleCheck color="green" size={20} /> : <CircleSmall color="gray" size={20}/>}
                <span>Lowercase letter</span>
              </div>
              <div className="flex gap-2">
                {checkNumber.test(passwordValue) ? <CircleCheck color="green" size={20} /> : <CircleSmall color="gray" size={20}/>}
                <span>Number</span>
              </div>
              <div className="flex gap-2">
                {checkSpecialCharacter.test(passwordValue) ? <CircleCheck color="green" size={20} /> : <CircleSmall color="gray" size={20}/>}
                <span>Special character (e.g. !?%^&$#)</span>
              </div>
              <div className="flex gap-2">
                {passwordValue?.length >= 8 ? <CircleCheck color="green" size={20} /> : <CircleSmall color="gray" size={20}/>}
                <span>8 characters or more</span>
              </div>
            </div>)}

            <div className={`isAgent bg-gray-50 h-auto rounded-lg text-gray-500 p-3 my-4 ${isMobile ? 'w-80' : 'w-100'} m-[0px_auto]`}>
              <div className="flex gap-4 items-center justify-around">
                <div role="checkbox" aria-checked={isAgent} aria-label="Custom checkbox" tabIndex="0" onClick={handleIsAgent} className="cursor-pointer">
                  {isAgent ? <CircleCheck color="green" size={17}/> : <Circle size={17}/>}
                  <input type="checkbox" id="isAgent" name='isAgent' className="hidden" {...register('isAgent')}/>
                </div>
                <div>
                  <p className="flex"><span><Shield color="green"/></span><span>Register as a property agent</span></p>
                  <p>Property agents can list properties for sale or rent</p>
                </div>
              </div>
            </div>

            <div className={`flex gap-2 items-center justify-around ${isMobile ? 'w-80' : 'w-100'} m-[0px_auto]`}>
              <div role="checkbox" aria-checked={isAgreed} aria-label="Custom checkbox" tabIndex="0" onClick={handleIsAgreed} className="cursor-pointer">
                {isAgreed ? <CircleCheck color="green" size={17} /> : <Circle size={17} color={`${errors?.isAgreed ? 'red' : 'gray'}`} />}
                <input type="checkbox" id="isAgreed" name='isAgreed' className="hidden" {...register('isAgreed', {required: 'This is a required field'})}/>
              </div>
              <div>
                <p>I agree to the <YardLink to='/terms' className={`${errors?.isAgreed ? 'text-red-600' : 'text-green-600'} ${isAgreed && 'text-green-600'}`}>Terms of Service</YardLink> and <YardLink to='/privacy' className={`text-green-600 ${errors?.isAgreed && 'text-red-600'}`}>Privacy Policy</YardLink></p>
              </div>
            </div>

            <div className={`submit my-7 m-[0px_auto]`}>
              <YardButton disabled={isSubmitting} type="submit" id="submit" value='sign up' className={`${isSubmitting && 'cursor-not-allowed'} bg-green-600 h-10 rounded-lg flex justify-center items-center gap-2 text-white hover:bg-green-500 transition-all duration-500 m-[0px_auto] w-80 md:w-100`}>
                {isSubmitting ? <SmallLoader /> : 
                  <>
                    <span className="block w-fit"><UserPlus size={15}/></span>
                    <span>Sign Up</span>
                  </> 
                }
              </YardButton>
            </div>

            <div className="my-5 text-center">
              <span className="text-gray-500 pr-2">Already have an account?</span> 
              <YardLink to='/sign-in' className='text-green-600'>Sign In</YardLink>
            </div>
          </form>
        </div>
      </div>
  
    </div>
  );
}

export default SignUp;