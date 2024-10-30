import { NextResponse } from 'next/server';

export async function GET() {
  // Return static products instead of fetching from Etsy
  const staticProducts = [
    {
      listing_id: 1,
      title: 'Traditional Moroccan Tagine',
      description: 'Handcrafted clay cooking pot perfect for slow-cooking stews, meats, and vegetables.',
      price: { amount: 4999, divisor: 100 },
      url: 'https://www.etsy.com',
      images: [{ url_570xN: 'https://images.unsplash.com/photo-1578678809532-6e7da45c07e4' }]
    },
    // ... other static products
  ];

  return NextResponse.json(staticProducts);
} 