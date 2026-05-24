import { Metadata } from "next";
import { getServiceBySlug } from "../../../services/serverServices";
import ServiceDetailClient from "./ServiceDetailClient";
import { notFound } from "next/navigation";

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

  return {
    title: `${service.title} | Maldonite Services`,
    description:
      service.desc || `${service.title} - Service offered by Maldonite`,
    keywords: service.keywords || [],
    openGraph: {
      title: `${service.title} | Maldonite Services`,
      description:
        service.desc ||
        `${service.title} - Full-stack development service by Maldonite`,
      url: `https://www.maldonite.com/service/${service.slug}`,
      images: service.serviceImage
        ? [
            {
              url: service.serviceImage,
              width: 1200,
              height: 630,
              alt: service.title,
            },
          ]
        : [
            {
              url: "https://www.maldonite.com/images/og-image.jpg",
              width: 1200,
              height: 630,
              alt: service.title,
            },
          ],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient initialService={service} />;
}
