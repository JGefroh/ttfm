class MarketSerializer < ActiveModel::Serializer
  attributes :id,
             :address, :distance, :name
  def distance
    if object.respond_to?(:distance)
      object.distance
    end
  end
end
