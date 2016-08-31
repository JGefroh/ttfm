class CreateMarkets < ActiveRecord::Migration
  def change
    create_table :markets do |t|
      # Markets
      t.string :name

      # Geocoding
      t.float :latitude
      t.float :longitude
      t.string :address

      # Scheduling
      t.string :days_of_week


      # Other
      t.timestamps null: false
    end
  end
end
