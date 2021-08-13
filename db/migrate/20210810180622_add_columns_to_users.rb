class AddColumnsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :name, :string
    add_column :users, :photo, :string
    add_column :users, :description, :string
    add_column :users, :status, :integer, default: 0
  end
end
