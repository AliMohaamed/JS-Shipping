# JS E-Commerce Website

![E-Commerce Website Banner](https://via.placeholder.com/1200x300)

A fully functional, responsive e-commerce website built with pure HTML, CSS, and Vanilla JavaScript. This project demonstrates modern front-end development techniques without relying on frameworks, showcasing modular code organization and API integration.

## 📋 Features

### Home Page
- Dynamic image slider with product highlights
- Featured products section pulling data from API
- Responsive design that works on mobile, tablet, and desktop devices

### Shop Page
- View 50 products with dynamic data loading
- Advanced filtering system:
  - Filter by categories (fetched dynamically from API)
  - Filter by stock availability
  - Filter by price ranges
- Sorting options:
  - Best Selling
  - Price: Low to High
  - Price: High to Low

### Product Details
- Detailed product information with images and descriptions
- Stock status indicators
- Rating display
- Add to cart functionality

### Shopping Cart
- Complete cart management:
  - Add/remove items
  - Increase/decrease quantity
  - Real-time cart summary and price calculation
- Cart persistence:
  - Guest users: localStorage
  - Logged-in users: Server sync with JSON Server backend
- Checkout protection (requires login)

### Authentication System
- User registration with validation:
  - Name validation
  - Email validation with duplicate prevention
  - Password requirements
  - Password confirmation check
- User login with server authentication
- Session management using localStorage
- Logout functionality

### Additional Features
- Contact page
- Scroll to Top button
- Beautiful custom alert messages (success, warning, error)

## 🛠️ Technical Implementation

### APIs Used
- Products API: `https://dummyjson.com/products`
  - Fetches products, categories, and enables sorting
- JSON Server (local backend):
  - User authentication management
  - Cart data persistence for logged-in users

### Code Features
- Asynchronous JavaScript with async/await pattern
- Fetch API for all data retrieval/submission
- Proper error handling with try/catch blocks
- Modular code organization
- Reusable component architecture
- LocalStorage for client-side persistence
- Dynamic DOM manipulation

## 🚀 Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Node.js and npm (for JSON Server)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AliMohaamed/JS-Shipping
cd JS-Shipping
```

2. Install JSON Server globally:
```bash
npm install -g json-server
```

3. Create a db.json file with the following structure:
```json
{
  "users": [],
  "carts": []
}
```

4. Start JSON Server:
```bash
json-server --watch db.json --port 3000
```

5. Open the project:
   - Option 1: Open index.html directly in your browser
   - Option 2: Use a local development server:
     ```bash
     npx serve
     ```

## 💻 Usage

### Browsing Products
1. Navigate to the Shop page
2. Use the category dropdown to filter by product type
3. Toggle the "In Stock Only" checkbox to see available items
4. Select a price range using the price filter
5. Sort products using the sorting dropdown

### Shopping
1. Click on a product to view details
2. Set quantity and click "Add to Cart"
3. Review your cart on the Cart page
4. Adjust quantities or remove items as needed

### Checkout Process
1. Review your cart
2. Click "Proceed to Checkout"
3. If not logged in, you'll be redirected to the login page
4. After login, complete the checkout process

### Account Management
1. Register a new account via the Registration page
2. Log in using your credentials
3. Your cart will automatically sync between devices when logged in

## 👨‍💻 API Integration

### Products API
The application uses the following endpoints from `https://dummyjson.com/products`:

- `GET /products` - Fetch all products
- `GET /products/categories` - Fetch all categories
- `GET /products/category/{categoryName}` - Filter products by category
- `GET /products/{id}` - Get single product details
- `GET /products?limit=50` - Limit product results
- `GET /products?sort=price` - Sort products by price

### JSON Server API
For user management and cart persistence:

- `GET /users` - Verify login credentials
- `POST /users` - Register new user
- `GET /carts?userId={id}` - Get cart for specific user
- `POST /cart` - Create cart for user
- `PATCH /cart/{id}` - Update user's cart

## 🧪 Testing
The application has been manually tested across multiple browsers and devices to ensure compatibility and responsiveness.

Key user flows tested:
- Product browsing and filtering
- Cart management
- User registration and login
- Checkout process
- Responsive design across device sizes

## 🔮 Future Enhancements
- Payment gateway integration
- User profile management
- Order history
- Wishlist functionality
- Product reviews and ratings
- Admin dashboard for product management

