import { useEffect, useState } from "react";

export function useForm(initialValues, submitCallback, reinitializeForm = false) {
  const [values, setValues] = useState(initialValues)

  useEffect(() => {
    if (reinitializeForm) {
      setValues(initialValues)
    }
  }, [initialValues, reinitializeForm])

  const changeHandler = (e) => {
    setValues(state => ({
      ...state,
      [e.target.name]: e.target.value
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