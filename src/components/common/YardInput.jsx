import { forwardRef, useEffect, useState } from 'react';
import YardLabel from './YardLabel';
import YardLink from './YardLink';
import { CircleAlert } from 'lucide-react';
import UseIsMobile from '../../hooks/UseIsMobile';

export default forwardRef(function YardInput(
  {
    iconElement,
    placeholder,
    type = 'text',
    id,
    name,
    register,
    validation = { required: `${name} is required` },
    error,
    disabled = false,
    readOnly = false,
    className = '',
    inputWrapperClassName = '',
    inputClassName = '',
    label,
    defaultValue,
    page,
    onFocus,
    ...rest
  },
  ref
) {

  const isMobile = UseIsMobile();
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(function () {
    setInputValue(defaultValue);
  }, [defaultValue])

  return (
    <div className={`${name} grid ${isMobile ? 'w-80' : 'w-100'} w-full md:w-100 m-[0px_auto] ${className}`}>

        {label?.toLowerCase() === 'password' ? (
            <YardLabel htmlFor={`${id}`}>
                <span>Password</span>
                {page === 'signin' && <YardLink to='/forgot-password' className="text-green-600">Forgot Password?</YardLink>}
            </YardLabel>
        ) : label?.toLowerCase() !== '' ? (
            <YardLabel htmlFor={`${id}`}>
                <span>{label}</span>
            </YardLabel>
        ) : ''}

        <div tabIndex={0} className={`flex items-center gap-2 border-1 border-gray-200 rounded-lg focus-within:ring-1 focus-within:ring-green-500 focus-within:ring-offset-2 transition-all duration-500 ${inputWrapperClassName} ${error ? 'border-red-500' : ''}`}>
        {/* <div tabIndex={0} className={`flex items-center gap-2 ${isMobile ? 'w-80' : 'w-100'} border-1 border-gray-200 rounded-lg focus-within:ring-1 focus-within:ring-green-500 focus-within:ring-offset-2 transition-all duration-500 ${inputWrapperClassName} ${error ? 'border-red-500' : ''}`}> */}
          {iconElement && <span className='mx-2'>{iconElement}</span>}
          <input
            ref={ref}
            className={`p-2 outline-none w-full ${inputClassName} ${error ? 'text-red-500' : ''} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
            placeholder={placeholder}
            type={type}
            id={id}
            name={name}
            onFocus={onFocus}
            disabled={disabled}
            readOnly={readOnly}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            {...(register ? register(name, validation) : {})}
            {...rest}
          />
        </div>
        {error && (
            <span role='alert' className='text-red-500 flex gap-2 mt-1 items-center'>{<CircleAlert size={15}/> }{error?.message}</span>
        )}

    </div>
  );
});
