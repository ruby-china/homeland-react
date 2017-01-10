class OauthsController < ApplicationController
  def new
    url = $oauth_client.auth_code.authorize_url(redirect_uri: redirect_uri)
    redirect_to url
  end

  def destroy
    sign_out
    render json: {}
  end

  def callback
    token = $oauth_client.auth_code.get_token(params[:code], redirect_uri: redirect_uri)
    res = token.get("/api/v3/users/me.json")
    user = res.parsed['user'].as_json(only: %w(id login name avatar_url email tagline))
    user['token'] = token
    sign_in(user)
    redirect_to root_path
  end

  private

  def redirect_uri
    "#{request.protocol}#{request.host_with_port}/oauth/callback"
  end
end