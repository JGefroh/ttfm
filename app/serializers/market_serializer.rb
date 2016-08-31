class MarketSerializer < ActiveModel::Serializer
  attributes  :id, :created_at, :updated_at
              :address, :distance, :latitiude, :locale, :longitude, :name
end
