# 🏡 Dream Home Real Estate — Property Listing Page

A responsive, single-page real-estate website for exploring residential properties for sale and rent. The website includes property search and filters, a property comparison section, real-estate service information, and a customer enquiry form.

## 🌐 Live Demo

**[Visit Dream Home Real Estate](https://stoicdarsh.github.io/RealEstateListingPage/)**

## ✨ Features

### Property search and listings
- Hero section with a keyword search field and property-type selector.
- Property cards with images, prices, locations, and property information.
- Filters for **All**, **For Sale**, and **For Rent**.
- Maximum-price slider that adjusts its range according to the selected property type.
- Keyword filtering across property-card text.
- Live result count, empty-results message, and reset controls.
- “View Details” buttons that display a demo alert for the selected property.

### Property comparison
- Property comparison table.
- 3D, Isometric, and Flat viewing modes.
- Controls to switch and reset the table's visual presentation.

### Real-estate services and company information
- About section with company, mission, and vision information.
- Service cards covering buying, selling, rentals and relocation, architectural advisory, legal/RERA/title diligence, commercial real estate, portfolio/NRI asset advisory, and home staging/3D media.
- Services carousel with previous, next, and pause/resume controls.
- “Why Choose Us” section.
- Contact information and frequently asked questions.

### Interactive experience
- Hero video with play/pause and mute/unmute controls.
- Animated property cards and comparison-table interactions.
- Interactive kinetic-grid background.
- Scroll-triggered animations using GSAP and ScrollTrigger.

## 🛠️ Technologies Used

- **HTML5** — page structure and content.
- **CSS3** — styling, responsive layout, and visual effects.
- **JavaScript** — property filtering and interactive features.
- **GSAP 3.12.5 + ScrollTrigger** — scroll-triggered animations.
- **Google Fonts** — Playfair Display and Plus Jakarta Sans.
- **Unsplash and Pexels** — externally hosted images and video assets.

The project does not require a JavaScript package manager or build step.

## 📁 Project Structure

```text
RealEstateListingPage/
├── index.html    # Main webpage structure and content
├── style.css     # Styling, responsive layout, and animations
├── script.js     # Filtering and interactive functionality
└── README.md     # Project documentation
```

The hero video also references a local `assets/hero-mansion.mp4` file, with an externally hosted video source as a fallback.

## 🚀 Getting Started

### Prerequisites
- A modern web browser.
- An internet connection for externally hosted fonts, images, video, and CDN libraries.

### Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/stoicdarsh/RealEstateListingPage.git
   ```

2. Open the project folder:

   ```bash
   cd RealEstateListingPage
   ```

3. Open `index.html` in your browser.

You can also run a local static server from the project folder. For example, with Python installed:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

No `npm install` or build command is needed.

## 🧭 How to Use

1. Open the [live website](https://stoicdarsh.github.io/RealEstateListingPage/).
2. Use the hero search field and property-type selector to narrow the listings.
3. In the property section, filter by sale/rent, adjust the maximum price, or search by keyword.
4. Use **Reset Filters** to restore the default listing view.
5. Explore the property comparison table and switch between its display modes.
6. Browse the services carousel using its navigation and pause/resume controls.
7. Use the contact form to submit a demo enquiry.

## ⚙️ Customization

- **Property listings:** Edit the property-card markup in `index.html`. Keep each card's `data-type` (`sale` or `rent`) and numeric `data-price` attributes consistent with its displayed information; the JavaScript filters use these attributes.
- **Comparison table:** Edit the comparison table content in `index.html` when changing the properties shown.
- **Styling:** Update colors, typography, layout, breakpoints, and visual effects in `style.css`.
- **Interactions:** Update filtering, form handling, video controls, and animations in `script.js`.
- **Media:** Replace image and video sources in `index.html` with your preferred assets.

## 📝 Notes and Limitations

- Property listings and comparison information are static page content; the project does not connect to a property database or live listing API.
- The contact form currently prevents normal form submission, displays a confirmation alert, and resets the form. It does not send enquiries to a server, save them, or email them.
- The “View Details” buttons display a browser alert; they do not open dedicated property-detail pages.
- The website depends on external fonts, images, video, and CDN-hosted GSAP scripts. Some media or animations may not load without an internet connection.
- The page contains legal/RERA-related service descriptions, but it does not perform legal checks or independently verify property information.

## 📄 License

No license file or explicit reuse terms are included in this repository. Add a `LICENSE` file if you intend to distribute the project under a specific open-source license.
