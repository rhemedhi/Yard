select pt.*, pta.*, ptg.propertycategoryname, ptd.*, ptl.*, ptt.propertytypename, 
from property pt
left join propertyamenity pta on pt.propertyid = pta.propertyid 
left join propertycategory ptg on pt.propertycategoryid = ptg.propertycategoryid
left join propertydetail ptd on pt.propertyid = ptd.propertyid 
left join propertyimage pti on pt.propertyid = pti.propertyid
left join propertylocation ptl on pt.propertyid = ptl.propertyid
left join propertyrating ptr on pt.propertyid = ptr.propertyid
left join propertytype ptt on pt.propertytypeid = ptt.propertytypeid


DROP VIEW IF EXISTS fetchallproperties;

CREATE VIEW fetchallproperties WITH (security_invoker=on) AS 
SELECT
    pt.*, 
    pta.amenityname, 
    pta.amenitydata, 
    ptg.propertycategoryname, 
    ptd.bedrooms, 
    ptd.bathrooms, 
    ptd.areasquare, 
    ptd.yearbuilt, 
    ptd.rentalperiod, 
    ptd.furnished, 
    ptd.parkingspaces, 
    pti.imageurls,
    ptl.address, 
    ptl.city, 
    ptl.neighbourhood, 
    ptl.region, 
    ptl.postalcode, 
    ptl.latitude, 
    ptl.longitude, 
    ptt.propertytypename
from property pt
left join propertyamenity pta on pt.propertyid = pta.propertyid 
left join propertycategory ptg on pt.propertycategoryid = ptg.propertycategoryid
left join propertydetail ptd on pt.propertyid = ptd.propertyid 
left join propertyimage pti on pt.propertyid = pti.propertyid
left join propertylocation ptl on pt.propertyid = ptl.propertyid
left join propertytype ptt on pt.propertytypeid = ptt.propertytypeid;
