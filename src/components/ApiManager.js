export const getAllNurseries = (params) => {
    return fetch(`http://localhost:8088/nurseries${params ? params : "/"}`)
        .then(res => res.json())
}

export const getAllDistributors = (params) => {
    return fetch(`http://localhost:8088/distributors${params ? params : "/"}`)
        .then(res => res.json())
}

export const getAllFlowers = (params) => {
    return fetch(`http://localhost:8088/flowers${params ? params : "/"}`)
}

export const getNurseryFlowers = (params) => {
    return fetch(`http://localhost:8088/nurseryFlowers${params ? params : "/"}`)
        .then(res => res.json())
}

export const getNurseryDistributors = (params) => {
    return fetch(`http://localhost:8088/nurseryDistributors${params ? params : "/"}`)
        .then(res => res.json())
}

export const getAllRetailers = (params) => {
    return fetch(`http://localhost:8088/retailers${params ? params : "/"}`)
    .then(res => res.json())
}

export const createNewCustomer = (customerObj) => {
    return fetch(`http://localhost:8088/customers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customerObj)
    })
}