const axios = require('axios');

async function validateProducts() {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    
    if (response.status !== 200) {
      console.error(`❌ Error: Expected status 200 but got ${response.status}`);
      return;
    }

    const products = response.data;
    const defectiveProducts = [];

    products.forEach(product => {
      const issues = [];

      if (!product.title || product.title.trim() === "") {
        issues.push("Missing or empty title");
      }

      if (typeof product.price !== "number" || product.price < 0) {
        issues.push("Negative or invalid price");
      }

      if (
        !product.rating ||
        typeof product.rating.rate !== "number" ||
        product.rating.rate > 5
      ) {
        issues.push("Invalid or missing rating.rate");
      }

      if (issues.length > 0) {
        defectiveProducts.push({
          id: product.id,
          title: product.title,
          issues: issues
        });
      }
    });

    if (defectiveProducts.length === 0) {
      console.log("✅ All products passed validation.");
    } else {
      console.log("❌ Defective Products Found:");
      console.log(JSON.stringify(defectiveProducts, null, 2));
    }

  } catch (error) {
    console.error(`❌ Failed to fetch data: ${error.message}`);
  }
}

validateProducts();