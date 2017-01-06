require 'sprockets/rails/task'

namespace :assets do
  task :precompile do
    task = Sprockets::Rails::Task.new(Rails.application)
    task.manifest.compile(task.assets)
    exec "rails webpacker:compile"
  end
end