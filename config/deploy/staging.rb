server '109.234.34.240', user: 'gymer_deploy', port: 22, roles: [:web, :app, :db], primary: true
set :branch, ENV['BRANCH'] || 'master'
set :nginx_server_name, 'staging.webchat.gymmer.ru'
