class MarketsController < ApplicationController
  def index
    @markets = Market.all
    if params[:find_within]
      search_distance_in_miles = 20
      if params[:position_known] == 'true'
        search_center = [params[:current_lat], params[:current_lng]]
        @markets = @markets.near(search_center, search_distance_in_miles)
      else
        search_center = Geocoder::Calculations.geographic_center([[params[:sw_lat], params[:sw_lng]], [params[:ne_lat], params[:ne_lng]]])
        @markets = @markets.within_bounding_box([params[:sw_lat], params[:sw_lng], params[:ne_lat], params[:ne_lng]])
      end
    end
    render json: @markets
  end

  def create
    Market.create()
  end

  private def location_params
    params.require(:location).permit(:name, :address)
  end
end
