# RecipeExtractor - Extract Recipes from Any URL

A modern, professional web application that extracts recipes from social media platforms and websites, inspired by Recime.app. Built with HTML5, CSS3, and vanilla JavaScript.

![RecipeExtractor Preview](https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800)

## ✨ Features

### 🔗 Universal URL Support
- Extract recipes from Instagram, Pinterest, TikTok, YouTube, Facebook
- Support for thousands of recipe websites
- Intelligent platform detection

### 🤖 AI-Powered Extraction
- Automatically identifies ingredients and instructions
- Extracts cooking time, servings, and difficulty level
- Clean, organized recipe format

### 📱 Modern User Interface
- Responsive design that works on all devices
- Beautiful animations and smooth transitions
- Intuitive navigation and user experience

### 📋 Recipe Management
- Save unlimited recipes locally
- Search and filter functionality
- Edit and delete saved recipes
- Interactive ingredient checklist

### 🔍 Smart Search & Filtering
- Search by recipe title, ingredients, or description
- Filter by cooking time and serving size
- Real-time search results

### 📤 Export & Sharing
- Export recipes to text format
- Share recipes with friends
- Clean, printable format

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd recipe-extractor
   ```

2. **Open the application**
   ```bash
   # Simply open index.html in your browser
   open index.html
   
   # Or serve it locally with Python
   python -m http.server 8000
   
   # Or with Node.js
   npx serve .
   ```

3. **Start extracting recipes!**
   - Paste any recipe URL in the input field
   - Click "Extract Recipe" button
   - Review and save your recipes

## 📖 Usage Guide

### Extracting a Recipe

1. **Find a recipe online**
   - Browse Instagram, Pinterest, TikTok, YouTube, or any recipe website
   - Copy the URL of the recipe post or video

2. **Extract the recipe**
   - Paste the URL in the input field on the homepage
   - Click the "Extract Recipe" button
   - Wait for the AI to analyze and extract the recipe

3. **Review and save**
   - Review the extracted ingredients and instructions
   - Edit if necessary
   - Click "Save Recipe" to add it to your collection

### Managing Your Recipes

1. **View your collection**
   - Click "My Recipes" in the navigation
   - Browse your saved recipes in a grid layout

2. **Search and filter**
   - Use the search bar to find specific recipes
   - Filter by cooking time or serving size
   - Results update in real-time

3. **Recipe actions**
   - Click "View" to see the full recipe
   - Use the delete button to remove recipes
   - Export recipes to text format

### Interactive Features

- **Ingredient checklist**: Click checkboxes while cooking to track progress
- **Step-by-step instructions**: Numbered steps for easy following
- **Recipe metadata**: View cooking time, servings, and difficulty at a glance

## 🏗️ Technical Architecture

### Frontend
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: ES6+ features, modular class-based architecture

### Key Components

```javascript
class RecipeExtractor {
    // Main application class
    // Handles recipe extraction, storage, and UI management
}
```

### Data Storage
- **Local Storage**: Persistent recipe storage in browser
- **JSON Format**: Structured recipe data
- **No external dependencies**: Works offline after initial load

### Responsive Design
- **Mobile-first approach**: Optimized for all screen sizes
- **Touch-friendly**: Large buttons and intuitive gestures
- **Progressive enhancement**: Works on older browsers

## 🎨 Design System

### Color Palette
- **Primary**: #ff6b35 (Orange)
- **Secondary**: #2c3e50 (Dark Blue)
- **Accent**: #3498db (Blue)
- **Success**: #27ae60 (Green)
- **Error**: #e74c3c (Red)

### Typography
- **Font Family**: Inter, system fonts
- **Weights**: 300, 400, 500, 600, 700
- **Responsive scaling**: Fluid typography

### Components
- **Cards**: Recipe cards with hover effects
- **Modals**: Recipe display and editing
- **Forms**: URL input and search
- **Navigation**: Fixed header with smooth scrolling

## 🔧 Customization

### Adding New Platforms

To add support for a new platform, update the `detectPlatform` method:

```javascript
detectPlatform(url) {
    if (url.includes('newplatform.com')) return 'New Platform';
    // ... existing platforms
}
```

### Styling Customization

Modify CSS custom properties in `styles.css`:

```css
:root {
    --primary-color: #your-color;
    --border-radius: 12px;
    /* ... other variables */
}
```

### Adding Export Formats

Extend the `exportRecipe` method to support new formats:

```javascript
exportRecipe(recipeId, format = 'pdf') {
    switch (format) {
        case 'json':
            this.exportToJSON(recipe);
            break;
        // ... other formats
    }
}
```

## 🌟 Planned Features

- [ ] Recipe editing interface
- [ ] PDF export functionality
- [ ] Recipe categories and tags
- [ ] Shopping list generation
- [ ] Nutrition information extraction
- [ ] Recipe sharing via links
- [ ] Dark mode support
- [ ] Voice-guided cooking mode

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use ES6+ JavaScript features
- Follow semantic HTML practices
- Use CSS custom properties for theming
- Comment complex logic
- Test on multiple browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Recime.app](https://www.recime.app/)
- UI components inspired by modern design systems
- Icons by [Font Awesome](https://fontawesome.com/)
- Images from [Unsplash](https://unsplash.com/)

## 📞 Support

If you have any questions or issues:

1. Check the [Issues](../../issues) page
2. Create a new issue if needed
3. Provide detailed information about your problem

---

**Made with ❤️ by a professional web developer**

*Transform your recipe discovery experience with RecipeExtractor!*