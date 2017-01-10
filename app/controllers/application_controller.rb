class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user

  def sign_in(user)
    session[:user] = user
  end

  def sign_out
    session[:user] = nil
  end

  def current_user
    u = session[:user]
    return nil if u.blank?
    u.deep_symbolize_keys!
    expires_at = u.dig(:token, :expires_at)
    return nil if expires_at.blank?
    return nil if expires_at <= Time.now.to_i
    return u
  end
end
