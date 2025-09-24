
select pty.propertyid, ptcat.propertycategoryname, ptdet.bedrooms, ptdet.bathrooms, ptimg.imageurl, 
ptloc.city, ptrat.rating, pttyp.propertytypename
from property pty
left join propertyamenity ptamy on pty.propertyid = ptamy.propertyid
left join propertycategory ptcat on pty.propertycategoryid = ptcat.propertycategoryid
left join propertydetail ptdet on pty.propertyid = ptdet.propertyid
left join propertyimage ptimg on pty.propertyid = ptimg.propertyid
left join propertylocation ptloc on pty.propertyid = ptloc.propertyid
left join propertyrating ptrat on pty.propertyid = ptrat.propertyid
left join propertytype pttyp on pty.propertytypeid = pttyp.propertytypeid
where isfeatured is TRUE
and isavailable is TRUE
and pty.propertystatus = 'Published'
LIMIT 10;


DROP VIEW IF EXISTS featuredproperties;

CREATE VIEW featuredproperties WITH (security_invoker=on) AS
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
WHERE pty.isfeatured = TRUE
  AND pty.isavailable = TRUE
  AND pty.propertystatus = 'Published';

