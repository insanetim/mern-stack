import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Link } from 'react-router-dom'
import PulseLoader from 'react-spinners/PulseLoader'

import { useRefreshMutation } from './authApiSlice'
import { selectCurrentToken } from './authSlice'
import usePersist from '../../hooks/usePersist'

const PersistLogin = () => {
  const [persist] = usePersist()
  const token = useSelector(selectCurrentToken)

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation()

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh().unwrap()
      } catch (err) {
        console.error(err)
      }
    }

    if (!token && persist) verifyRefreshToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let content
  if (!persist) {
    // persist: no
    content = <Outlet />
  } else if (isLoading) {
    //persist: yes, token: no
    content = <PulseLoader color='#fff' />
  } else if (isError) {
    //persist: yes, token: no
    content = (
      <p className='errmsg'>
        {`${error?.data?.message} - `}
        <Link to='/login'>Please login again</Link>.
      </p>
    )
  } else if (isSuccess) {
    //persist: yes, token: yes
    content = <Outlet />
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    content = <Outlet />
  }

  return content
}

export default PersistLogin
