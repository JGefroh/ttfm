class MarketSerializer < ActiveModel::Serializer
  attributes :id,
             :address, :distance, :latitude, :longitude, :name
  def distance
    if object.respond_to?(:distance)
      object.distance
    end
  end
end
