
function YardButton({children, size, bgColor, txtColor, pd, br, onClick, disabled, className=''}) {

  return (
    <button onClick={onClick} disabled={disabled} className={`dark:border-1 dark:border-[#202020] bg-${bgColor}-500 text-${txtColor}-200 rounded-${br} p-${pd} ${size === 'lg' ? 'w-100' : size === 'md' ? 'w-50' : size === 'sm' ? 'w-25' : ''} ${disabled && 'opacity-50 cursor-not-allowed'} cursor-pointer border-1 border-gray-200 ${className}`}>
      {children}
    </button>
  );
}

export default YardButton;
