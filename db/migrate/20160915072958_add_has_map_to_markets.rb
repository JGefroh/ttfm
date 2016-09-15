class AddHasMapToMarkets < ActiveRecord::Migration
  def change
    add_column :markets, :has_map, :boolean
  end
end
