import { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import classNames from 'classnames'

import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userRef = useRef(null)
  const errRef = useRef(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [username, password])

  const handleUserInput = e => setUsername(e.target.value)
  const handlePwdInput = e => setPassword(e.target.value)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      navigate('/dash')
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Server Response')
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg(err.data?.message)
      }
    }
  }

  if (isLoading) return <p>Loading...</p>

  const content = (
    <section className='public'>
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className='login'>
        <p
          ref={errRef}
          className={classNames(errMsg ? 'errmsg' : 'offscreen')}
          aria-live='assertive'
        >
          {errMsg}
        </p>

        <form
          className='form'
          onSubmit={handleSubmit}
        >
          <label htmlFor='username'>Username:</label>
          <input
            className='form__input'
            type='text'
            id='username'
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete='off'
            required
          />

          <label htmlFor='password'>Password:</label>
          <input
            className='form__input'
            type='password'
            id='password'
            onChange={handlePwdInput}
            value={password}
            required
          />
          <button className='form__submit-button'>Sign In</button>
        </form>
      </main>
      <footer>
        <Link to='/'>Back to Home</Link>
      </footer>
    </section>
  )

  return content
}

export default Login
