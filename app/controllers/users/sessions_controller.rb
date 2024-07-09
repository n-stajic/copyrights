# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
    respond_to :xml

    # skip_before_action :verify_signed_out_user

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
        if current_user.persisted?
            render xml: {
                token: request.env['warden-jwt_auth.token'],
                user: current_user
            }, status: :ok
        else
            render xml: { error: 'Failed to log in.' }.to_xml(root: :message), status: :bad_request
        end
    end

    def respond_to_on_destroy
        if request.headers['Authorization'].present?
            jwt_payload = JWT.decode(request.headers['Authorization'].split.last,
                                     Rails.application.credentials.devise_jwt_secret_key!).first
            current_user = User.find(jwt_payload['sub'])
        end

        if current_user
            render xml: { message: 'Logged out successfully.' }.to_xml(root: :message), status: :ok
        else
            render xml: { message: "Couldn't find an active session." }.to_xml(root: :message), status: :unauthorized
        end
    end
end
