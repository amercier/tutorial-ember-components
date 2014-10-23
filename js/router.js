App.Router.map(function() {
  this.route('favorites');
});

posts = [{
  name: 'Rails is omakase',
  description: 'There are lots of à la carte software environments in this world.',
  author: 'David Heinemeier Hansson'
}, {
  name: 'Broken Promises',
  description: 'James Coglan wrote a lengthy article about Promises in node.js.',
  author: 'James Coglan'
}];

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return posts; 
  }
});
