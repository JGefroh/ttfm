class AddWebsitesToMarketsAndVendors < ActiveRecord::Migration
  def change
    add_column :markets, :website_url, :string
    add_column :vendors, :website_url, :string
  end
end
