class AddBoothInfoToMarketVendors < ActiveRecord::Migration
  def change
    add_column :market_vendors, :booth_location, :string
    add_column :market_vendors, :at_market_longitude, :float
    add_column :market_vendors, :at_market_latitude, :float
  end
end
