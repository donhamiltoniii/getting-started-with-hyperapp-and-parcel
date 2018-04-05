import { h, app } from 'hyperapp'
import debounce from 'debounce-promise'
import './src/css/style.css'

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
	<div className="container">
		<header>
			<h1>Github Friend Finder</h1>
		</header>
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
