# Design Document: Kiosk Ordering System

## Overview

The Kiosk Ordering System is a single-page web application (SPA) built with vanilla JavaScript, HTML5, and Tailwind CSS. The system implements a screen-switcher pattern to guide customers through a linear ordering flow from welcome to order completion. The architecture emphasizes simplicity, maintainability, and smooth user experience with animated transitions between screens.

## Architecture

### High-Level Architecture

The application follows a simple client-side MVC-inspired pattern:

```
┌─────────────────────────────────────────┐
│         Single HTML Document            │
│  ┌───────────────────────────────────┐  │
│  │   Screen 1: Welcome               │  │
│  │   Screen 2: Fulfillment Selection │  │
│  │   Screen 3: Menu Browser          │  │
│  │   Screen 4: Checkout Review       │  │
│  │   Screen 5: Payment Gateway       │  │
│  │   Screen 6: Order Success         │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │   JavaScript State Manager        │  │
│  │   - appState (cart, order type)   │  │
│  │   - renderStep(stepNumber)        │  │
│  │   - Event Handlers                │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Technology Stack

- **HTML5**: Semantic markup with section-based screen organization
- **Tailwind CSS (CDN)**: Utility-first styling for rapid UI development
- **Animate.css (CDN)**: Pre-built CSS animations for screen transitions
- **Lucide Icons (CDN)**: Modern icon library for UI elements
- **Vanilla JavaScript (ES6+)**: State management and DOM manipulation

### File Structure

```
/
├── index.html    (Complete SPA - all screens, styles, and scripts)
└── index.js      (Optional: extracted JavaScript if needed)
```

## Components and Interfaces

### 1. State Manager

The central state object maintains all application data:

```javascript
const appState = {
  currentStep: 1,
  orderType: null,        // 'dine-in' | 'take-away'
  cartItems: [],          // Array of {id, name, price, quantity, image}
  totalPrice: 0,
  selectedCategory: 'paket-nasi',
  paymentMethod: 'qris',  // 'qris' | 'manual'
  queueNumber: null
};
```

**Interface Methods:**
- `resetState()`: Resets appState to initial values
- `addToCart(product)`: Adds or increments product in cart
- `updateQuantity(productId, delta)`: Adjusts item quantity (+1 or -1)
- `removeFromCart(productId)`: Removes item when quantity reaches 0
- `calculateTotal()`: Recalculates totalPrice from cartItems

### 2. Screen Switcher

Controls navigation between screens with smooth transitions:

```javascript
function renderStep(stepNumber) {
  // Hide all screens
  // Show target screen with animation
  // Update currentStep in appState
}
```

**Screen Mapping:**
1. Welcome Screen (`#screen-welcome`)
2. Fulfillment Selection (`#screen-fulfillment`)
3. Menu Browser (`#screen-menu`)
4. Checkout Review (`#screen-checkout`)
5. Payment Gateway (`#screen-payment`)
6. Order Success (`#screen-success`)

### 3. Menu Data Structure

Static menu data organized by categories:

```javascript
const menuData = {
  'paket-nasi': [
    { id: 'p1', name: 'Paket Rendang', price: 35000, image: '🍛', category: 'paket-nasi' },
    { id: 'p2', name: 'Paket Ayam Pop', price: 32000, image: '🍗', category: 'paket-nasi' },
    // ...
  ],
  'lauk-pauk': [
    { id: 'l1', name: 'Rendang Daging', price: 25000, image: '🥩', category: 'lauk-pauk' },
    // ...
  ],
  'minuman': [
    { id: 'm1', name: 'Es Teh Manis', price: 5000, image: '🧋', category: 'minuman' },
    // ...
  ],
  'dessert': [
    { id: 'd1', name: 'Es Campur', price: 15000, image: '🍧', category: 'dessert' },
    // ...
  ]
};
```

### 4. Currency Formatter

Formats numbers to Indonesian Rupiah:

```javascript
function formatIDR(amount) {
  return 'Rp ' + amount.toLocaleString('id-ID');
}
```

### 5. Queue Number Generator

Generates random queue numbers:

```javascript
function generateQueueNumber() {
  const letters = 'ABCDEFGH';
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const number = String(Math.floor(Math.random() * 900) + 100);
  return `${letter}-${number}`;
}
```

### 6. UI Renderers

**Cart Counter Renderer:**
```javascript
function updateCartDisplay() {
  // Updates bottom bar with item count and total
  // Enables/disables checkout button based on cart state
}
```

**Menu Grid Renderer:**
```javascript
function renderMenuItems(category) {
  // Filters menuData by category
  // Generates product cards with "Tambah" buttons
  // Injects into DOM
}
```

**Checkout List Renderer:**
```javascript
function renderCheckoutItems() {
  // Iterates through cartItems
  // Creates list items with +/- controls
  // Updates subtotal display
}
```

## Data Models

### Product Model

```javascript
{
  id: string,           // Unique identifier (e.g., 'p1', 'l2')
  name: string,         // Product name (e.g., 'Paket Rendang')
  price: number,        // Price in IDR (e.g., 35000)
  image: string,        // Emoji or image URL
  category: string      // Category key (e.g., 'paket-nasi')
}
```

### Cart Item Model

```javascript
{
  id: string,           // Product ID
  name: string,         // Product name
  price: number,        // Unit price
  quantity: number,     // Number of items
  image: string         // Product image/emoji
}
```

### Order State Model

