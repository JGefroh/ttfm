class Market < ActiveRecord::Base
  include Locatable
  include Schedulable
end
