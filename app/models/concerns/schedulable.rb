module Schedulable
  extend ActiveSupport::Concern

  included do
    def start_time_as_long
      return self.start_time.to_i if self.start_time.present?
    end

    def end_time_as_long
      return self.end_time.to_i if self.end_time.present?
    end
  end

  class_methods do
  end
end
