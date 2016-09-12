class VendorsController < ApplicationController
  def index
    @vendors = Vendor.all
    if params[:market_id]
      @vendors = @vendors.where(id: MarketVendor.where(market_id: params[:market_id]).pluck(:vendor_id))
    end
    render json: @vendors
  end

  def create
    if has_admin_code
      @vendor = Vendor.create(vendor_params)
      @vendor.save!
      render json: @vendor
    else
      send_unauthorized_response
    end
  end

  def update
    if has_admin_code
      @vendor = Vendor.find(params[:id])
      @vendor.update(vendor_params)
      render json: @vendor
    else
      send_unauthorized_response
    end
  end

  def destroy
    if has_admin_code
      @vendor = Vendor.find(params[:id])
      @vendor.destroy
      render json: @vendor
    else
      send_unauthorized_response
    end
  end

  def show
    render json: Vendor.find(params[:id])
  end

  def add_market
    if has_admin_code
      @vendor = Vendor.find(params[:id])
      @market_vendor = MarketVendor.create(vendor_id: params[:id], market_id: params[:market_id]);
      render json: @market_vendor.market, root: false
    else
      send_unauthorized_response
    end
  end
  def remove_market
    if has_admin_code
      @vendor = Vendor.find(params[:id])
      @vendor.market_vendors.where(market_id: params[:market_id]).destroy_all
      render json: {success: true}
    else
      send_unauthorized_response
    end
  end

  private def vendor_params
    params.require(:vendor).permit(:name, :description)
  end

  def send_unauthorized_response
    render json: {error: 'An administration code is required to use this feature. - Further invalid attempts may be logged and reported.'}, root: false, status: 403 and return
  end

end
