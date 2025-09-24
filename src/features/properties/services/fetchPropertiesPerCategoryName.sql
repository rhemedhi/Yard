DROP VIEW IF EXISTS propertyPerCategoryName;

CREATE VIEW propertyPerCategoryName WITH (security_invoker=on) AS
select 
pty.propertytitle, 
pty.description, 
pty.propertyprice, 
pty.currency,
pty.isfeatured, 
pty.isavailable, 
pty.propertystatus, 
pty.propertyinfo1, 
ptc.propertycategoryname, 
ptt.propertytypename,
ptd.bedrooms, 
ptd.bathrooms, 
ptl.city
from property pty
left join propertycategory ptc on pty.propertycategoryid = ptc.propertycategoryid
left join propertytype ptt on pty.propertytypeid = ptt.propertytypeid
left join propertydetail ptd on pty.propertyid = ptd.propertyid
left join propertylocation ptl on pty.propertyid = ptl.propertyid
WHERE pty.isavailable = TRUE
  AND pty.propertystatus = 'Published';
  