casper.start('http://localhost:8008/')
.then(function() {
  phantomcss.screenshot('#main', 'Main app');
});
