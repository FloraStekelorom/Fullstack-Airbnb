class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :require_login

  private

    def require_login
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)

      unless
        if session
          @user = session.user
        end
        flash[:error] = "You must be logged in to access this section"
        redirect_to :root
      end
    end

end
