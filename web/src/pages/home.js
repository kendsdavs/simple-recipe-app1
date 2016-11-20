const React = require('react')
const {Link} = require('react-router')

const Home = React.createClass({
  render() {
    return (
      <div>
        <h1>Welcome Home</h1>
          <h3>Menu</h3>
          <ul>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/ingredients">Ingredient List</Link></li>
            <li><Link to="/users">Create Account</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
      </div>
    )
  }
})

module.exports = Home
