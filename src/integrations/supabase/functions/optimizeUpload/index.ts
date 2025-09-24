import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { Image as Img } from "https://deno.land/x/imagescript@1.2.15/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {

    const fetchData = await req.formData();
    const files = fetchData.getAll('file[]');
    const qualityStr = fetchData.get('qualityStr');
    const resizeStr = fetchData.get('resizeStr');
    const propertyId = fetchData.get('propertyId');
    let propertyInfoUpdated = false;
    
    // const { file, qualityStr, resizeStr } = await req.json();

    if (!files.length || !qualityStr || !resizeStr || !propertyId) {
      const missingFields = [];
      if (!files) missingFields.push('files');
      if (!qualityStr) missingFields.push('qualityStr');
      if (!resizeStr) missingFields.push('resizeStr');
      if (!propertyId) missingFields.push('propertyId');

      return new Response(JSON.stringify({ error: `missing required fields: ${missingFields.join(', ')}` }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      });
    }

    interface UploadResult {
      file: string;
      success: boolean;
      url?: string;
      error?: string;
    }
    const results: UploadResult[] = [];

    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_ANON_KEY') ?? '');

    let quality = 70;
    if (typeof qualityStr === 'string') {
      const q = parseInt(qualityStr, 10);
      if (!isNaN(q) && q >= 1 && q <= 100) {
        quality = q;
      }
    }

    let shouldResize = true;
    if (typeof resizeStr === 'string' && resizeStr.toLowerCase() === 'false') {
      shouldResize = false;
    }

    for (const file of files) {
      if (!(file instanceof File)) continue;

      const arrayBuffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);
      let image = await Img.decode(uint8);

      if (shouldResize && image.width > 500) {
        image = image.resize(500, Img.RESIZE_AUTO);
      }

      const optimized = await image.encodeJPEG(quality);
      const filePath = `properties/${crypto.randomUUID()}-${file.name}`;

      const { error: propertyImageeError } = await supabase.storage
        .from('propertyimages')
        .upload(filePath, optimized, {
          contentType: "image/jpeg",
          cacheControl: "31536000",
          upsert: false,
        });

      if (propertyImageeError) {
        results.push({ file: file.name, success: false, error: propertyImageeError.message });
        continue; 
      } 

      // get image url and update propertyinfo1 in property table
      const { data: publicUrl } = supabase.storage.from("propertyimages").getPublicUrl(filePath);
      if (!propertyInfoUpdated) {
        const { error: updatePropertyInfo1Error } = await supabase.from('property').update({ propertyinfo1: publicUrl.publicUrl }).eq('propertyid', propertyId);

        if (updatePropertyInfo1Error) {
          return new Response(JSON.stringify({ error: updatePropertyInfo1Error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
          });
        }

        propertyInfoUpdated = true;
        image = null as any;
      }

      results.push({
        file: file.name,
        success: true,
        url: publicUrl.publicUrl
      });
      
    }

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: err?.message ?? err }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500 
    })
  }
})


