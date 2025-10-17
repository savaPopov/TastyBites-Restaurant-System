import { useEffect, useState } from "react";

export function useForm(initialValues, submitCallback, reinitializeForm = false) {
  const [values, setValues] = useState(initialValues)

  useEffect(() => {
    if (reinitializeForm) {
      setValues(initialValues)
    }
  }, [initialValues, reinitializeForm])

  const changeHandler = (e) => {
    const { name, type, value, checked } = e.target;
    
    setValues(state => ({
      ...state,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    await submitCallback(values)

  }

  return {
    values,
    changeHandler,
    submitHandler,
  }

}