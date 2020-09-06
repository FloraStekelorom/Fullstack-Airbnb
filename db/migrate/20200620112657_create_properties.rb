class CreateProperties < ActiveRecord::Migration[5.2]
  def change
    create_table :properties do |t|
      t.string :title
      t.string :description
      t.string :city
      t.string :country
      t.string :property_type
      t.integer :price_per_night
      t.integer :max_guests
      t.integer :bedrooms
      t.integer :beds
      t.integer :baths
      t.boolean :wifi
      t.boolean :kitchen
      t.boolean :iron
      t.boolean :tv
      t.boolean :essentials
      t.boolean :washer
      t.boolean :heating
      t.boolean :air_conditioning
      t.boolean :bathtub
      t.boolean :parking
      t.boolean :microwave
      t.boolean :oven
      t.boolean :refrigerator
      t.boolean :hair_dryer
      t.boolean :balcony
      t.boolean :smoke_alarm
      t.boolean :fire_extinguisher

      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end
