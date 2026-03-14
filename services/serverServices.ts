// This file contains functions for fetching data on the server side.

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Fetch a single project by its slug
export async function getProjectBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/projects/slug/${slug}`);
    if (!res.ok) {
      // Log the error or handle it as needed
      console.error(`Failed to fetch project with slug ${slug}, status: ${res.status}`);
      return null; // Return null if the project is not found or an error occurs
    }
    const project = await res.json();
    return project;
  } catch (error) {
    console.error(`An error occurred while fetching project with slug ${slug}:`, error);
    return null; // Return null in case of a network error or other exception
  }
}

// Fetch a single service by its slug
export async function getServiceBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/services/slug/${slug}`);
    if (!res.ok) {
      console.error(`Failed to fetch service with slug ${slug}, status: ${res.status}`);
      return null;
    }
    const service = await res.json();
    return service;
  } catch (error) {
    console.error(`An error occurred while fetching service with slug ${slug}:`, error);
    return null;
  }
}

// Fetch a single blog by its slug
export async function getBlogBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/blogs/slug/${slug}`);
    if (!res.ok) {
      console.error(`Failed to fetch blog with slug ${slug}, status: ${res.status}`);
      return null;
    }
    const data = await res.json();
    return data.blog;
  } catch (error) {
    console.error(`An error occurred while fetching blog with slug ${slug}:`, error);
    return null;
  }
}
