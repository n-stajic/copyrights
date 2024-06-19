# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
    # include RackSessionsFix

    # before_action :configure_sign_in_params, only: [:create]

    # GET /resource/sign_in
    # def new
    #   super
    # end

    # POST /resource/sign_in
    # def create
    #   super
    # end

    # DELETE /resource/sign_out
    # def destroy
    #   super
    # end

    # protected

    # If you have extra params to permit, append them to the sanitizer.
    # def configure_sign_in_params
    #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
    # end

    private

    def respond_with(current_user, _opts = {})
        render xml: current_user, status: :ok
    end

    def respond_to_on_destroy
        render xml: { message: 'Logged out successfully.' }.to_xml(root: :message), status: :ok
    end
end
