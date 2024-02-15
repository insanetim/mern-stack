import { useNavigate, Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [sendLogout, { isLoading, isError, error }] = useSendLogoutMutation()
  const { isManager, isAdmin } = useAuth()

  const handleLogout = async () => {
    await sendLogout().unwrap()
    navigate('/')
  }

  const onNewNoteClicked = () => navigate('/dash/notes/new')
  const onNewUserClicked = () => navigate('/dash/users/new')
  const onNotesClicked = () => navigate('/dash/notes')
  const onUsersClicked = () => navigate('/dash/users')

  let newNoteButton = null
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button
        className='icon-button'
        title='New Note'
        onClick={onNewNoteClicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    )
  }

  let newUserButton = null
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className='icon-button'
        title='New User'
        onClick={onNewUserClicked}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    )
  }

  let usersButton = null
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
      usersButton = (
        <button
          className='icon-button'
          title='Users'
          onClick={onUsersClicked}
        >
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      )
    }
  }

  let notesButton = null
  if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
    notesButton = (
      <button
        className='icon-button'
        title='Notes'
        onClick={onNotesClicked}
      >
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    )
  }

  const logoutButton = (
    <button
      className='icon-button'
      title='Logout'
      onClick={handleLogout}
    >
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  )

  let buttonContent
  if (isLoading) {
    buttonContent = <p>Logging Out...</p>
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {newUserButton}
        {notesButton}
        {usersButton}
        {logoutButton}
      </>
    )
  }

  const content = (
    <>
      <p className={classNames(isError ? 'errmsg' : 'offscreen')}>
        {error?.data?.message}
      </p>

      <header className='dash-header'>
        <div
          className={classNames('dash-header__container', {
            'dash-header__container--small':
              !DASH_REGEX.test(pathname) &&
              !NOTES_REGEX.test(pathname) &&
              !USERS_REGEX.test(pathname),
          })}
        >
          <Link to='/dash'>
            <h1 className='dash-header__title'>techNotes</h1>
          </Link>
          <nav className='dash-header__nav'>{buttonContent}</nav>
        </div>
      </header>
    </>
  )

  return content
}

export default DashHeader
