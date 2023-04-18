async function getUserEmailByID(userId: string): Promise<string> {
    const response = await fetch(`/api/users?id=${userId}`)
    const userData = await response.json()
    return userData.email
}
  
export { getUserEmailByID }