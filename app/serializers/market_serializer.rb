class MarketSerializer < ActiveModel::Serializer
  attributes :id,
             :address, :days_of_week_as_array, :distance, :end_time, :latitude, :longitude, :name, :organization, :start_time
  def distance
    if object.respond_to?(:distance)
      object.distance
    end
  end
end
