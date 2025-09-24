import { forwardRef, useEffect, useState } from 'react';
import YardLabel from './YardLabel';
import YardLink from './YardLink';
import { CircleAlert } from 'lucide-react';
import UseIsMobile from '../../hooks/UseIsMobile';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

export default forwardRef(function YardInput(
  {
    iconElement,
    placeholder,
    type = 'text',
    id,
    name,
    register,
    validation,
    error,
    disabled = false,
    readOnly = false,
    className = '',
    inputWrapperClassName = '',
    inputClassName = '',
    label,
    defaultValue,
    page,
    multiple,
    onFocus,
    onChange,
    accept,
    onValueChange,
    ...rest
  },
  ref
) {

  const isMobile = UseIsMobile();
  // const [inputValue, setInputValue] = useState(defaultValue);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  function handleColor(time) {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  useEffect(function () {
    setInputValue(defaultValue);
  }, [defaultValue])

  const [inputValue, setInputValue] = useState(defaultValue);

  return (
    <div id={id} className={`${name} grid ${isMobile ? 'w-80' : 'w-100'} max-w-full m-[0px_auto] ${className}`}>

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

        <div tabIndex={0} className={`dark:border-1 dark:border-[#202020] dark:text-white flex items-center gap-2 border-1 border-gray-200 rounded-lg focus-within:ring-1 focus-within:ring-green-500 focus-within:ring-offset-2 transition-all duration-500 ${inputWrapperClassName} ${error ? 'border-red-500' : ''}`}>
        {/* <div tabIndex={0} className={`flex items-center gap-2 ${isMobile ? 'w-80' : 'w-100'} border-1 border-gray-200 rounded-lg focus-within:ring-1 focus-within:ring-green-500 focus-within:ring-offset-2 transition-all duration-500 ${inputWrapperClassName} ${error ? 'border-red-500' : ''}`}> */}
          {iconElement && <span className='mx-2'>{iconElement}</span>}
          {type === 'date' ? 
          <DatePicker 
            selected={selectedDateTime}
            onChange={(date) => {
              setSelectedDateTime(date);
              onValueChange?.(date);
            }}
            isClearable
            showTimeSelect
            placeholderText={placeholder}
            timeClassName={handleColor}
            ref={ref}
          /> : 
          type === 'dateRange' ?
          <DatePicker 
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
              onValueChange?.(update);
            }}
            isClearable
            withPortal
            placeholderText={placeholder}
            className='border-none w-65 outline-none h-[40px]'
            ref={ref}
          />
          : 
          type === 'textArea' ?
          <textarea 
            className={`w-full outline-none ${inputClassName}`}
            placeholder={placeholder}
            id={id}
            name={name}
            onFocus={onFocus}
            disabled={disabled}
            readOnly={readOnly}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              onValueChange?.(e.target.value);
            }}
            {...(register ? register(name, validation) : {})}
            {...rest}
          ></textarea>
          :
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
            multiple={multiple}
            accept={accept}

            onChange={type === 'file' ? 
              (onChange) 
              : 
              ((e) => {
                setInputValue(e.target.value);
                onValueChange?.(e.target.value);
              })
            }
            
            {...(register ? register(name, validation) : {})}
            {...rest}
          />
          }
        </div>
        {error && (
            <span role='alert' className='text-red-500 flex gap-2 mt-1 items-center'>{<CircleAlert size={15}/> }{error?.message}</span>
        )}
    </div>
  );
});
