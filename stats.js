var charm = require('charm')(process);
var Table = require('easy-table');

charm.on('^C', process.exit);

var startTime = new Date().getTime();
var totalTime = 0;
var statsTitle = 'Stats';

var periods = {
  short: 100,
  med: 1000,
  long: 5000
};

var counts = {
  short: 0,
  med: 0,
  long: 0,
  overall: 0
};

var averages = {
  short: 0,
  med: 0,
  long: 0,
  overall: 0
};

var last = {
  short: 0,
  med: 0,
  long: 0,
  overall: 0
};

var latency = {
  short: 0,
  med: 0,
  long: 0,
  overall: 0
}

var redraw = function() {
  charm.erase('screen');
  charm.position(0, 0);

  charm.write(statsTitle + "\n\n");

  var table = new Table();

  table.cell('', 'Count');
  for (var period in periods) {
    table.cell(period + ' (' + periods[period] + ')', last[period], Table.string, 12);
  }
  table.cell('overall', counts.overall);
  table.newLine();

  table.cell('', '#/sec')
  for (var period in periods) {
    table.cell(period + ' (' + periods[period] + ')', averages[period], Table.string, 12);
  }
  table.cell('overall', averages.overall);
  table.newLine();

  table.cell('', 'Latency')
  for (var period in periods) {
    table.cell(period + ' (' + periods[period] + ')', latency[period], Table.string, 12);
  }
  table.cell('overall', latency.overall);
  table.newLine();

  charm.write(table.toString());
};

for (var period in periods) {
  setInterval((function(period){
    return function() {
      totalTime = new Date().getTime() - startTime;
      averages.overall = (counts.overall / totalTime) * 1000;

      averages[period] = counts[period] * (1000 / periods[period]);
      last[period] = counts[period];
      counts[period] = 0;

      // Redraw on short period.
      if (period === 'short') {
        redraw();
      }
    }
  })(period), periods[period]);
}

module.exports = {
  clear: function() {
    charm.reset();
  },
  setTitle: function(title) {
    statsTitle = title;
  },
  updateCounts: function() {
    for(var period in counts) {
      counts[period]++;
    }
  },
  updateLatency: function(time) {
    for(var period in latency) {
      latency[period] = time;
    }
  }
};


