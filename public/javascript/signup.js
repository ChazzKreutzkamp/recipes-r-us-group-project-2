async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const passwordCheck = document.querySelector('#passwordcheck-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    console.log(username, email, passwordCheck, password)
    
    if (password !== passwordCheck) {
        console.log("password, doesn't match the password in the verify password box");
        return;
    }

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // check the response status
        if (response.ok) {
            document.location.replace('/homepage')
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#signup-form').addEventListener('click', signupFormHandler);