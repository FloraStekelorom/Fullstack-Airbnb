class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def login
    render 'login'
  end

  def bookingsuccess
    @data = { booking_id: params[:id] }.to_json
    render 'bookingsuccess'
  end

  def mybookings
    render 'mybookings'
  end

  def myproperties
    render 'myproperties'
  end

  def listmyproperty
    render 'listmyproperty'
  end

  def propertysuccess
    @data = { property_id: params[:id] }.to_json
    render 'propertysuccess'
  end

end
