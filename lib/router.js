FlowRouter.route('/*', {
  name: 'default',
  action(params, queryParams) {
    // re-route all incoming traffic to main.html
    FlowRouter.go('main.show');
  }
});



FlowRouter.route('/main.html', {
  name: 'main.show',
  action(params, queryParams) {
    console.log("Looking at a list?");
  }
});


