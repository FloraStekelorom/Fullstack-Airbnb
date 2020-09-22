module Api
  class PropertiesController < ApplicationController
    skip_before_action :require_login, only: [:index, :show, :search]

    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      user = session.user
      @property = user.properties.new(property_params)

      if @property.save
        PropertysuccessMailer.notify(@property).deliver!
        render 'api/properties/create', status: :created
      else
        render json: { success: false }, status: :bad_request
      end

    end

    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found if !@properties

      render 'api/properties/index', status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'property not found' }, status: :not_found if !@property

      render 'api/properties/show', status: :ok
    end

    def my_listed_properties
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'error' }, status: :not_found if !session

      user = session.user
      @properties = user.properties.order(end_date: :desc).page(params[:page]).per(6)
      render 'api/properties/index'
    end

    def destroy
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'error' }, status: :not_found if !session

      user = session.user
      property = Property.find_by(id: params[:id])

      if property and property.user == user and property.destroy
        render json: {
          success: true
        }
      else
        render json: {
          success: false
        }
      end
    end

    def search
        @parameter = params[:keywords].downcase
        @properties = Property.search(@parameter).page(params[:page]).per(6)
        render 'api/properties/index'
    end


    def property_params
      params.require(:property).permit(:title, :city, :country, :max_guests, :property_type, :bedrooms, :beds, :baths, :description, :price_per_night, :wifi, :kitchen, :iron, :tv, :essentials, :washer, :heating, :air_conditioning, :bathtub, :parking, :microwave, :oven, :refrigerator, :hair_dryer, :balcony, :smoke_alarm, :fire_extinguisher, images: [])
    end
  end
end
