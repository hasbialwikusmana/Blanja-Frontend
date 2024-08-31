<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/hasbialwikusmana/Blanja-Frontend" target="_blank">
    <img src="https://github.com/user-attachments/assets/c3e6b400-4cba-4d23-958f-2339700b2e56" alt="Logo" width="100%">
  </a>

  <h3 align="center">Blanja</h3>

  <p align="center">
 Blanja is an online fashion store that offers fashion products.
    <br />
    <a href="https://blanjastore.netlify.app/" target="_blank">View Demo</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

**Blanja** is an online store designed to facilitate the sale of products through the web. The application allows users to browse various products, add products to the catalog, update product information, delete products, and conduct online sales transactions.

This website was developed individually by Hasbi, using React.js, Express.js, and PostgreSQL as the database to store and manage product and transaction information.

## Features

- **User Authentication**: Secure login and registration for both customers and sellers.
- **Product Browsing**: Browse through a variety of fashion products categorized for easy navigation.
- **Search Functionality**: Easily search for products by name, category, or other criteria.
- **Product Details**: Detailed product pages with descriptions, images, and pricing information.
- **Shopping Cart**: Add products to the cart and manage them before proceeding to checkout.
- **Checkout and Payment**: A seamless checkout process with multiple payment options.
- **Order Management**: View and manage orders, track shipping, and receive notifications.
- **Seller Dashboard**: A dedicated dashboard for sellers to manage their products, orders, and profile.
- **Responsive Design**: Optimized for viewing on all devices, ensuring a smooth experience on both mobile and desktop.
<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

This app was built with some technologies below:

