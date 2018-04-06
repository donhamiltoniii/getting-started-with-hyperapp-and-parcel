import { h } from 'hyperapp'

import defaultAvatar from '../../public/img/default-avatar.jpg'

const Main = () => (state, actions) => (
	<main>
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
						{state.userData.name || `this field is empty`}
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
)

export default Main
