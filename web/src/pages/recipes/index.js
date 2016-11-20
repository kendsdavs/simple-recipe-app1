const React = require('react')
const {Link} = require('react-router')
//const xhr = require('xhr')


const Recipes = React.createClass({
  getInitialState: function() {
    return {
      recipes: []
    }
  },
  componentDidMount() {
    this.props.allDocs((err, recipes) => {
      if (err) return console.log(err.message)
      this.setState({recipes})
    })
    // xhr.get('http://127.0.0.1:4000/recipes', {
    //   json: true
    // }, (err, response, recipes) => {
    //   if (err) return console.log(err.message)
    //   this.setState({recipes})
    // })
  },
  render() {
    const listRecipe = recipe =>
      <li key={recipe.id}>
        <Link to={`/recipes/${recipe.id}/show`}>{recipe.name}</Link>
      </li>
    return (
      <div>
        <h1>Recipes</h1>
        <Link to="/recipes/new">Add Recipe</Link>
        <ul>
          {this.state.recipes.map(listRecipe)}
        </ul>
        <Link to="/">Home</Link>
      </div>
    )
  }
})

module.exports = Recipes
