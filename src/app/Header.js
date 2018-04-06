import { h } from 'hyperapp'

import SearchBar from '../components/SearchBar'

const Header = (state, actions) => (
	<header>
		<h1>Github Friend Finder</h1>
		<SearchBar state={state} actions={actions} />
	</header>
)

export default Header
