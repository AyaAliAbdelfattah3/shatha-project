// const SERVER_ORIGIN = import.meta.env.VITE_API_URL.replace("/api","")
// export const resolveProductImage = (path) =>`${SERVER_ORIGIN}${path}`

export const resolveProductImage = (path) => {
  if (!path) return "https://via.placeholder.com/300?text=No+Image";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const rawApiUrl = import.meta.env.VITE_API_URL || "https://backend-shatha-project.vercel.app/api";
  const SERVER_ORIGIN = rawApiUrl.replace(/\/api\/?$/, "");
  const cleanPath = path.startsWith("/") ? path : "/" + path;

  // الدمج بعلامة + لتفادي أي مشكلة في علامات الـ Template Literals
  return SERVER_ORIGIN + cleanPath;
};