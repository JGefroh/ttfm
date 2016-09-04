class MarketSerializer < ActiveModel::Serializer
  attributes :id,
             :address, :days_of_week_as_array, :distance, :latitude, :longitude, :name
  def distance
    if object.respond_to?(:distance)
      object.distance
    end
  end
end