```javascript
{
  currentStep: number,      // 1-6
  orderType: string|null,   // 'dine-in' | 'take-away' | null
  cartItems: CartItem[],    // Array of cart items
  totalPrice: number,       // Calculated total
  selectedCategory: string, // Active menu category
  paymentMethod: string,    // 'qris' | 'manual'
  queueNumber: string|null  // Generated queue number
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Screen Visibility Exclusivity

*For any* application state, exactly one screen section should be visible at any given time.

**Validates: Requirements 8.1**

### Property 2: Cart Total Consistency

*For any* cart state, the displayed total price should equal the sum of (quantity × price) for all cart items.

**Validates: Requirements 4.3**

### Property 3: Cart Item Uniqueness

*For any* product added to the cart multiple times, the cart should contain only one entry for that product with an incremented quantity, not multiple separate entries.

**Validates: Requirements 4.1**

### Property 4: Quantity Bounds

*For any* cart item, when the quantity is decremented to zero, the item should be removed from the cart entirely.

**Validates: Requirements 5.6**

### Property 5: State Reset Completeness

*For any* completed order, when the "Selesai" button is clicked, all state properties should return to their initial values (empty cart, null orderType, step 1).

**Validates: Requirements 7.6, 7.7**

### Property 6: Currency Format Consistency

*For any* numeric price value, the formatted output should follow the pattern "Rp X.XXX" where periods separate thousands and no decimal places are shown.

**Validates: Requirements 12.1, 12.2, 12.3, 12.4**

### Property 7: Queue Number Format

*For any* generated queue number, it should match the pattern [A-H]-[100-999] (one letter from A-H, hyphen, three-digit number).

**Validates: Requirements 7.3**

### Property 8: Category Filter Correctness

*For any* selected category, the displayed menu items should only include products whose category property matches the selected category.

**Validates: Requirements 3.3**

### Property 9: Checkout Button State

*For any* cart state, the "Lanjut ke Pembayaran" button should be enabled if and only if the cart contains at least one item.

**Validates: Requirements 4.5**

### Property 10: Payment Method Selection

*For any* payment screen state, exactly one payment method should be selected (either QRIS or manual).

**Validates: Requirements 6.4**

## Error Handling

### User Input Validation

- **Empty Cart Checkout**: Disable checkout button when cart is empty
- **Invalid Quantity**: Prevent negative quantities; remove item at zero
- **Missing Selection**: Require fulfillment type before proceeding to menu

### State Consistency

- **Screen Transition Errors**: Validate currentStep is within 1-6 range
- **Cart Calculation Errors**: Ensure totalPrice never becomes negative or NaN
- **Category Selection**: Default to first category if invalid category selected

### UI Feedback

- **Loading States**: Show loading indicator during payment confirmation
- **Button States**: Disable buttons during transitions to prevent double-clicks
- **Visual Feedback**: Use hover states and active states for all interactive elements

### Graceful Degradation

- **CDN Failures**: Include fallback for icon libraries (use text labels)
- **Animation Failures**: Ensure transitions work even if Animate.css fails to load
- **Image Loading**: Use emoji placeholders that always render

## Testing Strategy

### Unit Testing

Unit tests will verify specific examples and edge cases:

1. **Currency Formatting**
   - Test formatIDR(35000) returns "Rp 35.000"
   - Test formatIDR(0) returns "Rp 0"
   - Test formatIDR(1000000) returns "Rp 1.000.000"

2. **Queue Number Generation**
   - Test generateQueueNumber() returns valid format
   - Test letter is within A-H range
   - Test number is within 100-999 range

3. **Cart Operations**
   - Test adding first item creates cart entry
   - Test adding same item increments quantity
   - Test removing item at quantity 1 removes from cart
   - Test empty cart has total of 0

4. **Screen Transitions**
   - Test renderStep(1) shows welcome screen
   - Test renderStep(3) hides all other screens
   - Test invalid step number defaults to step 1

### Property-Based Testing

Property tests will verify universal behaviors across many inputs:

1. **Property Test: Cart Total Calculation**
   - Generate random cart states with various items and quantities
   - Verify calculated total always equals sum of (price × quantity)
   - **Feature: kiosk-ordering-system, Property 2: Cart Total Consistency**

2. **Property Test: Currency Formatting**
   - Generate random positive integers
   - Verify all outputs match "Rp X.XXX" pattern with proper thousand separators
   - **Feature: kiosk-ordering-system, Property 6: Currency Format Consistency**

3. **Property Test: Screen Exclusivity**
   - Generate random step numbers (1-6)
   - Verify exactly one screen has visible class after renderStep()
   - **Feature: kiosk-ordering-system, Property 1: Screen Visibility Exclusivity**

4. **Property Test: State Reset**
   - Generate random cart states with items
   - Call resetState()
   - Verify all properties return to initial values
   - **Feature: kiosk-ordering-system, Property 5: State Reset Completeness**

5. **Property Test: Category Filtering**
   - Generate random category selections
   - Verify all rendered items belong to selected category
   - **Feature: kiosk-ordering-system, Property 8: Category Filter Correctness**

### Testing Framework

- **Unit Tests**: Use browser console or simple test runner
- **Property Tests**: Use fast-check library for JavaScript property-based testing
- **Test Configuration**: Minimum 100 iterations per property test
- **Manual Testing**: Test on tablet-sized viewport (768px-1024px) and desktop (1920px)

### Integration Testing

- Test complete user flow from welcome to order success
- Verify all screen transitions work smoothly
- Test cart persistence across screen changes
- Verify payment confirmation triggers success screen
- Test reset functionality returns to welcome screen

### Visual Testing

- Verify Rumah Gadang motifs appear in all four corners
- Confirm Sederhana Red (#CC0000) used consistently
- Test responsive layout on tablet and desktop viewports
- Verify logo loads correctly from URL
- Confirm animations play smoothly between screens
