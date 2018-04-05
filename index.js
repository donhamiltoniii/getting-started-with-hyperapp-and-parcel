import { h, app } from 'hyperapp'
import debounce from 'debounce-promise'
import './src/css/style.css'
import defaultAvatar from './src/img/default-avatar.jpg'

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
		<header>
			<h1>Github Friend Finder</h1>
		</header>
		<main>
			<h2>Search Github Users:</h2>
			<input
				type="text"
				className="searchInput"
				value={state.username}
				oninput={e => actions.updateUsername(e.target.value)}
			/>
			<article className="userCard">
				<img
					className="userCard__img"
					src={state.userData.avatar_url || defaultAvatar}
				/>
				<h3 className="userCard__name">
					{!(
						Object.keys(state.userData).length === 0 &&
						state.userData.constructor === Object
					) ? (
						<a href={state.userData.html_url}>
							{state.userData.name}
						</a>
					) : (
						`this field is empty`
					)}
				</h3>
				<h4 className="userCard__location">
					{state.userData.location || `this field is empty`}
				</h4>
			</article>
		</main>
		<footer>
			<h6>
				Inspired by:{' '}
				<a href="https://blog.daftcode.pl/hyperapp-parcel-71823bd93f1c">
					This wonderful tutorial
				</a>
			</h6>
		</footer>
	</div>
)

app(state, actions, view, document.body)
