import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import { stringToHash, varifyHash, } from "bcrypt-inzi"

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;


const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type: String, required: true },
    password: { type: String, required: true },

    createdOn: { type: Date, default: Date.now },

});

const userModel = mongoose.model('user', userSchema);


app.post("/signup", (req, res) => {

    let body = req.body;

    if (!body.firstname || !body.lastname || !body.email || !body.password) {
        res.status(400).send(
            `required fields missing, request example:
            {
                "firstname": "irfan",
                "lastname": "sheikh",
                "email": "abc@abc.com",
                "password", '1234"
            }`

        );
        return;
    }

    userModel.findOne({ email: body.email }, (err, data) => {
        if (!err) {
            console.log("data: ", data);

            if (data) {
                console.log("user is already exist:", data);
                res.status(400).send({ message: "user is already exist " });
                return;
            } else {
                stringToHash(body.password).then(hashString => {
                    let newUser = new userModel({
                        firstname: body.firstname,
                        lastname: body.lastname,
                        email: body.email.toLowerCase(),
                        password: hashString
                    });
                    newUser.save((err, result) => {
                        if (!err) {
                            console.log("data saved:", result);
                            res.status(201).send({ message: "user is created " });
                        } else {
                            console.log("db err:", err);
                            res.status(500).send({ message: "internal server error " });
                        }
                    })
                })
            }
        } else {
            console.log("db err:", err);
            res.status(500).send({ message: "db error in query " });
        }
    })
});

app.get("/users", async (req, res) => {

    try {
        let allUser = await userModel.find({}).exec();
        res.send(allUser);
    } catch (error) {
        res.status(500).send({ message: "error getting users" });
    }
})

app.post("/login", (req, res) => {

    let body = req.body;

    if (!body.email || body.password) {
        res.status(400).send(
            `required fields missing, request example: 
            {
                "email": "abc@abc.com",
                "password": "12345"
            }`
        );
        return;
    }

    let isfound = false;

    for (let i = 0; i < userBase.length; i++) {
        if (userBase[i].email === body.email) {
            isfound = true;
            if (userBase[i].password === body.password) {
                res.status(200).send({
                    firstName: userBase[i].firstName,
                    lastName: userBase[i].lastName,
                    email: userBase[i].email,
                    message: "Login Successful",
                })
                return;
            } else {
                res.status(401).send({
                    message: "incorraect Password"
                })
                return;
            }
        }
    }

    if (!isfound) {
        res.status(404).send({
            message: "user not found"
        })
        return;
    }
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



let dbURI = 'mongodb+srv://abc:abc@cluster0.jqfzaar.mongodb.net/socialMediaBase?retryWrites=true&w=majority';
mongoose.connect(dbURI);







