async function getNavigation() {
    const response = await fetch(`/api/navigation`, { method: "GET" })
    const data = await response.json()

    return data
}

export { getNavigation }