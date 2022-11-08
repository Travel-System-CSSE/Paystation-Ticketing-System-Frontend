import React, { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import customFetch from '../util/axios'
import { toast } from 'react-toastify'

const Credit = ({ showCredit }) => {
  const { user } = useSelector((store) => store.user)
  const [idNumber, setIdNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [viewBalance, setViewBalance] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (idNumber === '') {
      alert('Please Fill Out the Field')
      return
    }

    // view credit balance get request
    const viewCredit = async () => {
      try {
        const res = await customFetch.get(`/credit/getBal/${idNumber}`)
        setData(res.data)
        setViewBalance(true)
      } catch (error) {
        toast.error(error.response.data.msg)
      }
    }

    viewCredit()
  }

  return (
    <section className='model'>
      {viewBalance ? (
        <form className='form'>
          <FiX className='close-icon' onClick={() => showCredit()} />
          <h2>Available Credit</h2>

          <div className='form-row'>
            <label
              htmlFor='name'
              className='form-label amount'
              style={{ fontSize: '1.17rem' }}
            >
              Name &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;:{' '}
              {data?.user?.name}
            </label>
            <label
              htmlFor='idNumber'
              className='form-label amount'
              style={{ fontSize: '1.17rem' }}
            >
              ID number : {data?.user?.idNumber}
            </label>
          </div>

          <div className='form-row'>
            <label htmlFor='credit' className='form-label amount'>
              credit amount : {`$ ${data?.balance}`}
            </label>
          </div>
        </form>
      ) : (
        <form className='form' onSubmit={onSubmit}>
          <FiX className='close-icon' onClick={() => showCredit()} />
          <h2>Available Credit</h2>
          <div className='form-row'>
            <label htmlFor='idNumber' className='form-label'>
              ID Number
            </label>
            <input
              type='text'
              name='idNumber'
              className='form-input'
              placeholder='ID Number'
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </div>
          <button className='btn btn-full'> View Credit Balance</button>
        </form>
      )}
    </section>
  )
}

export default Credit
