class AddTimesToMarkets < ActiveRecord::Migration
  def change
    add_column :markets, :start_time, :string
    add_column :markets, :end_time, :string
  end
end
