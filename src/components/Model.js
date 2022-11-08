import React, { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import customFetch from '../util/axios'
import { toast } from 'react-toastify'
import swal from 'sweetalert'

const Model = ({ modelShow }) => {
  const { user } = useSelector((store) => store.user)
  const [credit, setCredit] = useState({ idNumber: '', amount: '' })

  const modelClose = () => {
    modelShow()
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setCredit({ ...credit, [name]: value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const newCredit = {
      idNumber: credit.idNumber,
      amount: credit.amount,
    }

    if (newCredit.idNumber === '' || newCredit.amount === '') {
      toast.error('Please Fill Out All Fields')
      return
    }

    newCredit.amount = parseInt(newCredit.amount)

    // add credit post request
    const addCredit = async () => {
      try {
        await customFetch.post('/credit/', newCredit)
        swal(
          'Credit Added!',
          `${newCredit.amount} credit added to account with ID: ${newCredit.idNumber}`,
          'success'
        )
      } catch (error) {
        toast.error(error.response.data.msg)
      }
    }

    swal({
      title: 'Are you sure?',
      text: `You are about to add ${newCredit.amount} credit to account with ID: ${newCredit.idNumber}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willAdd) => {
      if (willAdd) {
        addCredit()
      }
    })

    modelShow()
  }

  return (
    <section className='model'>
      <form className='form' onSubmit={onSubmit}>
        <FiX className='close-icon' onClick={() => modelShow()} />
        <h2>Add Credit</h2>
        <div className='form-row'>
          <label htmlFor='idNumber' className='form-label'>
            ID Number
          </label>
          <input
            type='text'
            name='idNumber'
            className='form-input'
            placeholder='ID Number'
            value={credit.idNumber}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='credit' className='form-label'>
            credit amount
          </label>
          <input
            type='number'
            name='amount'
            className='form-input'
            placeholder='Credit Amount'
            value={credit.amount}
            onChange={handleChange}
          />
        </div>
        <button className='btn btn-full'> Pay</button>
      </form>
    </section>
  )
}

export default Model
