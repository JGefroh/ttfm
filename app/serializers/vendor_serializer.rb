class VendorSerializer < ActiveModel::Serializer
  attributes :id,
            :description, :name, :website_url
end
