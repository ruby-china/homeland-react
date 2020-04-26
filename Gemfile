source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 6'
gem 'mysql2', '>= 0.3.18', '< 0.5'
gem 'puma'
gem 'sass-rails'
gem 'uglifier'
gem 'jbuilder'

gem 'foreman'
gem 'bootstrap', '~> 4'
gem 'font-awesome-rails'
gem 'webpacker'

gem 'oauth2'
gem 'faraday'

group :development, :test do
  gem 'byebug', platform: :mri
end

group :development do
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end
