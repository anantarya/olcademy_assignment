const API_URL = "https://dummyjson.com/products";

export const fetchProducts = async (category) => {
    try {
        const url = category ? `${API_URL}/category/${category}` : API_URL;
        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data.products)) {
            return data.products;
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
};


