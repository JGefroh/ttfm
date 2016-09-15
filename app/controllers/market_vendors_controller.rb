class MarketVendorsController < ApplicationController
  def index
   if params[:market_id]
    @market_vendors = MarketVendor.where(market_id: params[:market_id])
    render json: @market_vendors, each_serializer: MarketVendorOnlyVendorSerializer, root: false
  else
    @market_vendors = MarketVendor.where(vendor_id: params[:vendor_id]) if params[:vendor_id]
    render json: @market_vendors, each_serializer: MarketVendorSerializer, root: false
  end
  end
end
