module Api
  class BookingsController < ApplicationController

    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      property = Property.find_by(id: params[:booking][:property_id])
      return render json: { error: 'cannot find property' }, status: :not_found if !property

      begin
        @booking = Booking.create({ user_id: session.user.id, property_id: property.id, start_date: params[:booking][:start_date], end_date: params[:booking][:end_date]})
        render 'api/bookings/create', status: :created
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def get_property_bookings
      property = Property.find_by(id: params[:id])
      return render json: { error: 'cannot find property' }, status: :not_found if !property
      @bookings = property.bookings.where("end_date > ? ", Date.today)
      render 'api/bookings/index'
    end

    def get_all_property_bookings
      property = Property.find_by(id: params[:id])
      return render json: { error: 'cannot find property' }, status: :not_found if !property
      @bookings = property.bookings
      render 'api/bookings/index'
    end

    def unique_booking
      @booking = Booking.find_by(id: params[:id])
      return render json: { error: 'booking not found' }, status: :not_found if !@booking

      render 'api/bookings/show', status: :ok
    end

    def booking_success
      @booking = Booking.find_by(id: params[:id])
      return render json: { error: 'booking not found' }, status: :not_found if !@booking

      BookingsuccessMailer.notify(@booking).deliver!
      PropertybookingMailer.notify(@booking).deliver!

      render 'api/bookings/show', status: :ok
    end

    def past_user_bookings
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'error' }, status: :not_found if !session

      user = session.user
      @bookings = user.bookings.order(end_date: :desc).where("start_date < ? ", Date.today).page(params[:page]).per(6)
      render 'api/bookings/index2'
    end

    def upcoming_user_bookings
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'error' }, status: :not_found if !session

      user = session.user
      @bookings = user.bookings.order(end_date: :desc).where("start_date >= ? ", Date.today).page(params[:page]).per(6)
      render 'api/bookings/index2'
    end

    def destroy
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'error' }, status: :not_found if !session

      user = session.user
      booking = Booking.find_by(id: params[:id])

      if booking and booking.user == user and booking.destroy
        render json: {
          success: true
        }
      else
        render json: {
          success: false
        }
      end
    end

    private
    def booking_params
      params.require(:booking).permit(:property_id, :start_date, :end_date, :id)
    end
  end
end
