class BookingsuccessMailer < ApplicationMailer
  def notify(booking)
    @booking = booking
    @user = booking.user
    mail(to: @user.email, subject: 'Your booking was successfully processed.')
  end
end
