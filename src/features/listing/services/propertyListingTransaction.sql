create or replace function insert_property_transaction(
  _property jsonb,
  _amenity jsonb,
  _detail jsonb,
  _location jsonb,
  _images text[]
)
returns uuid
language plpgsql
as $$
declare
  new_property_id uuid;
begin
  -- Start transaction automatically in function
  insert into property (
    propertytitle, description, ownerid, propertyprice,
    currency, isfeatured, isavailable, propertystatus,
    propertytypeid, propertycategoryid
  )
  values (
    _property->>'propertytitle',
    _property->>'description',
    (_property->>'ownerid')::uuid,
    (_property->>'propertyprice')::numeric,
    _property->>'currency',
    (_property->>'isfeatured')::boolean,
    (_property->>'isavailable')::boolean,
    _property->>'propertystatus',
    (_property->>'propertytypeid')::uuid,
    (_property->>'propertycategoryid')::uuid,
  )
  returning propertyid into new_property_id;

  insert into propertyamenity (propertyid, amenityname, amenitydata)
  values (
    new_property_id,
    _amenity->>'amenityname',
    _amenity->>'amenitydata'
  );

  insert into propertydetail (propertyid, bedrooms, bathrooms, areasquare, yearbuilt, rentalperiod, furnished, parkingspaces)
  values (
    new_property_id,
    (_detail->>'bedrooms')::int,
    (_detail->>'bathrooms')::int,
    (_detail->>'areasquare')::int,
    (_detail->>'yearbuilt')::int,
    _detail->>'rentalperiod',
    _detail->>'furnished',
    (_detail->>'parkingspaces')::int
  );

  insert into propertylocation (propertyid, address, city, neighbourhood, region, postalcode, latitude, longitude)
  values (
    new_property_id,
    _location->>'address',
    _location->>'city',
    _location->>'neighbourhood',
    _location->>'region',
    _location->>'postalcode',
    (_location->>'latitude')::numeric,
    (_location->>'longitude')::numeric
  );

  if array_length(_images, 1) > 0 then
    insert into propertyimage (propertyid, imageurls)
    values (new_property_id, _images);
  end if;

  return new_property_id;
end;
$$;
