import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormRow } from '../components'
import { loginUser, registerUser } from '../features/user/userSlice'

const initialState = {
  name: '',
  employeeID: '',
  password: '',
  isMember: true,
}

const Register = () => {
  const [values, setValues] = useState(initialState)

  const { user, isLoading } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, employeeID, password, isMember } = values
    if (!password || !employeeID || (!isMember && !name)) {
      toast.error('Please Fill Out All Fields')
      return
    }

    if (isMember) {
      dispatch(loginUser({ employeeID: employeeID, password: password }))
      return
    }

    dispatch(registerUser({ name, employeeID, password }))
  }

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  return (
    <main className='main'>
      <form className='form' onSubmit={onSubmit}>
        <h2>Travel Application</h2>
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
            placeHolder='Name'
          />
        )}
        <FormRow
          type='text'
          name='employeeID'
          value={values.employeeID}
          handleChange={handleChange}
          placeHolder='Your Employee Number'
        />

        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
          placeHolder='Password'
        />

        <button className='btn btn-full' disabled={isLoading}>
          {isLoading ? 'Loading....' : 'Submit'}
        </button>
        <p>
          {values.isMember ? 'Not a member yet ?' : 'Already a member ?'}
          <button type='button' className='member-btn' onClick={toggleMember}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </main>
  )
}

export default Register
