Rails.application.routes.draw do
    devise_for :users, defaults: { format: :xml }, path: '', path_names: {
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
    get "/a1_forms/xhtml_download/:id", to: 'a1_forms#xhtml_download'
    get "/a1_forms/pdf_download/:id", to: 'a1_forms#pdf_download'
    post "/a1_forms", to: 'a1_forms#create'
    post "/a1_forms/search", to: 'a1_forms#search'
    post "/a1_forms/process_form", to: 'a1_forms#process_form'
    post "/a1_forms/generate_report", to: 'a1_forms#generate_report'
end
