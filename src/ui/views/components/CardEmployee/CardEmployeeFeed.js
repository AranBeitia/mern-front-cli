import CardEmployee from './CardEmployee'
import { useEffect, useState } from 'react'
import clientAxios from '../../../../config/axios'
import { useUsers } from '../../../../context/UsersContext'

function CardEmployeeFeed() {
  const { users, loadUsers, usersHasChanged } = useUsers()

  useEffect(() => {
    fetchUsers()
  }, [])
  useEffect(() => {
    if (usersHasChanged) fetchUsers()
  }, [usersHasChanged])

  const fetchUsers = async () => {
    const loadedUsers = await clientAxios.get('/users')
    loadUsers(loadedUsers.data.data)
  }
  return (
    <div className="grid-wrapper">
      {users.length > 0 &&
        users.map((user) => {
          return (
            <CardEmployee
              key={user._id}
              id={user._id}
              fullName={user.fullName}
              email={user.email}
            />
          )
        })}
    </div>
  )
}

export default CardEmployeeFeed
