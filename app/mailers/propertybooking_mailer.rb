class PropertybookingMailer < ApplicationMailer
  def notify(booking)
    @booking = booking
    @user = booking.property.user
    mail(to: @user.email, subject: 'Your property was successfully booked.')
  end
end
