$.get 'https://api.github.com/users/metacoder-bgy/repos', (data) ->
  Session.set 'repos', data

parseDate = (date) ->
  date = Math.abs parseInt date
  retval = {}
  oneSecond = 1000
  oneMinute = oneSecond * 60
  oneHour   = oneMinute * 60
  oneDay    = oneHour   * 24
  oneMonth  = oneDay    * 30
  oneYear   = oneDay    * 365

  retval.year = Math.floor date / oneYear
  month = date % oneYear
  retval.month = Math.floor month / oneMonth
  day = month % oneMonth
  retval.day = Math.floor day / oneDay
  hour = day % oneDay
  retval.hour = Math.floor hour / oneHour
  minute = hour % oneHour
  retval.minute = Math.floor minute / oneMinute
  second = minute % oneMinute
  retval.second = Math.floor second / oneSecond

  return retval

say = (num, unit, tense) ->
  vowel = ['hour']
  num = Math.abs num
  num = 'no' if num == 0
  if num == 1
    num = if unit not in vowel then 'a' else 'an'
  sentence = [num, "#{unit}s", tense]
  return sentence.join ' '

Template.repos.repos = ->
  return Session.get 'repos'

Template.repo.icon = ->
  if @private
    return 'octicon-lock'
  if @fork
    return 'octicon-repo-forked'
  return 'octicon-repo'

Template.repo.when = (time) ->
  date = new Date time
  now  = Date.now()
  tense = if now - date > 0 then 'ago' else 'after'
  diff = parseDate now - date
  for i in ['year', 'month', 'day', 'hour', 'minute', 'second']
    if diff[i] > 0
      return say diff[i], i, tense
