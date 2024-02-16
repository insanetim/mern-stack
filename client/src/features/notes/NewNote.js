import PulseLoader from 'react-spinners/PulseLoader'

import { useGetUsersQuery } from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm'
import useTitle from '../../hooks/useTitle'

const NewNote = () => {
  useTitle('Dan D. Repairs | Add New Note')

  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map(id => data?.entities[id]),
    }),
  })

  if (!users?.length) return <PulseLoader color='#fff' />

  const content = <NewNoteForm users={users} />

  return content
}
export default NewNote
