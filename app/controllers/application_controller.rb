class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  respond_to :json

  def index
    render json: {status: 200, message: 'API is up and running.', name: 'Joseph Gefroh'}
  end

  def has_admin_code
    return request.headers['X-TTFM-Authorization'] && request.headers['X-TTFM-Authorization'] == ENV['ADMIN_CODE_TO_UPDATE']
  end

  def check_admin_code
    if params[:admin_code] == ENV['ADMIN_CODE_TO_UPDATE']
      render json: {success: true}
    else
      render json: {success: false}, status: 403 and return
    end
  end
end
