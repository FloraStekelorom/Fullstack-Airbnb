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

  json.images do
    json.array! @property.images do |image|
      json.image url_for(image)
    end
  end

end
