function signup() {

    let firstname = document.getElementById('firstname').Value;
    let lastname = document.getElementById('lastname').Value;
    let email = document.getElementById('email').Value;
    let password = document.getElementById('password').Value;
    let repeatpassword = document.getElementById('repeatpassword').Value;


    if (password !== repeatpassword) {
        document.querySelector("#message").innerHTML = 'Password Do Not Match, please try again';
        return;
    }

    axios.post('http//localhost:3000/signup', {

        firstname,
        lastname,
        email,
        password,

    })

        .then(function (response) {
            console.log(response.data);
            document.querySelector("#message").innerHTML = response.data.message;
        })
        .catch(function (error) {
            console.log(error.response.data);
            document.querySelector("#message").innerHTML = error.response.data.message;
        });


}


///////////login code/////////////

function login() {

    let email = document.getElementById('email').Value;
    let password = document.getElementById('password').Value;

    axios.post('http//localhost:3000/login', {

        email,
        password,
    })

        .then(function (response) {
            console.log(response.data);
            document.querySelector("#loginmessage").innerHTML = response.data.message;
        })
        .catch(function (error) {
            console.log(error.response.data);
            document.querySelector("#loginmessage").innerHTML = error.response.data.message;
        });
}


/////////get all user code////////

function getalluser() {

    axios.post('http//localhost:3000/users',)

        .then(function (response) {
            console.log(response.data);

            document.querySelector("#allUser").innerHTML = ""

            response.data.map((eachUser) => {
                document.querySelector("#allUser").innerHTML +=
                    `${eachUser.firstName} ${eachUser.lastName} - ${eachUser.email} <br>`
            })

        })
        .catch(function (error) {
            console.log(error.response.data);
            document.querySelector("#message").innerHTML = error.response.data.message;
        })


}