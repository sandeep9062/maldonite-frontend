import { Metadata } from 'next';
import { getProjectBySlug } from '../../../services/serverServices';
import ProjectDetailsClient from './ProjectDetailsClient';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The project you are looking for does not exist.',
    };
  }

  const firstImage = project.image && project.image.length > 0 ? project.image[0] : '/images/maldonite.png';

  return {
    title: `${project.title} | Maldonite`,
    description: project.description,
    keywords: project.technologiesUsed,
    openGraph: {
      title: project.title,
      description: project.description,
      url: `https://www.maldonite.com/projects/${project.slug}`,
      images: [
        {
          url: firstImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [firstImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsClient project={project} />;
}
