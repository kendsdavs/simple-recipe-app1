const React = require('react')
const { BrowserRouter, Match, Miss, Link } = require('react-router')
const Home = require('./pages/home')
const About = require('./pages/about')
const Recipes = require('./pages/recipes')
const RecipeForm = require('./pages/recipes/form')
const Recipe = require('./pages/recipes/show')
const Service = require('./components/service')

const NoMatch = () => (
  <div>
    <h3>Page Not Found</h3>
    <Link to="/">Home</Link>
  </div>
)

const App = React.createClass({
  render() {
    return (
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/about" component={About} />
          <Match exactly pattern="/recipes" component={Service(Recipes)} />
          <Match pattern="/recipes/:id/show" component={Service(Recipe)} />
          <Match exactly pattern="/recipes/new" component={RecipeForm} />
          <Match pattern="/recipes/:id/edit" component={RecipeForm} />
          <Miss component={NoMatch} />
        </div>
      </BrowserRouter>
    )
  }
})

module.exports = App
