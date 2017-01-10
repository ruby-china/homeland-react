config = Rails.application.config_for(:oauth2)

$oauth_client = OAuth2::Client.new(config['client_id'], config['secret'], site: config['site'])