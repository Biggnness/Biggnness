// Recipe Extractor App JavaScript

class RecipeExtractor {
    constructor() {
        this.recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        this.currentRecipe = null;
        this.isEditing = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadRecipes();
        this.updateRecipeCount();
        this.setupNavigation();
    }

    bindEvents() {
        // URL extraction
        document.getElementById('extractBtn').addEventListener('click', () => this.extractRecipe());
        document.getElementById('recipeUrl').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.extractRecipe();
        });

        // Modal controls
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        document.getElementById('saveRecipeBtn').addEventListener('click', () => this.saveRecipe());
        document.getElementById('editRecipeBtn').addEventListener('click', () => this.editRecipe());

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Search and filter
        document.getElementById('searchRecipes').addEventListener('input', (e) => this.searchRecipes(e.target.value));
        document.getElementById('filterTime').addEventListener('change', (e) => this.filterRecipes());
        document.getElementById('filterServings').addEventListener('change', (e) => this.filterRecipes());

        // New cookbook
        document.querySelector('.new-cookbook-card').addEventListener('click', () => this.createNewRecipe());

        // Close modal on backdrop click
        document.getElementById('recipeModal').addEventListener('click', (e) => {
            if (e.target.id === 'recipeModal') this.closeModal();
        });

        // Close loading overlay on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideLoading();
                this.closeModal();
            }
        });
    }

    setupNavigation() {
        // Handle initial navigation based on hash
        const hash = window.location.hash;
        if (hash === '#my-recipes') {
            this.showMyRecipes();
        } else {
            this.showHome();
        }
    }

    handleNavigation(e) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');

        // Show appropriate section
        if (href === '#my-recipes') {
            this.showMyRecipes();
        } else {
            this.showHome();
        }

        // Update URL hash
        window.location.hash = href;
    }

    showHome() {
        document.getElementById('home').style.display = 'flex';
        document.getElementById('my-recipes').classList.add('hidden');
    }

    showMyRecipes() {
        document.getElementById('home').style.display = 'none';
        document.getElementById('my-recipes').classList.remove('hidden');
        this.loadRecipes();
    }

    async extractRecipe() {
        const url = document.getElementById('recipeUrl').value.trim();
        
        if (!url) {
            this.showError('Please enter a valid URL');
            return;
        }

        if (!this.isValidUrl(url)) {
            this.showError('Please enter a valid URL');
            return;
        }

        this.showLoading();
        
        try {
            // Simulate recipe extraction (replace with actual API call)
            const recipe = await this.mockExtractRecipe(url);
            this.hideLoading();
            this.showRecipeModal(recipe);
        } catch (error) {
            this.hideLoading();
            this.showError('Failed to extract recipe. Please try again.');
            console.error('Recipe extraction error:', error);
        }
    }

    async mockExtractRecipe(url) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock recipe data based on URL platform
        const platform = this.detectPlatform(url);
        const recipes = this.getMockRecipes();
        const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
        
        return {
            ...randomRecipe,
            sourceUrl: url,
            platform: platform,
            extractedAt: new Date().toISOString()
        };
    }

    getMockRecipes() {
        return [
            {
                title: "Creamy Garlic Pasta",
                description: "A quick and delicious pasta dish with a creamy garlic sauce",
                image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400",
                cookTime: 25,
                prepTime: 10,
                servings: 4,
                difficulty: "Easy",
                cuisine: "Italian",
                ingredients: [
                    "400g spaghetti",
                    "4 cloves garlic, minced",
                    "1 cup heavy cream",
                    "1/2 cup parmesan cheese, grated",
                    "2 tbsp olive oil",
                    "Salt and pepper to taste",
                    "Fresh parsley for garnish"
                ],
                instructions: [
                    "Cook spaghetti according to package directions until al dente",
                    "Heat olive oil in a large pan over medium heat",
                    "Add minced garlic and cook for 1-2 minutes until fragrant",
                    "Pour in heavy cream and simmer for 3-4 minutes",
                    "Add cooked pasta and toss to combine",
                    "Stir in parmesan cheese and season with salt and pepper",
                    "Garnish with fresh parsley and serve immediately"
                ]
            },
            {
                title: "Chocolate Chip Cookies",
                description: "Classic homemade chocolate chip cookies that are crispy on the outside and chewy inside",
                image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
                cookTime: 12,
                prepTime: 15,
                servings: 24,
                difficulty: "Easy",
                cuisine: "American",
                ingredients: [
                    "2 1/4 cups all-purpose flour",
                    "1 tsp baking soda",
                    "1 tsp salt",
                    "1 cup butter, softened",
                    "3/4 cup granulated sugar",
                    "3/4 cup brown sugar",
                    "2 large eggs",
                    "2 tsp vanilla extract",
                    "2 cups chocolate chips"
                ],
                instructions: [
                    "Preheat oven to 375°F (190°C)",
                    "In a bowl, whisk together flour, baking soda, and salt",
                    "In another bowl, cream together butter and both sugars",
                    "Beat in eggs one at a time, then vanilla",
                    "Gradually mix in flour mixture",
                    "Fold in chocolate chips",
                    "Drop rounded tablespoons of dough onto baking sheets",
                    "Bake for 9-11 minutes until golden brown",
                    "Cool on baking sheet for 5 minutes before transferring"
                ]
            },
            {
                title: "Asian Stir-Fry Vegetables",
                description: "A colorful and healthy vegetable stir-fry with Asian flavors",
                image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
                cookTime: 15,
                prepTime: 20,
                servings: 4,
                difficulty: "Medium",
                cuisine: "Asian",
                ingredients: [
                    "2 tbsp vegetable oil",
                    "1 bell pepper, sliced",
                    "1 broccoli head, cut into florets",
                    "1 carrot, julienned",
                    "1 zucchini, sliced",
                    "3 cloves garlic, minced",
                    "1 tbsp fresh ginger, grated",
                    "3 tbsp soy sauce",
                    "1 tbsp sesame oil",
                    "1 tsp honey",
                    "2 green onions, chopped",
                    "Sesame seeds for garnish"
                ],
                instructions: [
                    "Heat vegetable oil in a large wok or skillet over high heat",
                    "Add garlic and ginger, stir-fry for 30 seconds",
                    "Add harder vegetables (broccoli, carrots) first, cook 3-4 minutes",
                    "Add softer vegetables (bell pepper, zucchini), cook 2-3 minutes",
                    "In a small bowl, mix soy sauce, sesame oil, and honey",
                    "Pour sauce over vegetables and toss to coat",
                    "Cook for another 1-2 minutes until vegetables are tender-crisp",
                    "Garnish with green onions and sesame seeds before serving"
                ]
            }
        ];
    }

    detectPlatform(url) {
        if (url.includes('instagram.com')) return 'Instagram';
        if (url.includes('pinterest.com')) return 'Pinterest';
        if (url.includes('tiktok.com')) return 'TikTok';
        if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
        if (url.includes('facebook.com')) return 'Facebook';
        return 'Website';
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    showLoading() {
        document.getElementById('loadingOverlay').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingOverlay').classList.add('hidden');
    }

    showError(message) {
        // Create a simple toast notification
        const toast = document.createElement('div');
        toast.className = 'toast error';
        toast.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        
        // Add toast styles if not already present
        if (!document.querySelector('#toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = `
                .toast {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: white;
                    padding: 16px 24px;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    z-index: 10001;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    animation: slideInRight 0.3s ease-out;
                }
                .toast.error {
                    border-left: 4px solid #e74c3c;
                    color: #e74c3c;
                }
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    showRecipeModal(recipe) {
        this.currentRecipe = recipe;
        document.getElementById('recipeDisplay').innerHTML = this.generateRecipeHTML(recipe);
        document.getElementById('recipeModal').classList.remove('hidden');
        this.bindIngredientCheckboxes();
    }

    generateRecipeHTML(recipe) {
        return `
            <div class="recipe-display">
                <div class="recipe-main">
                    <div class="recipe-header">
                        <h1 class="recipe-title">${recipe.title}</h1>
                        <div class="recipe-source">
                            Extracted from <a href="${recipe.sourceUrl}" target="_blank">${recipe.platform}</a>
                        </div>
                        <div class="recipe-meta-grid">
                            <div class="recipe-meta-item">
                                <i class="fas fa-clock"></i>
                                <span class="value">${recipe.prepTime + recipe.cookTime}</span>
                                <span class="label">Total Time</span>
                            </div>
                            <div class="recipe-meta-item">
                                <i class="fas fa-fire"></i>
                                <span class="value">${recipe.cookTime}</span>
                                <span class="label">Cook Time</span>
                            </div>
                            <div class="recipe-meta-item">
                                <i class="fas fa-users"></i>
                                <span class="value">${recipe.servings}</span>
                                <span class="label">Servings</span>
                            </div>
                            <div class="recipe-meta-item">
                                <i class="fas fa-signal"></i>
                                <span class="value">${recipe.difficulty}</span>
                                <span class="label">Difficulty</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="recipe-instructions">
                        <h3><i class="fas fa-list-ol"></i> Instructions</h3>
                        ${recipe.instructions.map((instruction, index) => `
                            <div class="instruction-step">
                                <div class="step-number">${index + 1}</div>
                                <div class="step-text">${instruction}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="recipe-sidebar">
                    ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.title}" style="width: 100%; border-radius: 12px; margin-bottom: 24px;">` : ''}
                    
                    <div class="ingredients-list">
                        <h3><i class="fas fa-shopping-list"></i> Ingredients</h3>
                        ${recipe.ingredients.map((ingredient, index) => `
                            <div class="ingredient-item" data-index="${index}">
                                <div class="ingredient-checkbox"></div>
                                <span class="ingredient-text">${ingredient}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    bindIngredientCheckboxes() {
        document.querySelectorAll('.ingredient-checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', function() {
                this.classList.toggle('checked');
                const item = this.closest('.ingredient-item');
                item.classList.toggle('checked');
            });
        });
    }

    closeModal() {
        document.getElementById('recipeModal').classList.add('hidden');
        this.currentRecipe = null;
        this.isEditing = false;
    }

    saveRecipe() {
        if (!this.currentRecipe) return;

        // Generate unique ID
        const recipeId = Date.now().toString();
        const recipeToSave = {
            ...this.currentRecipe,
            id: recipeId,
            savedAt: new Date().toISOString()
        };

        this.recipes.push(recipeToSave);
        this.saveToLocalStorage();
        this.updateRecipeCount();
        this.closeModal();
        
        // Clear the URL input
        document.getElementById('recipeUrl').value = '';
        
        // Show success message
        this.showSuccess('Recipe saved successfully!');
        
        // If we're on the recipes page, reload the view
        if (!document.getElementById('my-recipes').classList.contains('hidden')) {
            this.loadRecipes();
        }
    }

    showSuccess(message) {
        const toast = document.createElement('div');
        toast.className = 'toast success';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        // Add success styles
        if (!document.querySelector('#success-styles')) {
            const style = document.createElement('style');
            style.id = 'success-styles';
            style.textContent = `
                .toast.success {
                    border-left: 4px solid #27ae60;
                    color: #27ae60;
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    editRecipe() {
        // For now, just show an alert - full editing feature can be implemented
        alert('Recipe editing feature coming soon! You can delete and re-extract for now.');
    }

    createNewRecipe() {
        // Scroll to top and focus on URL input
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            document.getElementById('recipeUrl').focus();
        }, 500);
    }

    loadRecipes() {
        const container = document.getElementById('recipesContainer');
        if (!container) return;

        container.innerHTML = '';

        if (this.recipes.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <i class="fas fa-utensils" style="font-size: 48px; color: var(--text-muted); margin-bottom: 16px;"></i>
                    <h3 style="margin-bottom: 8px;">No recipes yet</h3>
                    <p style="color: var(--text-secondary);">Start by extracting your first recipe from a URL</p>
                </div>
            `;
            return;
        }

        this.recipes.forEach(recipe => {
            const recipeCard = this.createRecipeCard(recipe);
            container.appendChild(recipeCard);
        });
    }

    createRecipeCard(recipe) {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <div class="recipe-card-image" ${recipe.image ? `style="background-image: url('${recipe.image}')"` : ''}>
                ${!recipe.image ? '<i class="fas fa-utensils"></i>' : ''}
            </div>
            <div class="recipe-card-content">
                <h3 class="recipe-card-title">${recipe.title}</h3>
                <div class="recipe-card-meta">
                    <span><i class="fas fa-clock"></i> ${recipe.prepTime + recipe.cookTime}m</span>
                    <span><i class="fas fa-users"></i> ${recipe.servings}</span>
                </div>
                <p class="recipe-card-description">${recipe.description || 'No description available'}</p>
                <div style="margin-top: 12px; display: flex; gap: 8px;">
                    <button class="btn-secondary" style="flex: 1; padding: 8px 12px; font-size: 12px;" onclick="recipeApp.viewRecipe('${recipe.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn-secondary" style="padding: 8px 12px; font-size: 12px;" onclick="recipeApp.deleteRecipe('${recipe.id}')" title="Delete recipe">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    viewRecipe(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (recipe) {
            this.showRecipeModal(recipe);
        }
    }

    deleteRecipe(recipeId) {
        if (confirm('Are you sure you want to delete this recipe?')) {
            this.recipes = this.recipes.filter(r => r.id !== recipeId);
            this.saveToLocalStorage();
            this.updateRecipeCount();
            this.loadRecipes();
            this.showSuccess('Recipe deleted successfully!');
        }
    }

    searchRecipes(query) {
        const container = document.getElementById('recipesContainer');
        if (!container) return;

        const filteredRecipes = this.recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(query.toLowerCase()) ||
            recipe.description.toLowerCase().includes(query.toLowerCase()) ||
            recipe.ingredients.some(ingredient => 
                ingredient.toLowerCase().includes(query.toLowerCase())
            )
        );

        this.displayFilteredRecipes(filteredRecipes);
    }

    filterRecipes() {
        const timeFilter = document.getElementById('filterTime').value;
        const servingsFilter = document.getElementById('filterServings').value;
        const searchQuery = document.getElementById('searchRecipes').value.toLowerCase();

        let filteredRecipes = this.recipes;

        // Apply search filter
        if (searchQuery) {
            filteredRecipes = filteredRecipes.filter(recipe =>
                recipe.title.toLowerCase().includes(searchQuery) ||
                recipe.description.toLowerCase().includes(searchQuery) ||
                recipe.ingredients.some(ingredient => 
                    ingredient.toLowerCase().includes(searchQuery)
                )
            );
        }

        // Apply time filter
        if (timeFilter) {
            filteredRecipes = filteredRecipes.filter(recipe => {
                const totalTime = recipe.prepTime + recipe.cookTime;
                switch (timeFilter) {
                    case 'quick': return totalTime < 30;
                    case 'medium': return totalTime >= 30 && totalTime <= 60;
                    case 'long': return totalTime > 60;
                    default: return true;
                }
            });
        }

        // Apply servings filter
        if (servingsFilter) {
            filteredRecipes = filteredRecipes.filter(recipe => {
                switch (servingsFilter) {
                    case '1-2': return recipe.servings <= 2;
                    case '3-4': return recipe.servings >= 3 && recipe.servings <= 4;
                    case '5+': return recipe.servings >= 5;
                    default: return true;
                }
            });
        }

        this.displayFilteredRecipes(filteredRecipes);
    }

    displayFilteredRecipes(recipes) {
        const container = document.getElementById('recipesContainer');
        container.innerHTML = '';

        if (recipes.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <i class="fas fa-search" style="font-size: 48px; color: var(--text-muted); margin-bottom: 16px;"></i>
                    <h3 style="margin-bottom: 8px;">No recipes found</h3>
                    <p style="color: var(--text-secondary);">Try adjusting your search or filters</p>
                </div>
            `;
            return;
        }

        recipes.forEach(recipe => {
            const recipeCard = this.createRecipeCard(recipe);
            container.appendChild(recipeCard);
        });
    }

    updateRecipeCount() {
        const countElement = document.getElementById('recipesUsed');
        if (countElement) {
            countElement.textContent = this.recipes.length;
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('recipes', JSON.stringify(this.recipes));
    }

    // Export functionality
    exportRecipe(recipeId, format = 'pdf') {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (!recipe) return;

        switch (format) {
            case 'pdf':
                this.exportToPDF(recipe);
                break;
            case 'text':
                this.exportToText(recipe);
                break;
            default:
                console.error('Unsupported export format');
        }
    }

    exportToPDF(recipe) {
        // This would require a PDF library like jsPDF
        alert('PDF export feature coming soon!');
    }

    exportToText(recipe) {
        const text = `
${recipe.title}

Description: ${recipe.description}
Prep Time: ${recipe.prepTime} minutes
Cook Time: ${recipe.cookTime} minutes
Servings: ${recipe.servings}
Difficulty: ${recipe.difficulty}

Ingredients:
${recipe.ingredients.map(ingredient => `• ${ingredient}`).join('\n')}

Instructions:
${recipe.instructions.map((instruction, index) => `${index + 1}. ${instruction}`).join('\n')}

Source: ${recipe.sourceUrl}
        `.trim();

        // Create download
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${recipe.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Initialize the app
const recipeApp = new RecipeExtractor();

// Make some functions globally available for onclick handlers
window.recipeApp = recipeApp;