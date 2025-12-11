// Declarations for importing CSS side-effect modules used by Swiper
// This prevents TypeScript errors when importing 'swiper/css' and related paths
declare module 'swiper/css';
declare module 'swiper/css/autoplay';
declare module 'swiper/css/pagination';
declare module 'swiper/css/navigation';
// General fallback for any other CSS imports
declare module '*.css';
