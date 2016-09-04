class Market < ActiveRecord::Base
  include Locatable
  include Schedulable


  def days_of_week_as_array
    unless self.days_of_week.present?
      return []
    end

    array = []
    if (self.days_of_week.include?('sun'))
      array << 'sun'
    end
    if (self.days_of_week.include?('mon'))
      array << 'mon'
    end
    if (self.days_of_week.include?('tue'))
      array << 'tue'
    end
    if (self.days_of_week.include?('wed'))
      array << 'wed'
    end
    if (self.days_of_week.include?('thu'))
      array << 'thu'
    end
    if (self.days_of_week.include?('fri'))
      array << 'fri'
    end
    if (self.days_of_week.include?('sat'))
      array << 'sat'
    end
    return array;
  end
end
