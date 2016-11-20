const React = require('react')
const { Link, Redirect } = require('react-router')
const labelStyle = { display: 'block' }
const xhr = require('xhr')

const RecipeForm = React.createClass({
  getInitialState() {
    return {
      name: '',
      ingredients: '',
      link: '',
      success: false
    }
  },
  handleChange(field) {
    return e => {
    const newState = {}
    newState[field] = e.target.value
    this.setState(newState)
    }
  },
  componentDidMount() {
    if (this.props.params.id) {
      xhr.get('http://127.0.0.1:4000/recipes/' + this.props.params.id, {
        json: true
      }, (err, response, recipe) => {
        if (err) return console.log(err.message)
        this.setState(recipe)
      })
    }
  },
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.id) {
      xhr.put('http://127.0.0.1:4000/recipes/' + this.state.id, {
        json: this.state
      }, (err, response, body) => {
        if(err) return console.log(err.message)
        this.setState({success: true})
      })
    } else {
      xhr.post('http://127.0.0.1:4000/recipes', {
        json: this.state
      }, (err, response, body) => {
        if (err) return console.log(err.message)
        this.setState({success: true})
      })
    }
  },
  render() {
    const formState = this.state.id ? 'Edit' : 'New'
    return (
      <div>
        { this.state.success && this.state.id ?
          <Redirect to={`/recipes/${this.state.id}/show`} /> : null }
        { this.state.success && !this.state.id ?
          <Redirect to={`/recipes`} /> : null }
        <h1>{formState} Recipe</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label style={labelStyle}>Name</label>
            <input
              onChange={this.handleChange('name')}
              value={this.state.name}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>Ingredients</label>
            <input
              onChange={this.handleChange('ingredients')}
              value={this.state.ingredients}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>Link</label>
            <input
              onChange={this.handleChange('link')}
              value={this.state.link}
              type="text" />
          </div>
          <div>
            <button>Save</button>
            <Link to="/recipes">Cancel</Link>
          </div>
        </form>
      </div>
    )
  }
})

module.exports = RecipeForm
