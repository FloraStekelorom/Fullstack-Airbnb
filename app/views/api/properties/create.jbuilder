json.property do
  json.id @property.id
  json.username @property.user.username
  json.title  @property.title
  json.city  @property.city
  json.country  @property.country
  json.property_type @property.property_type
  json.max_guests  @property.max_guests
  json.bedrooms  @property.bedrooms
  json.beds  @property.beds
  json.baths  @property.baths
  json.description  @property.description
  json.price_per_night @property.price_per_night
  json.wifi @property.wifi
  json.kitchen @property.kitchen
  json.iron @property.iron
  json.tv @property.tv
  json.essentials @property.essentials
  json.washer @property.washer
  json.heating @property.heating
  json.air_conditioning @property.air_conditioning
  json.bathtub @property.bathtub
  json.parking @property.parking
  json.microwave @property.microwave
  json.oven @property.oven
  json.refrigerator @property.refrigerator
  json.hair_dryer @property.hair_dryer
  json.balcony @property.balcony
  json.smoke_alarm @property.smoke_alarm
  json.fire_extinguisher @property.fire_extinguisher

  json.images do
    json.array! @property.images do |image|
      json.image url_for(image)
    end
  end

end
