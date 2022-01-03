import CardEmployee from './CardEmployee'
import { useEffect, useState } from 'react'
import clientAxios from '../../../../config/axios'
import { useUsers } from '../../../../context/UsersContext'
import Spinner from '../Spinner'

function CardEmployeeFeed() {
  const { users, loadUsers, usersHasChanged, loadingUsers, isLoading } =
    useUsers()

  useEffect(() => {
    fetchUsers()
  }, [])
  useEffect(() => {
    if (usersHasChanged) fetchUsers()
  }, [usersHasChanged])

  const fetchUsers = async () => {
    loadingUsers()
    const loadedUsers = await clientAxios.get('/users')
    loadUsers(loadedUsers.data.data)
  }

  return (
    <div className="grid-wrapper">
      {isLoading && <Spinner />}
      {users ? (
        users.map((user) => {
          return (
            <CardEmployee
              key={user._id}
              id={user._id}
              fullName={user.fullName}
              email={user.email}
            />
          )
        })
      ) : (
        <p>No Users</p>
      )}
    </div>
  )
}

export default CardEmployeeFeed