- [Vite](https://vitejs.dev/)
- [React js](https://react.dev/)
- [Redux](https://redux.js.org/)
- [React Redux](https://react-redux.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router DOM](https://reactrouter.com/en/main)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Axios](https://axios-http.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [Slick Carousel](https://slick-carousel.netlify.app/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

Before going to the installation stage there are some software that must be installed first.

- [NodeJs](https://nodejs.org/en/download/)

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation

If you want to run this project locally, I recommend you to configure the [back-end](https://github.com/hasbialwikusmana/Blanja-Backend) first before configuring this repo front-end.

- Clone the repo

```
git clone https://github.com/hasbialwikusmana/Blanja-Frontend.git
```

- Go To Folder Repo

```
cd Blanja-Frontend
```

- Install Module

```
npm install
```

- <a href="#setup-env">Setup .env</a>
- Type `npm run dev` to start development server.<br> Open [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

<p align="right">(<a href="#top">back to top</a>)</p>

### Setup .env example

Create .env file in your root project folder.

```
VITE_API_URL = "YOUR_API_URL"
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Screenshoots

<p align="center" style="display: flex; flex-direction: column; align-items: center;">

<table width="100%" style="table-layout: auto;">
  <!-- Row 1 -->
  <tr>
    <td width="50%" style="vertical-align: top;">
      <img src="https://github.com/user-attachments/assets/38e5a5c4-b61b-4bdd-823b-3a50ccaf47d8" alt="Landing Page" width="100%">
    </td>
    <td width="50%" style="vertical-align: top;">
      <img src="https://github.com/user-attachments/assets/fc3326c6-a03a-4862-984d-a94c9815597b" alt="Landing Page After Login" width="100%">
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 10px 0;"><strong>Landing Page</strong></td>
    <td align="center" style="padding: 10px 0;"><strong>Landing Page After Login</strong></td>
  </tr>

  <!-- Row 2 -->
  <tr>
    <td colspan="2">
      <img src="https://github.com/user-attachments/assets/40067f6e-2e12-4e2e-ac5b-4ea7baec2bd5" alt="Login Page" width="100%">
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center" style="padding: 10px 0;"><strong>Login Page</strong></td>
  </tr>

  <!-- Row 3 -->
  <tr>
    <td width="50%" style="vertical-align: top;">
      <img src="https://github.com/user-attachments/assets/0a2f7e8e-7c1b-4cad-a67c-2af4a4a0fcc9" alt="Register Customer Page" width="100%">
    </td>
    <td width="50%" style="vertical-align: top;">
      <img src="https://github.com/user-attachments/assets/4e47ef7b-44b4-403d-a57a-f947545bf262" alt="Register Seller Page" width="100%">
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 10px 0;"><strong>Register Customer</strong></td>
    <td align="center" style="padding: 10px 0;"><strong>Register Seller</strong></td>
  </tr>

  <tr>
    <td width="50%" style="vertical-align: top;">
      <img src="https://github.com/user-attachments/assets/2d3fe87f-974d-4ab3-a62d-41d84c67ee92" alt="Profile Customer" width="100%">
    </td>
    <td width="50%" style="vertical-align: top;">
      <img src="https://github.com/user-attachments/assets/42c12cf6-76ee-43d9-acbd-68f8d6c6abfd" alt="Profile Seller" width="100%">
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 10px 0;"><strong>Profile Customer</strong></td>
    <td align="center" style="padding: 10px 0;"><strong>Profile Seller</strong></td>
  </tr>

  <!-- Row 6 - Detail Worker Page -->
  <tr>
    <td colspan="2">
      <img src="https://github.com/user-attachments/assets/908b42d9-c817-4a14-95c5-b743e184b183" alt="Detail " width="100%">
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center" style="padding: 10px 0;"><strong>Detail Product</strong></td>
  </tr>

  <!-- Row 7 - Edit Profile Worker Page -->
  <tr>
    <td colspan="2">
      <img src="https://github.com/user-attachments/assets/f62e395f-4d29-4ec0-a14a-69567a31067f" alt="Category" width="100%">
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center" style="padding: 10px 0;"><strong>Category</strong></td>
  </tr>

  <!-- Row 8 -->
  <tr>
  <td width="50%" style="vertical-align: top;">
    <img src="https://github.com/user-attachments/assets/09f013ec-eea2-4bed-b359-42171105a80c" alt="Edit Product" width="100%">
  </td>
  <td width="50%" style="vertical-align: top;">
    <img src="https://github.com/user-attachments/assets/e257e0ab-5d78-4a21-9875-b8bf86b9cdf5" alt="My Order Seller" width="100%">
  </td>
</tr>
<tr>
  <td align="center" style="padding: 10px 0;"><strong>Edit Product</strong></td>
  <td align="center" style="padding: 10px 0;"><strong>My Order Seller</strong></td>
</tr>

<tr>
  <td width="50%" style="vertical-align: top;">
    <img src="https://github.com/user-attachments/assets/dfb7c5b4-d9fa-4756-bbfb-fde357b00905" alt="Selling Product" width="100%">
  </td>
  <td width="50%" style="vertical-align: top;">
    <img src="https://github.com/user-attachments/assets/28153a2f-ba65-4a0a-a98e-ee5720fb569f" alt="My Product Seller" width="100%">
  </td>
</tr>
<tr>
  <td align="center" style="padding: 10px 0;"><strong>Selling Product</strong></td>
  <td align="center" style="padding: 10px 0;"><strong>My Product Seller</strong></td>
</tr>

<tr>
  <td width="50%" style="vertical-align: top;">
    <img src="https://github.com/user-attachments/assets/c56f970c-8ca0-49c3-8492-422b6132a2ea" alt="Order Detail" width="100%">
  </td>
  <td width="50%" style="vertical-align: top;">
    <img src="https://github.com/user-attachments/assets/19733e3b-ffc5-4dc9-b272-2c90577c85b3" alt="Payment" width="100%">
  </td>
</tr>
<tr>
  <td align="center" style="padding: 10px 0;"><strong>Order Detail</strong></td>
  <td align="center" style="padding: 10px 0;"><strong>Payment</strong></td>
</tr>

<tr>
  <td width="50%" style="vertical-align: top;">
    <img src="https://github.com/user-attachments/assets/72670088-df79-446e-9b32-165b52ff2bd7" alt="Checkout" width="100%">
  </td>
  <td width="50%" style="vertical-align: top;">
    <img src="https://github.com/user-attachments/assets/591886f5-9aa3-4c9d-a050-6ec29dfaf13f" alt="My Bag" width="100%">
  </td>
</tr>
<tr>
  <td align="center" style="padding: 10px 0;"><strong>Checkout</strong></td>
  <td align="center" style="padding: 10px 0;"><strong>My Bag</strong></td>
</tr>

<tr>
  <td width="50%" style="vertical-align: top;">
    <img src="https://github.com/user-attachments/assets/63bdb31b-5481-4478-952c-43458bc0278e" alt="My Order Customer" width="100%">
  </td>
  <td width="50%" style="vertical-align: top;">
    <img src="https://github.com/user-attachments/assets/28a28347-ce57-47ed-91ed-5ec6c1318989" alt="Shipping Address Customer" width="100%">
  </td>
</tr>
<tr>
  <td align="center" style="padding: 10px 0;"><strong>My Order Customer</strong></td>
  <td align="center" style="padding: 10px 0;"><strong>Shipping Address Customer</strong></td>
</tr>

</table>

</p>

<p align="right">(<a href="#top">back to top</a>)</p>

## Related Project

:rocket: [`Backend Blanja`](https://github.com/hasbialwikusmana/Blanja-Backend)

:rocket: [`Frontend Blanja`](https://github.com/hasbialwikusmana/Blanja-Frontend)

:rocket: [`Web Service`](https://blanja-backend.vercel.app/)

:rocket: [`Demo Blanja`](https://blanjastore.netlify.app/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

Email : [hasbialwi70@gmail.com](mailto:hasbialwi70@gmail.com)

Project Link : [https://github.com/hasbialwikusmana/Blanja-Frontend](https://github.com/hasbialwikusmana/Blanja-Frontend)

<p align="right">(<a href="#top">back to top</a>)</p>
