module Api
  class PropertiesController < ApplicationController

    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      user = session.user
      @property = user.properties.new(property_params)

      if @property.save
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
      return render json: { error: 'not_found' }, status: :not_found if !@property

      render 'api/properties/show', status: :ok
    end

    def property_params
      params.require(:property).permit(:title, :city, :country, :max_guests, :property_type, :bedrooms, :beds, :baths, :description, :price_per_night, :wifi, :kitchen, :iron, :tv, :essentials, :washer, :heating, :air_conditioning, :bathtub, :parking, :microwave, :oven, :refrigerator, :hair_dryer, :balcony, :smoke_alarm, :fire_extinguisher, images: [])
    end
  end
end
