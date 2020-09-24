json.booking do
  json.id @booking.id
  json.start_date @booking.start_date
  json.end_date @booking.end_date
  json.is_paid @booking.is_paid?

  json.property do
    json.id @booking.property.id
    json.title @booking.property.title
    json.description @booking.property.description
    json.city @booking.property.city
    json.country @booking.property.country
    json.property_type @booking.property.property_type
    json.price_per_night @booking.property.price_per_night
    json.max_guests @booking.property.max_guests
    json.beds @booking.property.beds
    json.baths @booking.property.baths
    json.images do
      json.array! @booking.property.images do |image|
        json.image_url url_for(image)
      end
    end

  end

  json.charges do
    json.array! @booking.charges do |charge|
      json.checkout_session_id charge.checkout_session_id
      json.currency charge.currency
      json.amount charge.amount
    end
  end


end
