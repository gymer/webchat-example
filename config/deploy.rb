# Change these

set :application, "webchat"
set :repo_url, "https://github.com/gymer/webchat-example.git"
set :deploy_to, "/www/#{fetch(:application)}_#{fetch(:stage)}"
set :log_level, :debug
set :linked_files, %w{config/database.yml config/secrets.yml}
set :linked_dirs, %w{tmp/sockets tmp/pids log public/system}

namespace :deploy do
  task :restart do
    invoke 'unicorn:restart'
  end

  task :webpack do
    on roles(:app) do
      system('webpack')
      upload! './app/assets/javascripts/bundle.js', "#{fetch(:release_path)}/app/assets/javascripts/bundle.js"
    end
  end

  before 'deploy:assets:precompile', 'deploy:webpack'
end
