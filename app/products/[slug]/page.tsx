import { Metadata } from "next";
import { getProductBySlug } from "../../../services/serverServices";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | Maldonite SaaS Products`,
    description:
      product.description || `${product.name} - A SaaS product by Maldonite`,
    openGraph: {
      title: `${product.name} | Maldonite SaaS Products`,
      description:
        product.description || `${product.name} - SaaS product by Maldonite`,
      url: `https://www.maldonite.com/products/${product.slug}`,
      images: product.image
        ? [
            {
              url: product.image,
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : [
            {
              url: "https://www.maldonite.com/images/og-image.jpg",
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Maldonite SaaS Products`,
      description:
        product.description || `${product.name} - SaaS product by Maldonite`,
      images: product.image
        ? [product.image]
        : ["https://www.maldonite.com/images/og-image.jpg"],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient initialProduct={product} />;
}
