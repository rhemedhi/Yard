function YardLabel({children, htmlFor, className = ''}) {
    return (
        <label htmlFor={htmlFor} className={`my-1 flex justify-between ${className}`}>
            {children}
        </label>
    );
}

export default YardLabel;