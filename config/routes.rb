Rails.application.routes.draw do
    root "home#index"

    devise_for :users, path: '', path_names: {
        sign_in: 'login',
        sign_out: 'logout',
        registration: 'signup'
    },
    controllers: {
        sessions: 'users/sessions',
        registrations: 'users/registrations'
    },
    defaults: { format: :xml }

    get "/a1_forms", to: 'a1_forms#index'
    get "/a1_forms/:id", to: 'a1_forms#show'
    post "/a1_forms", to: 'a1_forms#create'
    post "/a1_forms/search", to: 'a1_forms#search'
    post "/a1_forms/process_form", to: 'a1_forms#process_form'
end
