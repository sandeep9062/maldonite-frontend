import { Metadata } from "next";
import { getServiceBySlug } from "../../../services/serverServices";
import ServiceDetailClient from "./ServiceDetailClient";
import { notFound } from "next/navigation";
import { getServiceImageBySlug } from "./serviceImages";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  // 🖼️ Public image resolved from the service slug (absolute URL for social sharing)
  const imageUrl = `https://www.maldonite.com${getServiceImageBySlug(slug)}`;

  return {
    title: `${service.title} | Maldonite Services`,
    description:
      service.desc || `${service.title} - Service offered by Maldonite`,
    keywords: service.keywords || [],
    alternates: {
      canonical: `https://www.maldonite.com/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Maldonite Services`,
      description:
        service.desc ||
        `${service.title} - Full-stack development service by Maldonite`,
      url: `https://www.maldonite.com/service/${service.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Maldonite Services`,
      description:
        service.desc ||
        `${service.title} - Full-stack development service by Maldonite`,
      images: [imageUrl],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // 🖼️ Serve the image from the local public folder, chosen by service slug
  const serviceWithLocalImage = {
    ...service,
    serviceImage: getServiceImageBySlug(slug),
  };

  return <ServiceDetailClient initialService={serviceWithLocalImage} />;
}

