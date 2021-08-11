class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.belongs_to :user
      t.belongs_to :room
      t.string :content
      t.timestamps
    end
  end
end
