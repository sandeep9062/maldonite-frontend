import { Metadata } from "next";
import { getProductBySlug } from "../../../services/serverServices";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";
import { getProductImageBySlug } from "../productImages";

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

  // 🖼️ Public image resolved from the product slug (absolute URL for social sharing)
  const imageUrl = `https://www.maldonite.com${getProductImageBySlug(slug)}`;

  return {
    title: `${product.name} | Maldonite SaaS Products`,
    description: product.description || `${product.name} - A SaaS product by Maldonite`,
    openGraph: {
      title: `${product.name} | Maldonite SaaS Products`,
      description: product.description || `${product.name} - SaaS product by Maldonite`,
      url: `https://www.maldonite.com/products/${product.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Maldonite SaaS Products`,
      description: product.description || `${product.name} - SaaS product by Maldonite`,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // 🖼️ Serve the image from the local public folder, chosen by product slug
  const productWithLocalImage = {
    ...product,
    image: getProductImageBySlug(slug),
  };

  return <ProductDetailClient initialProduct={productWithLocalImage} />;
}
