export const API_URL = 
    import.meta.env.PROD ? 
    import.meta.env.VITE_URL_PROD : 
    import.meta.env.VITE_URL_LOCAL
