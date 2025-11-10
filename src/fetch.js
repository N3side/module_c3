export async function $fetch(route, {method="GET", body=undefined}={}) {

    const headers = {}

    const url = new URL("http://localhost:8000/api/" + route)

    const token = localStorage.getItem("token")

    if (token) {
        headers.Authorization = "Bearer " + token
    }

    if (method === "GET" && body) {
        url.search = new URLSearchParams(body)
    }

    const response = await fetch(url, {
        method,
        body,
        headers
    })

    let json

    try {
        json = await response.json()
    } catch {
        json = null
    }

    return {response,json}

}