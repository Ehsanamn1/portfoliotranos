import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
 const base=process.env.NEXT_PUBLIC_SITE_URL||"https://portfoliotranos.wandering-wedelia-b71.workers.dev";
 return [
  {url:base,lastModified:new Date()},
  {url:`${base}/work/`,lastModified:new Date()},
  {url:`${base}/services/`,lastModified:new Date()},
  {url:`${base}/about/`,lastModified:new Date()},
  {url:`${base}/insights/`,lastModified:new Date()},
  {url:`${base}/contact/`,lastModified:new Date()}
 ];
}
