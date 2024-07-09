source "https://rubygems.org"

ruby "3.0.6"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.1.3", ">= 7.1.3.3"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", ">= 5.0"

# XML serialication
gem 'activemodel-serializers-xml'
gem 'active_model_serializers'

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin Ajax possible
# gem "rack-cors"

# User sign in handling
gem "devise", "~> 4.9"
gem 'devise-jwt'

# Database
gem "mongoid"

gem "json"
gem "actionpack-xml_parser"
gem "rexml"

# Used to alow cors
gem 'rack-cors'

# For reding .env file
gem 'dotenv'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"
end
