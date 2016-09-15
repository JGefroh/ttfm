class MarketVendorOnlyVendorSerializer < ActiveModel::Serializer
  attributes :id,
             :booth_location, :vendor

  def vendor
    return VendorSerializer.new(object.vendor, root: false)
  end
end
