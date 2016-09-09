class AddOrganizationToMarkets < ActiveRecord::Migration
  def change
    add_column :markets, :organization, :string
  end
end
