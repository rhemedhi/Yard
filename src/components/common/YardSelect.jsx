import { forwardRef, useEffect, useState } from "react";
import UseIsMobile from "../../hooks/UseIsMobile";

export default forwardRef(function YardSelect(
    {
        iconElementStart,
        iconElementEnd,
        id,
        name,
        placeholder,
        className = '',
        selectClassName='',
        optionList = [{id: 1, name: 'option one', value: 'option1'}, {id: 2, name: 'option two', value: 'option2'}]
    }, 
    ref
) {

    const [selectValue, setSelectValue] = useState(placeholder ? '' : optionList[0].value);
    const isMobile = UseIsMobile();

    useEffect(function () {
        setSelectValue(selectValue);
    }, [selectValue]);

    return (
        <div className={`${name} ${isMobile ? 'w-80' : 'w-100'} w-full h-11 md:w-100 flex items-center gap-2 cursor-pointer border-1 border-gray-200 rounded-lg focus-within:ring-1 focus-within:ring-green-500 focus-within:ring-offset-2 transition-all duration-500 ${className}`}>
            {iconElementStart && <div>{iconElementStart}</div>}
            <select name={`${name}`} id={`${id}`} placeholder={`${placeholder}`} ref={ref} className={`outline-none cursor-pointer w-[-webkit-fill-available] h-[-webkit-fill-available] ${selectClassName}`} value={`${selectValue}`} onChange={(e) => setSelectValue(e.target.value)}>
                {placeholder && <option value="">{placeholder}</option>}
                {optionList.map(function (optLst) {
                    return (
                        <option key={optLst.id} value={optLst.value}>{optLst.name}</option>
                    )
                })}
            </select>
            {iconElementEnd && <div>{iconElementEnd}</div>}
        </div>
    );
});
