Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/property/:id' => 'static_pages#property'
  get '/login' => 'static_pages#login'
  get '/booking/:id/success' =>  'static_pages#bookingsuccess'
  get '/mybookings' => 'static_pages#mybookings'
  get '/myproperties' => 'static_pages#myproperties'
  get '/listmyproperty' => 'static_pages#listmyproperty'
  get '/property/:id/success' => 'static_pages#propertysuccess'
  get '/property/:id/bookings' => 'static_pages#propertybookings'
  get '/editproperty/:id' => 'static_pages#editproperty'


  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create]
    resources :properties, only: [:index, :show]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]

    #BOOKINGS
    get '/bookings/:id' => 'bookings#unique_booking'
    get '/bookingsuccess/:id' => 'bookings#booking_success'
    get '/mypastbookings' => 'bookings#past_user_bookings'
    get '/myupcomingbookings' => 'bookings#upcoming_user_bookings'
    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/property/:id/bookings' => 'bookings#get_property_bookings'
    get '/property/:id/pastbookings' => 'bookings#get_past_property_bookings'
    delete '/booking/:id'   => 'bookings#destroy'

    #PROPERTY
    post '/properties' => 'properties#create'
    get '/mylistedproperties' => 'properties#my_listed_properties'
    get '/properties/:id' => 'properties#show'
    get '/properties/search/:keywords' => 'properties#search'
    delete '/property/:id'   => 'properties#destroy'
    put '/propertyupdate/:id'   => 'properties#update'
    delete '/property/images/:image_id' => 'properties#delete_picture'

    #SESSIONS
    get '/authenticated' => 'sessions#authenticated'
    delete '/sessions'   => 'sessions#destroy'

    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'
  end

  get '*path', to: redirect('/'), constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }

end
