const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const port = 5000
const mongo_uri = 'mongodb://localhost:27017/dhwani'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
	session({
		secret: 'SecretKey',
		resave: false,
		saveUninitialized: false,
	})
)

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('public'))

mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true)

//user login & register
const userSchema = new mongoose.Schema({
	email: String,
	password: String,
})

userSchema.plugin(passportLocalMongoose)

const User = new mongoose.model('User', userSchema)

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//test api
app.get('/', (req, res) => {
	res.send('Api is Working')
})

app.post('/register', (req, res) => {
	User.register({ username: req.body.username }, req.body.password, (err, user) => {
		if (err) {
			console.log(err)
			res.send('error: ' + err)
		} else {
			passport.authenticate('local')(req, res, () => {
				res.send('success')
			})
		}
	})
})

app.post('/login', (req, res) => {
	const user = new User({
		username: req.body.username,
		password: req.body.password,
	})

	req.login(user, (err) => {
		if (err) {
			console.log(err)
		} else {
			passport.authenticate('local')(req, res, () => {
				res.send('success')
			})
		}
	})
})
// logout
app.post('/logout', (req, res) => {
	req.logout()
	res.send('logout success')
})

//add and get state Data
const stateSchema = new mongoose.Schema({
	state: String,
})

const State = new mongoose.model('State', stateSchema)

app.route('/state')
	.get((req, res) => {
		if (req.isAuthenticated) {
			State.find((err, foundState) => {
				if (!err) {
					res.send(foundState)
				} else {
					console.log(err)
					res.send('error' + err)
				}
			})
		} else {
			res.send('please login or register')
		}
	})
	.post((req, res) => {
		if (req.isAuthenticated) {
			const newState = new Product({
				state: req.body.state,
			})
			newState.save((err) => {
				if (!err) {
					res.send('success')
					console.log(newState)
				} else {
					console.log(err)
				}
			})
		} else {
			res.send('please login or register')
		}
	})

// add & get district Data
const districtSchema = new mongoose.Schema({
	state: String,
	district: String,
})

const District = new mongoose.model('District', districtSchema)

app.route('/district')
	.get((req, res) => {
		if (req.isAuthenticated) {
			District.find((err, foundDistrict) => {
				if (!err) {
					res.send(foundDistrict)
				} else {
					console.log(err)
					res.send('error' + err)
				}
			})
		} else {
			res.send('please login or register')
		}
	})
	.post((req, res) => {
		if (req.isAuthenticated) {
			const newDistrict = new Product({
				state: req.body.state,
				district: req.body.district,
			})
			newDistrict.save((err) => {
				if (!err) {
					res.send('success')
					console.log(newDistrict)
				} else {
					console.log(err)
				}
			})
		} else {
			res.send('please login or register')
		}
	})

//add & get Child Data
const childSchema = new mongoose.Schema({
	name: String,
	sex: String,
	dob: String,
	fatherName: String,
	motherName: String,
	state: String,
	district: String,
})

const Child = new mongoose.model('Child', childSchema)
app.route('/child')
	.get((req, res) => {
		if (req.isAuthenticated) {
			Child.find((err, foundChildData) => {
				if (!err) {
					res.send(foundChildData)
				} else {
					console.log(err)
					res.send('error' + err)
				}
			})
		} else {
			res.send('please login or register')
		}
	})
	.post((req, res) => {
		if (req.isAuthenticated) {
			const newChild = new Product({
				name: req.body.name,
				sex: req.body.sex,
				dob: req.body.dob,
				fatherName: req.body.fatherName,
				motherName: req.body.motherName,
				state: req.body.state,
				district: req.body.district,
			})
			newChild.save((err) => {
				if (!err) {
					res.send('success')
					console.log(newChild)
				} else {
					console.log(err)
				}
			})
		} else {
			res.send('please login or register')
		}
	})

//get Child by Id
app.get(`/child/:childId`, (req, res) => {
	Child.findOne({ _id: req.params.childId }, (err, foundChild) => {
		if (!err) {
			res.send(foundChild)
		} else {
			console.log(err)
		}
	})
})

app.listen(port, () => console.log(`Server started at http://localhost:${port}`))
