beforeEach(function() {
  this.addMatchers({
    toBeInside: function(expected) {
      return (expected.indexOf(this.actual) == -1) ? false : true;
    }
  })
});