# frozen_string_literal: true

class ApplicationController < ActionController::API
    respond_to :xml

    before_action :configure_permitted_parameters, if: :devise_controller?

    protected

    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password, :username, :first_name, :last_name])
    end

    def action_not_allowed
        render :xml => {:error => "Action forbidden"}.to_xml(root: :message), status: :forbidden
    end
end
