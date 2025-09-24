import { forwardRef } from "react";
import UseIsMobile from "../../hooks/UseIsMobile";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default forwardRef(function YardSelect(
    {
        iconElement,
        id,
        name,
        defaultValue,
        placeholder,
        disabled,
        value,
        onChange,
        className = '',
        optionList = [{value: 'option one', label: 'option one'}, {value: 'option two', label: 'option two'}]
    }, 
    ref
) {

    // const [selectValue, setSelectValue] = useState(defaultValue || null);
    const isMobile = UseIsMobile();
    const animatedComponents = makeAnimated();

    // useEffect(function () {
    //     setSelectValue(defaultValue || null);
    // }, [defaultValue]);
    const customStyles = {
        container: (styles) => (
            {...styles,
                width: '100%',
            }
        ),
        control: (styles) => (
            {...styles, 
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                boxShadow: 'none',
            }
        ), 
        option: (styles, {isFocused}) => (
            {...styles,
                textAlign: 'left',
                backgroundColor: isFocused ? '#00C951' : '',
                color: isFocused ? 'white' : 'black',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
            }
        ),
        placeholder: (styles) => (
            {...styles,
                textAlign: 'left',
            }
        ),
        singleValue: (styles) => (
            {...styles,
                textAlign: 'left',
                color: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'white' : '#252525'
            }
        ),
        // menu: (styles) => (
        //     {...styles,
        //         backgroundColor: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#191919' : 'white',
        //         color: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'white' : '#191919'
        //     }
        // ),
    };

    return (
        <div id={id} className={`${name} ${isMobile ? 'w-80' : 'w-100'} dark:border-1 dark:border-[#202020] w-full h-11 md:w-100 flex items-center gap-2 cursor-pointer border-1 border-gray-200 rounded-lg focus-within:ring-1 focus-within:ring-green-500 focus-within:ring-offset-2 transition-all duration-500 ${className}`}>
            {iconElement && <div className='mx-1'>{iconElement}</div>}
            <Select 
                components={animatedComponents}
                styles={customStyles}
                isClearable={true}
                isDisabled={disabled}
                options={optionList}
                placeholder={placeholder}
                defaultValue={defaultValue}
                id={id}
                name={name}
                ref={ref}
                value={value || null}
                onChange={(option) => onChange?.(option || null)}
                // onChange={(option) => {
                //     setSelectValue(option || '');
                //     if (ref && typeof ref === 'function') ref(option);
                // }}
            />
        </div>
    );
});
