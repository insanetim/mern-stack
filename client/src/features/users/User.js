import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

import { selectUserById } from './usersApiSlice'

const User = ({ userId }) => {
  const user = useSelector(state => selectUserById(state, userId))
  const navigate = useNavigate()

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`)

    const userRolesString = user.roles.toString().replaceAll(',', ', ')

    const cellClassNames = classNames('table__cell', {
      'table__cell--inactive': !user.active,
    })

    return (
      <tr className='table__row user'>
        <td className={cellClassNames}>{user.username}</td>
        <td className={cellClassNames}>{userRolesString}</td>
        <td className={cellClassNames}>
          <button
            className='icon-button table__button'
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    )
  } else return null
}

export default User
