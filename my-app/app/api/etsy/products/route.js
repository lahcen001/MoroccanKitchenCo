import { NextResponse } from 'next/server';

const ETSY_ACCESS_TOKEN = process.env.ETSY_ACCESS_TOKEN;
const ETSY_SHOP_ID = process.env.ETSY_SHOP_ID;

export async function GET() {
  try {
    const url = `https://openapi.etsy.com/v3/application/shops/${ETSY_SHOP_ID}/listings/active`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${ETSY_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    const data = await response.json();

    // Get images for each listing
    const productsWithImages = await Promise.all(
      data.results.map(async (listing) => {
        const imagesResponse = await fetch(
          `https://openapi.etsy.com/v3/application/listings/${listing.listing_id}/images`,
          {
            headers: {
              'Authorization': `Bearer ${ETSY_ACCESS_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (!imagesResponse.ok) {
          return {
            ...listing,
            images: []
          };
        }

        const imagesData = await imagesResponse.json();
        return {
          ...listing,
          images: imagesData.results
        };
      })
    );

    return NextResponse.json(productsWithImages);
  } catch (error) {
    console.error('Error fetching from Etsy:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products from Etsy' },
      { status: 500 }
    );
  }
} 