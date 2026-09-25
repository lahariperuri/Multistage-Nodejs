import express from "express";

const app = express();

const PORT = 3000;

interface Product {
  name: string;
  price: number;
  emoji: string;
  color: string;
}

const products: Product[] = [
  {
    name: "Cool Sneakers",
    price: 1499,
    emoji: "👟",
    color: "#ff6b6b"
  },
  {
    name: "Smart Watch",
    price: 2499,
    emoji: "⌚",
    color: "#4dabf7"
  },
  {
    name: "Headphones",
    price: 1999,
    emoji: "🎧",
    color: "#845ef7"
  },
  {
    name: "Backpack",
    price: 999,
    emoji: "🎒",
    color: "#20c997"
  },
  {
    name: "Sunglasses",
    price: 799,
    emoji: "🕶️",
    color: "#fcc419"
  },
  {
    name: "Camera",
    price: 3999,
    emoji: "📷",
    color: "#ff922b"
  }
];

app.get("/", (_req, res) => {
  const productCards = products
    .map(
      (product) => `
        <div class="card">

          <div
            class="product-image"
            style="background: ${product.color}"
          >
            ${product.emoji}
          </div>

          <h2>${product.name}</h2>

          <p class="price">
            ₹${product.price}
          </p>

          <button onclick="addToCart('${product.name}')">
            Add to Cart 🛒
          </button>

        </div>
      `
    )
    .join("");

  res.send(`
    <!DOCTYPE html>

    <html>

    <head>

      <title>ColorCart</title>

      <style>

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f5f7ff;
          color: #222;
        }

        header {
          background:
            linear-gradient(
              135deg,
              #6c5ce7,
              #00cec9
            );

          color: white;
          padding: 30px;
          text-align: center;
        }

        header h1 {
          margin: 0;
          font-size: 42px;
        }

        header p {
          font-size: 18px;
        }

        .container {
          max-width: 1100px;
          margin: 40px auto;
          padding: 0 20px;
        }

        .products {
          display: grid;
          grid-template-columns:
            repeat(
              auto-fit,
              minmax(220px, 1fr)
            );

          gap: 25px;
        }

        .card {
          background: white;
          border-radius: 18px;
          padding: 20px;
          text-align: center;

          box-shadow:
            0 8px 20px
            rgba(0,0,0,0.08);

          transition: transform 0.2s;
        }

        .card:hover {
          transform: translateY(-8px);
        }

        .product-image {
          height: 150px;
          border-radius: 15px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 70px;
        }

        .card h2 {
          margin: 20px 0 10px;
        }

        .price {
          font-size: 22px;
          font-weight: bold;
          color: #6c5ce7;
        }

        button {
          border: none;
          padding: 12px 20px;
          border-radius: 25px;

          background: #6c5ce7;
          color: white;

          font-size: 15px;
          cursor: pointer;
        }

        button:hover {
          background: #4834d4;
        }

        footer {
          text-align: center;
          padding: 30px;
          margin-top: 40px;

          background: #2d3436;
          color: white;
        }

      </style>

    </head>

    <body>

      <header>

        <h1>🛍️ ColorCart</h1>

        <p>
          Simple shopping made colorful!
        </p>

      </header>

      <div class="container">

        <h2>✨ Our Products</h2>

        <div class="products">

          ${productCards}

        </div>

      </div>

      <footer>

        <p>
          © 2026 ColorCart | Happy Shopping 🛒
        </p>

      </footer>

      <script>

        function addToCart(product) {

          alert(
            product +
            " added to your cart! 🛒"
          );

        }

      </script>

    </body>

    </html>
  `);
});

app.listen(PORT, () => {
  console.log(
    `ColorCart is running on port ${PORT}`
  );
});
