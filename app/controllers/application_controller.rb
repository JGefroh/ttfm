class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  respond_to :json

  def index
    render json: {status: 200, message: 'API is up and running.', name: 'Joseph Gefroh'}
  end

  def has_admin_code
    return request.headers['Authorization'] && request.headers['Authorization'] == ENV['ADMIN_CODE_TO_UPDATE']
  end
end
