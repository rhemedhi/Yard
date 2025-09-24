DROP VIEW IF EXISTS newListedproperties;

CREATE VIEW newListedproperties WITH (security_invoker=on) AS
SELECT 
  pty.propertyid, 
  pty.propertytitle,
  pty.propertydescription,
  pty.propertyprice,
  pty.currency,
  pty.propertyinfo1,
  pty.propertyinfo2,
  pty.propertyinfo3,
  pty.propertyinfo4,
  pty.propertyinfo5,
  pty.createddate,
  pty.isfeatured,
  ptcat.propertycategoryname, 
  ptdet.bedrooms, 
  ptdet.bathrooms, 
  ptdet.rentalperiod, 
  ptimg.imageurl, 
  ptloc.city, 
  ptrat.rating, 
  pttyp.propertytypename
FROM property pty
LEFT JOIN propertyamenity ptamy ON pty.propertyid = ptamy.propertyid
LEFT JOIN propertycategory ptcat ON pty.propertycategoryid = ptcat.propertycategoryid
LEFT JOIN propertydetail ptdet ON pty.propertyid = ptdet.propertyid
LEFT JOIN propertyimage ptimg ON pty.propertyid = ptimg.propertyid
LEFT JOIN propertylocation ptloc ON pty.propertyid = ptloc.propertyid
LEFT JOIN propertyrating ptrat ON pty.propertyid = ptrat.propertyid
LEFT JOIN propertytype pttyp ON pty.propertytypeid = pttyp.propertytypeid
WHERE pty.isavailable = TRUE
  AND pty.isfeatured = FALSE
  AND pty.propertystatus = 'Published'
  AND pty.createddate >= now() - interval '120 days';
  