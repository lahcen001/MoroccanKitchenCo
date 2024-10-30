'use client';

import { useState, useEffect } from 'react';

export function useEtsyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/etsy/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        
        // Transform the data
        const transformedProducts = data.map(product => ({
          listing_id: product.listing_id,
          title: product.title,
          description: product.description,
          price: {
            amount: product.price.amount,
            divisor: product.price.divisor,
            formatted: `$${(product.price.amount / product.price.divisor).toFixed(2)}`
          },
          url: product.url,
          mainImage: product.images[0]?.url_570xN || '',
          images: product.images.map(img => ({
            url_75x75: img.url_75x75,
            url_170x135: img.url_170x135,
            url_570xN: img.url_570xN,
            url_fullxfull: img.url_fullxfull
          })),
          quantity: product.quantity,
          tags: product.tags || [],
          shortDescription: product.description.substring(0, 150) + '...'
        }));

        setProducts(transformedProducts);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching Etsy products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
} 