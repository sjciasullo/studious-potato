Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post "/login" => "sessions#create"
  delete "/logout" => "sessions#destroy"
  get "/profile" => "users#profile"
  resources :users, except: [:index, :delete]
  resources :experiments do 
    resources :trials, only: [:index, :create, :update]
  end

  get "trials/:trial_id/data" => "datapoints#index"
  post "trials/:trial_id/data" => "datapoints#create"
  put "trials/:trial_id/data/:id" => "datapoints#update"
  delete "trials/:trial_id/data/:id" => "datapoints#destroy"

end
