json.total_pages @bookings.total_pages
json.next_page @bookings.next_page

json.bookings do
  json.array! @bookings do |booking|
    json.id booking.id
    json.start_date booking.start_date
    json.end_date booking.end_date
  end
end
