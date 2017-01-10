Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'home#index'
  resource :oauth do
    collection do
      get :callback
    end
  end
  match "*path", to: 'home#index', via: :all
end
