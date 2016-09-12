class VendorSerializer < ActiveModel::Serializer
  attributes :id,
            :description, :name
end
