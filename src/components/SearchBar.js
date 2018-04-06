import { h } from 'hyperapp'

const SearchBar = (state, actions) => (
	<div className="searchBar">
		<h2>Search Github Users:</h2>
		<input
			type="text"
			className="searchInput"
			value={state.username}
			oninput={e => actions.updateUsername(e.target.value)}
		/>
	</div>
)

export default SearchBar
