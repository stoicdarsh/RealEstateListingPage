# Dream Home Real Estate — Property Listing Page

A responsive, single-page real-estate website for **Dream Home Real Estate**. The page presents residential properties for sale and rent, lets visitors filter and compare listings, showcases services, and provides an enquiry form.

The project is built with plain HTML, CSS, and JavaScript. It is a front-end demonstration: property data is written directly into the HTML, and the enquiry form displays a confirmation message in the browser rather than sending data to a server.

## Features

### Property discovery
- Hero section with quick property search and a property-type selector.
- Property listing cards with images, prices, locations, bedroom counts, and sale/rent labels.
- Listing filters for **All**, **For Sale**, and **For Rent**.
- Maximum-price slider whose range and display adapt to the selected property type.
- Keyword search across the listing card text.
- Results count, empty-results message, and reset controls.
- “View Details” buttons that show a browser alert with the selected property name and price.

### Property comparison
- Comparison table for the properties represented in the page.
- Filters for viewing all, sale, or rental properties.
- Animated 3D table presentation with Dynamic, Isometric, and Flat modes, plus a reset control.
- Enquiry shortcuts that prefill the contact form with the selected property and enquiry details.

### Services and company information
- About, mission, and vision content.
- Specialized real-estate service cards, including buying, selling, rentals, advisory, legal/title diligence, commercial real estate, portfolio support, and home staging/media.
- Automatically scrolling services carousel with previous/next controls and pause/resume.
- “Why Choose Us” section highlighting the agency's stated service commitments.
- Contact information and FAQ content.

### Enquiry and visual interactions
- Contact form with name, email, phone, property type, budget, location, message, and terms fields.
- Client-side form handling with a confirmation alert; no server submission is configured.
- Hero video play/pause and mute/unmute controls.
- Hover-based card tilt, animated comparison-table tilt, and an interactive kinetic grid background.
- Scroll-triggered entrance animations when the GSAP libraries are available.

## Tech stack

- **HTML5** — page structure and content.
- **CSS3** — layout, responsive styling, visual effects, and animations.
- **Vanilla JavaScript** — filtering, form interactions, sliders, and UI behavior.
- **GSAP 3.12.5 + ScrollTrigger** — optional scroll-triggered animations, loaded from cdnjs.
- **Google Fonts** — Playfair Display and Plus Jakarta Sans.
- **Unsplash** — externally hosted property imagery.

There is no package manager, build step, framework, or local backend in the supplied project.

## Project structure

```text
RealEstateListingPage/
├── index.html    # Single-page website markup and listing content
├── style.css     # Styling, responsive layout, and visual effects
├── script.js     # Filtering and interactive behavior
└── README.md     # Project documentation
```

## Getting started

### Requirements
- A modern web browser.
- An internet connection for externally hosted fonts, images, video, and CDN libraries.

### Run locally

1. Download or clone the project.
2. Open the `RealEstateListingPage` folder.
3. Open `index.html` in a web browser.

Alternatively, serve the folder with a local static web server. For example, if Python is installed:

```bash
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000) in your browser. Run the command from inside the project folder.

No `npm install`, compilation, or build command is required.

## Using the page

1. Use the hero search field to enter a keyword and choose **All**, **For Sale**, or **For Rent**.
2. Select **Explore Collection** to jump to the property listings with the chosen type applied.
3. In the listings section, choose a property type, adjust the maximum-price slider, or enter a keyword. Use **Reset Filters** to restore the default view.
4. Select **View Details** on a listing to see its current demo alert.
5. Explore the comparison section using its type filters and tilt-mode controls.
6. Use the services carousel arrows or pause/resume control to navigate the service cards.
7. Submit the contact form to see the client-side confirmation message.

## Customization

- **Property listings:** Edit the property card markup in `index.html`. Keep each card's `data-type` (`sale` or `rent`) and numeric `data-price` attributes in sync with the displayed listing; the filters depend on these values.
- **Comparison data:** Update the comparison table rows in `index.html` when adding, removing, or changing properties.
- **Styling:** Modify colors, typography, layout, breakpoints, and effects in `style.css`.
- **Interactions:** Modify filtering, slider behavior, form handling, and animations in `script.js`.
- **External media:** Replace the external image/video URLs in `index.html` if you want to use different media.

## Important implementation notes

- The listings and comparison information are static HTML content; there is no property database or live listing API.
- The contact form currently prevents the browser's default submission and displays an alert. It does **not** send enquiries, store submissions, or connect to an email service. A backend or form service must be integrated for production use.
- The “View Details” interaction is also a demonstration alert, not a property detail page or booking workflow.
- Images, fonts, the hero video, and GSAP scripts are referenced externally. They may not load without an internet connection, and availability is controlled by their respective providers.
- The website's RERA/legal-related copy is page content; the project does not implement legal verification or independently validate property claims.
- The page uses Indian rupee pricing and includes example locations such as Lucknow and Kanpur in its listing content.

## License

No license file or explicit reuse terms are included in the supplied project. Add a `LICENSE` file if you intend to distribute the project under a particular open-source license.
