module Locatable
  extend ActiveSupport::Concern

  included do
      geocoded_by :address
      after_validation :geocode, if: ->(object){ object.address_changed? }
      validates :address, length: {maximum: 100}

      def to_marker(display_html)
        if geocoded?
          return {
            id: self.id,
            lat: self.latitude + rand(-0.000050..0.000050),
            lng: self.longitude + rand(-0.000050..0.000050),
            infowindow: display_html
          }
        end
      end

      def latitude_with_fudge
        if (geocoded?)
          self.latitude + rand(-0.000050..0.000050)
        end
      end

      def longitude_with_fudge
        if (geocoded?)
          self.longitude + rand(-0.000050..0.000050)
        end
      end
  end

  class_methods do
  end
end
