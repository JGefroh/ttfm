class MarketVendorSerializer < ActiveModel::Serializer
  attributes :id,
             :booth_location, :market, :vendor

  def market
    return MarketSerializer.new(object.market, root: false)
  end

  def vendor
    return VendorSerializer.new(object.vendor, root: false)
  end
end
