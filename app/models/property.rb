class Property < ApplicationRecord
  belongs_to :user
  has_many :bookings, dependent: :destroy
  has_many_attached :images

  validates :title, presence: true, length: { maximum: 70 }
  validates :description, presence: true, length: { maximum: 2000 }
  validates :city, presence: true, length: { maximum: 200 }
  validates :country, presence: true, length: { maximum: 200 }
  validates :property_type, presence: true, length: { maximum: 200 }
  validates :price_per_night, presence: true, numericality: { only_integer: true, greater_than: 0, less_than: 99999 } # in USD
  validates :max_guests, presence: true, numericality: { only_integer: true, greater_than: 0, less_than: 20 }
  validates :bedrooms, presence: true, numericality: { only_integer: true, less_than: 20 }
  validates :beds, presence: true, numericality: { only_integer: true, less_than: 20 }
  validates :baths, presence: true, numericality: { only_integer: true, less_than: 20 }
  validates :user, presence: true

  include AlgoliaSearch
    algoliasearch do
      attribute :title, :city, :country, :description, :property_type, :price_per_night
      images.map do |image|
        { image_url: Rails.application.routes.url_helpers.rails_blob_path(image, only_path: true) }
      end
    end
  end

  def self.search(search)
    if search
      where(["lower(title) LIKE ?","%#{search}%"])
    else
      all
    end
  end
