$.get '/members.json', (data) ->
  Session.set 'members', data

Template.members.members = ->
  return Session.get 'members'

Template.member.links = ->
  retval = []
  if @home_url
    retval.push title: 'Website', url: @home_url
  if @github_url
    retval.push title: 'GitHub', url: @github_url
  return retval

Template.member.icon = ->
  if @title == 'Website'
    return 'octicon-home'
  if @title == 'GitHub'
    return 'octicon-mark-github'
  return 'octicon-link'