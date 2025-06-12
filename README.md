# 🛍️ Product Listing Interface – Frontend Assessment

This project is a responsive product listing interface built with **Next.js** and **Tailwind CSS**, developed as part of a frontend assessment.

It consumes data from the [Fake Store API](https://fakestoreapi.com/) and demonstrates:

## 🚀 Project Overview

- 📦 **Product Listing**: Products are displayed in a responsive grid with their image, title, price, and rating.
- 🔍 **Filtering**: Users can filter products by category and a price range.
- 🔗 **Routing**: Each product links to a dynamic route showing full product details.
- 📱 **Responsiveness**: Optimized layout for desktop, tablet, and mobile views.
- 🔍 **SEO**: Dynamic titles and meta descriptions using `next/head`, with JSON-LD structured data for products.

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Data Source**: [fakestoreapi.com](https://fakestoreapi.com/)
- **Deployment**: [Vercel](https://ecommerce-sigma-coral.vercel.app/)

### Getting Started

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/AndrewMamdouh/ecommerce.git
    ```

2. Navigate to the project directory:

    ```bash
     cd ecommerce
    ```

3. Install required dependencies:

    ```bash
     pnpm install
    ```

### Available Scripts

-   #### Local Running

    Runs it on local server:

    ```bash
     pnpm run dev
    ```

-   #### Linting

    Checks for linting errors in the codebase:

    ```bash
     pnpm run link:check
    ```

    Fixes linting errors in the codebase:

    ```bash
     pnpm run lint:fix
    ```

-   #### Typings

    Performs type checking:

    ```bash
     pnpm run type:check
    ```