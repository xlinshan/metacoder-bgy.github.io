var repos_url = 'https://api.github.com/users/metacoder-bgy/repos';
var members_url = 'members.json';

$(document).ready(function () {
  var loader = _.template($('#tmpl-loader').html());
  $('#repos .inner, #members .inner').html(loader());
  loadProjects();
  loadMembers();
});

function parseDate (date) {
  var date      = Math.abs(parseInt(date)),
      retval    = {},
      oneSecond = 1000,
      oneMinute = oneSecond * 60,
      oneHour   = oneMinute * 60,
      oneDay    = oneHour * 24,
      oneMonth  = oneDay * 30,
      oneYear   = oneDay * 365;
  retval.year   = Math.floor(date   /   oneYear);
  var month     = date   %   oneYear;
  retval.month  = Math.floor(month  /  oneMonth);
  var day       = month  %  oneMonth;
  retval.day    = Math.floor(day    /    oneDay);
  var hour      = day    %    oneDay;
  retval.hour   = Math.floor(hour   /   oneHour);
  var minute    = hour   %   oneHour;
  retval.minute = Math.floor(minute / oneMinute);
  var second    = minute % oneMinute;
  retval.second = Math.floor(second / oneSecond);
  return retval;
}

function dateSentence (num, unit, tense) {
  var sentence, vowel;
  vowel = ['hour'];
  num = Math.abs(num);
  if (num === 0) {
    num = 'no';
  }
  if (num === 1) {
    num = vowel.indexOf(unit) < 0 ? 'a' : 'an';
  }
  sentence = [num, "" + unit + "s", tense];
  return sentence.join(' ');
}

function loadProjects () {
  $.getJSON(repos_url, function (data) {
    var reposTmpl = _.template($('#tmpl-repos').html());
    var iconHelper = function (repo) {
      if (repo.private)
        return 'octicon-lock';
      if (repo.fork)
        return 'octicon-repo-forked';
      return 'octicon-repo';
    };
    var dateHelper = function (time) {
      var date = new Date(time),
          now = Date.now(),
          tense = now - date > 0 ? 'ago' : 'after',
          diff = parseDate(now - date),
          units = ['year', 'month', 'day', 'hour', 'minute', 'second'];
      for (var i = 0; i < units.length; i++) {
        var unit = units[i];
        if (diff[unit] > 0)
          return dateSentence(diff[unit], unit, tense);
      }
    };
    $('#repos .inner').html(reposTmpl({'repos': data, icon: iconHelper, when: dateHelper}));
  });
}

function loadMembers () {
  $.getJSON(members_url, function (data) {
    var membersTmpl = _.template($('#tmpl-members').html());
    var iconHelper = function (link) {
      switch (link.title) {
        case 'Website':
          return'octicon-home';
        case 'GitHub':
          return 'octicon-mark-github';
      }
      return 'octicon-link';
    };
    $('#members .inner').html(membersTmpl({'members': data, icon: iconHelper}));
  });
}


