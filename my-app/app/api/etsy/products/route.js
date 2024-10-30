import { NextResponse } from 'next/server';

const ETSY_API_KEY = process.env.ETSY_API_KEY;
const ETSY_SHOP_ID = process.env.ETSY_SHOP_ID;

export async function GET() {
  try {
    const response = await fetch(
      `https://openapi.etsy.com/v3/application/shops/${ETSY_SHOP_ID}/listings/active`,
      {
        headers: {
          'x-api-key': ETSY_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Etsy products');
    }

    const data = await response.json();
    
    // Get images for each listing
    const productsWithImages = await Promise.all(
      data.results.map(async (product) => {
        const imagesResponse = await fetch(
          `https://openapi.etsy.com/v3/application/listings/${product.listing_id}/images`,
          {
            headers: {
              'x-api-key': ETSY_API_KEY,
            },
          }
        );
        const imagesData = await imagesResponse.json();
        return {
          ...product,
          images: imagesData.results,
        };
      })
    );

    return NextResponse.json(productsWithImages);
  } catch (error) {
    console.error('Error fetching Etsy products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
} 