class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum status: [:available, :occupied, :away, :invisible, :offline]

  validates_presence_of :name, :email

  def translated_status
    I18n.t("user.status.#{self.status}")
  end
end
