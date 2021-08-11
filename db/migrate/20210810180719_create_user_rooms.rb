class CreateUserRooms < ActiveRecord::Migration[6.1]
  def change
    create_table :user_rooms do |t|
      t.belongs_to :user
      t.belongs_to :room
      t.timestamps
    end
  end
end
