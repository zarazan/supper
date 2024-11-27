Rails.application.routes.draw do
  root "home#index"

  scope "/api" do
    resources :recipes
    resources :foods, only: [:index]
    resources :meal_plans, only: [:create, :show] do
      member do
        post :add_recipe
        delete :remove_recipe
      end
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  get "*path", to: "home#index"
end
