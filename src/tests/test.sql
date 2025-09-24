-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.formprogress (
  formprogressid uuid NOT NULL DEFAULT gen_random_uuid(),
  userid uuid NOT NULL,
  step smallint,
  formdata jsonb,
  createdat timestamp with time zone NOT NULL DEFAULT now(),
  updatedat timestamp with time zone,
  CONSTRAINT formprogress_pkey PRIMARY KEY (formprogressid),
  CONSTRAINT formprogress_userid_fkey FOREIGN KEY (userid) REFERENCES public.profiles(profileid)
);
CREATE TABLE public.platformmessages (
  messageid uuid NOT NULL DEFAULT gen_random_uuid(),
  createddate timestamp with time zone NOT NULL DEFAULT now(),
  senderid uuid,
  recipientid uuid,
  content text,
  isread boolean,
  updateddate timestamp with time zone,
  initiator uuid,
  conversationid uuid,
  CONSTRAINT platformmessages_pkey PRIMARY KEY (messageid),
  CONSTRAINT platformmessages_senderid_fkey FOREIGN KEY (senderid) REFERENCES public.profiles(profileid),
  CONSTRAINT platformmessages_recipientid_fkey FOREIGN KEY (recipientid) REFERENCES public.profiles(profileid),
  CONSTRAINT platformmessages_initiator_fkey FOREIGN KEY (initiator) REFERENCES public.profiles(profileid)
);
CREATE TABLE public.profiles (
  profileid uuid NOT NULL DEFAULT gen_random_uuid(),
  profilename text NOT NULL,
  username text UNIQUE,
  email text NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::text),
  phonenumber text CHECK (phonenumber ~ '^\+?[0-9]\d{7,14}$'::text),
  avatarurl text CHECK (avatarurl ~ '^https?://.*$'::text OR avatarurl IS NULL),
  bio text,
  isagent boolean NOT NULL DEFAULT false,
  createddate timestamp with time zone NOT NULL DEFAULT now(),
  updateddate timestamp with time zone NOT NULL DEFAULT now(),
  lastsignindate timestamp with time zone,
  profileinfo jsonb,
  emailverified boolean NOT NULL DEFAULT false,
  useraccountstatus USER-DEFINED NOT NULL DEFAULT 'Active'::accountstatus,
  usertype USER-DEFINED NOT NULL,
  CONSTRAINT profiles_pkey PRIMARY KEY (profileid)
);
CREATE TABLE public.property (
  propertyid uuid NOT NULL DEFAULT gen_random_uuid(),
  createddate timestamp with time zone NOT NULL DEFAULT now(),
  propertytitle text,
  propertydescription text,
  ownerid uuid,
  propertyprice text,
  currency text,
  isfeatured boolean,
  isavailable boolean,
  updateddate timestamp with time zone,
  propertystatus USER-DEFINED,
  propertytypeid uuid NOT NULL,
  propertycategoryid uuid NOT NULL,
  propertyinfo1 text,
  propertyinfo2 text,
  propertyinfo3 text,
  propertyinfo4 text,
  propertyinfo5 text,
  CONSTRAINT property_pkey PRIMARY KEY (propertyid),
  CONSTRAINT property_propertytypeid_fkey FOREIGN KEY (propertytypeid) REFERENCES public.propertytype(propertytypeid),
  CONSTRAINT property_propertycategoryid_fkey FOREIGN KEY (propertycategoryid) REFERENCES public.propertycategory(propertycategoryid),
  CONSTRAINT property_ownerid_fkey FOREIGN KEY (ownerid) REFERENCES public.profiles(profileid)
);
CREATE TABLE public.propertyamenity (
  createddate timestamp with time zone NOT NULL DEFAULT now(),
  propertyid uuid,
  amenityname text,
  amenityicon text,
  propertyamenitydescription text,
  updateddate timestamp with time zone,
  amenitydata jsonb,
  propertyamenityid uuid NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT propertyamenity_pkey PRIMARY KEY (propertyamenityid),
  CONSTRAINT propertyamenity_propertyid_fkey FOREIGN KEY (propertyid) REFERENCES public.property(propertyid)
);
CREATE TABLE public.propertycategory (
  createddate timestamp with time zone NOT NULL DEFAULT now(),
  propertycategoryname text,
  propertycategorytitle text,
  propertycategoryicon text,
  description text,
  updateddate timestamp with time zone DEFAULT now(),
  propertycategoryid uuid NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT propertycategory_pkey PRIMARY KEY (propertycategoryid)
);
CREATE TABLE public.propertydetail (
  propertyid uuid,
  bedrooms text,
  bathrooms text,
  areasquare text,
  yearbuilt text,
  rentalperiod USER-DEFINED,
  furnished boolean,
  parkingspaces text,
  createddate timestamp with time zone NOT NULL DEFAULT now(),
  updateddate timestamp with time zone,
  propertydetailid uuid NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT propertydetail_pkey PRIMARY KEY (propertydetailid),
  CONSTRAINT propertydetail_propertyid_fkey FOREIGN KEY (propertyid) REFERENCES public.property(propertyid)
);
CREATE TABLE public.propertyimage (
  createddate timestamp with time zone NOT NULL DEFAULT now(),
  propertyid uuid,
  imageurl text,
  isprimary boolean DEFAULT false,
  updateddate timestamp with time zone,
  imageurls jsonb,
  propertyimageid uuid NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT propertyimage_pkey PRIMARY KEY (propertyimageid),
  CONSTRAINT propertyimage_propertyid_fkey FOREIGN KEY (propertyid) REFERENCES public.property(propertyid)
);
CREATE TABLE public.propertylocation (
  propertyid uuid,
  address text,
  city text,
  neighbourhood text,
  region text,
  postalcode text,
  latitude text,
  longitude text,
  createddate timestamp with time zone NOT NULL DEFAULT now(),
  updateddate timestamp with time zone,
  propertylocationid uuid NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT propertylocation_pkey PRIMARY KEY (propertylocationid),
  CONSTRAINT propertylocations_propertyid_fkey FOREIGN KEY (propertyid) REFERENCES public.property(propertyid)
);
CREATE TABLE public.propertyrating (
  propertyratingid bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  createddate timestamp with time zone NOT NULL DEFAULT now(),
  propertyid uuid,
  userid uuid,
  rating text,
  comment text,
  updateddate timestamp with time zone,
  CONSTRAINT propertyrating_pkey PRIMARY KEY (propertyratingid),
  CONSTRAINT propertyrating_propertyid_fkey FOREIGN KEY (propertyid) REFERENCES public.property(propertyid),
  CONSTRAINT propertyrating_userid_fkey FOREIGN KEY (userid) REFERENCES public.profiles(profileid)
);
CREATE TABLE public.propertytype (
  createddate timestamp with time zone NOT NULL DEFAULT now(),
  propertytypename text,
  description text,
  updateddate timestamp with time zone DEFAULT now(),
  propertytypeid uuid NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT propertytype_pkey PRIMARY KEY (propertytypeid)
);
CREATE TABLE public.propertyviewingrequest (
  viewingrequestid uuid NOT NULL DEFAULT gen_random_uuid(),
  createddate timestamp with time zone NOT NULL DEFAULT now(),
  propertyid uuid,
  userid uuid,
  requesteddate timestamp with time zone,
  requestedtime timestamp with time zone,
  requeststatus USER-DEFINED,
  requestnote text,
  updateddate timestamp with time zone,
  CONSTRAINT propertyviewingrequest_pkey PRIMARY KEY (viewingrequestid),
  CONSTRAINT propertyviewingrequest_userid_fkey FOREIGN KEY (userid) REFERENCES public.profiles(profileid),
  CONSTRAINT propertyviewingrequest_propertyid_fkey FOREIGN KEY (propertyid) REFERENCES public.property(propertyid)
);
CREATE TABLE public.propertyviews (
  propertyviewid bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  createddate timestamp with time zone NOT NULL DEFAULT now(),
  userid uuid,
  propertyid uuid,
  vieweddate timestamp with time zone DEFAULT now(),
  deviceinfo text,
  CONSTRAINT propertyviews_pkey PRIMARY KEY (propertyviewid),
  CONSTRAINT propertyviews_userid_fkey FOREIGN KEY (userid) REFERENCES public.profiles(profileid),
  CONSTRAINT propertyviews_propertyid_fkey FOREIGN KEY (propertyid) REFERENCES public.property(propertyid)
);
CREATE TABLE public.savedproperty (
  savedpropertyid bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  createddate timestamp with time zone NOT NULL DEFAULT now(),
  userid uuid,
  propertyid uuid,
  CONSTRAINT savedproperty_pkey PRIMARY KEY (savedpropertyid),
  CONSTRAINT savedproperty_userid_fkey FOREIGN KEY (userid) REFERENCES public.profiles(profileid),
  CONSTRAINT savedproperty_propertyid_fkey FOREIGN KEY (propertyid) REFERENCES public.property(propertyid)
);
CREATE TABLE public.userpreferences (
  userpreferenceid bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  createddate timestamp with time zone NOT NULL DEFAULT now(),
  userid uuid,
  preferredlocations jsonb,
  pricerangemin text,
  pricerangemax text,
  preferredpropertytypes jsonb,
  notificationsettings jsonb,
  updateddate timestamp with time zone DEFAULT now(),
  currency text,
  CONSTRAINT userpreferences_pkey PRIMARY KEY (userpreferenceid),
  CONSTRAINT userpreferences_userid_fkey FOREIGN KEY (userid) REFERENCES public.profiles(profileid)
);
