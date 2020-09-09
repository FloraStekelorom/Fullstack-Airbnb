class PropertysuccessMailer < ApplicationMailer
  def notify(property)
    @property = property
    @user = property.user
    mail(to: @user.email, subject: 'Your property was successfully uploaded.')
  end
end
