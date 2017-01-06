#= require jquery
#= require react
#= require react_router
#= require react_ujs
#= require_self
#= require_tree ./containers
#= require_tree ./components
#= require router


window.Homeland =
  fetch: (path, opts) ->
    return $.get("https://ruby-china.org/api/v3#{path}", opts);