class CustomFailureApp < Devise::FailureApp
    def http_auth_body
        { :error => "You need to sign in or sign up before continuing." }.to_xml(root: :message)
    end
end
