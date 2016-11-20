const React = require('react')
//const xhr = require('xhr')
const { Link, Redirect } = require('react-router')

const Recipe = React.createClass({
  getInitialState() {
    return {
      recipe: {},
      removed: false
    }
  },
  componentDidMount() {
    this.props.get(this.props.params.id, (err, recipe) => {
      if (err) return console.log(err.message)
      this.setState({recipe})
    })
    // xhr.get('http://127.0.0.1:4000/recipes/' + this.props.params.id, {
    //   json: true
    // }, (err, response, recipe) => {
    //   if(err) return console.log(err.message)
    //   this.setState({recipe})
    // })
  },
  handleRemove(e) {
    e.preventDefault()
    if (confirm('Are you sure?') ) {
      this.props.remove(this.props.params.id, this.state.recipe, (err, body) => {
        if (err) return console.log(err.message)
        this.setState({ removed: true })
      })
      // xhr.del('http://127.0.0.1:4000/recipes/' + this.state.recipe.id, {
      //   json: this.state.recipe
      // }, (err, res, body) => {
      //   if (err) return console.log(err.message)
      //   this.setState({ removed: true })
      // })
    }
  },
  render() {
    return (
      <div>
        { this.state.removed ? <Redirect to="/recipes" /> : null}
        <h3>{this.state.recipe.name}</h3>
        <Link to={`/recipes/${this.state.recipe.id}/edit`}>Edit Recipe</Link>
        |
        <a href="#" onClick={this.handleRemove}>Remove Recipe</a>
        |
        <Link to="/recipes">Return</Link>
      </div>
    )
  }
})

module.exports = Recipe
