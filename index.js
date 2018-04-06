import { h, app } from 'hyperapp'
import debounce from 'debounce-promise'

import Header from './src/app/Header'
import Footer from './src/app/Footer'
import Main from './src/app/Main'

import './public/css/style.css'

const state = {
	username: '',
	userData: {},
}

const actions = {
	updateUsername: username => (state, actions) => {
		getUserData(username).then(actions.setUserData)
		return { username }
	},
	setUserData: userData => state => ({ userData }),
}

const getUserDataFn = username => {
	return fetch(`https://api.github.com/users/${username}`).then(res =>
		res.json(),
	)
}

const getUserData = debounce(getUserDataFn, 700)

const view = (state, actions) => (
	<div className="container">
		<Header />
		<Main actions={actions} state={state} />
		<Footer />
	</div>
)

app(state, actions, view, document.body)
