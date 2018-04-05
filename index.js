import { h, app } from 'hyperapp'
import debounce from 'debounce-promise'
import './src/css/style.sass'

const state = {
	username: '',
	userData: null,
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
	<main>
		<div>Search github users:</div>
		<input
			type="text"
			className="searchInput"
			value={state.username}
			oninput={e => actions.updateUsername(e.target.value)}
		/>
		<br />
		<div className="userCard">
			{state.userData ? (
				<div>
					<img
						className="userCard__img"
						src={state.userData.avatar_url}
					/>
					<div className="userCard__name">
						{state.userData.name || `this field is empty`}
					</div>
					<div className="userCard__location">
						{state.userData.location || `this field is empty`}
					</div>
				</div>
			) : (
				<div>Search away</div>
			)}
		</div>
	</main>
)

app(state, actions, view, document.body)
