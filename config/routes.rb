Rails.application.routes.draw do

  root 'application#index'
  post 'security/sign_in', :to => 'application#check_admin_code'
  resources :markets do
    post 'check_import_data', on: :collection
    post 'import_data', on: :collection
    post 'export_data', on: :collection
    get 'to_coordinates', on: :collection
  end

  resources :vendors do
    put 'add_market', on: :member
    put 'remove_market', on: :member
  end
end
