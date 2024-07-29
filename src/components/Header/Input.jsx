import React,{useId}from 'react'

// when we make a login form we need to use this input box in another component state so we are using forwardRef
// we can also wrap forwardRef while exporting i.e export default React.forwardRef(Input) see select component
const Input = React.forwardRef( function Input({label,type="text",className="",...props}, ref){ 

    const id = useId(); // generates unique id
    return(
        <div className='w-full'>
            {label && <label htmlFor={id} className='inline-block mb-1 pl-1'> {label} </label>}
            <input type={type} className={`${className} px-3 py-2 
            rounded-lg bg-white text-black outline-none focus:bg-gray-200 w-full`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})
export default Input