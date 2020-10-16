const AuthenticationApi = {
    login: async function (userInfo) {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    },
    register: async function (userInfo) {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });
        const newUser = await response.json()
        console.log(newUser)
        if (response.status !== 200) throw Error(newUser.message);
        return newUser
    }
}

export default AuthenticationApi