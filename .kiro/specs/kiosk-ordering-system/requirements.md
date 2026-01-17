# Requirements Document

## Introduction

This document specifies the requirements for a kiosk-style ordering system for Restoran Sederhana. The system is a single-page web application that guides customers through a step-by-step ordering process, from welcome screen to order completion, with integrated payment options including QRIS.

## Glossary

- **Kiosk_System**: The complete web-based ordering application
- **Screen_Switcher**: The navigation mechanism that controls visibility between different screens
- **Cart_Manager**: The component responsible for managing selected items and quantities
- **Order_State**: The current state of the customer's order including items, fulfillment type, and total
- **QRIS**: Quick Response Code Indonesian Standard, a unified QR payment system
- **Fulfillment_Type**: The method of order completion (Dine In or Take Away)
- **Queue_Number**: A unique identifier assigned to each completed order

## Requirements

### Requirement 1: Welcome Screen Display

**User Story:** As a customer, I want to see an attractive welcome screen when I approach the kiosk, so that I understand this is an ordering system and know how to begin.

#### Acceptance Criteria

1. WHEN the application loads, THE Kiosk_System SHALL display the welcome screen as the initial view
2. THE Kiosk_System SHALL display the Restoran Sederhana logo from the specified URL
3. THE Kiosk_System SHALL display a food background image with reduced opacity for visual appeal
4. THE Kiosk_System SHALL display a prominent "TAP TO START" button with pulsing animation
5. THE Kiosk_System SHALL include subtle Rumah Gadang motif decorations in the four corners
6. WHEN the start button is clicked, THE Kiosk_System SHALL transition to the fulfillment selection screen

### Requirement 2: Fulfillment Type Selection

**User Story:** As a customer, I want to specify whether I'm dining in or taking away, so that the restaurant knows how to prepare my order.

#### Acceptance Criteria

1. WHEN the fulfillment selection screen is displayed, THE Kiosk_System SHALL show two large interactive cards
2. THE Kiosk_System SHALL display a "MAKAN DI SINI" (Dine In) option card
3. THE Kiosk_System SHALL display a "BAWA PULANG" (Take Away) option card
4. WHEN a fulfillment option is selected, THE Order_State SHALL store the selected fulfillment type
5. WHEN a fulfillment option is selected, THE Kiosk_System SHALL transition to the menu screen

### Requirement 3: Menu Navigation and Display

**User Story:** As a customer, I want to browse menu items by category, so that I can easily find what I want to order.

#### Acceptance Criteria

1. WHEN the menu screen is displayed, THE Kiosk_System SHALL show a sidebar with category navigation
2. THE Kiosk_System SHALL display categories including Paket Nasi, Lauk Pauk, Minuman, and Dessert
3. WHEN a category is selected, THE Kiosk_System SHALL display products from that category in a grid layout
4. THE Kiosk_System SHALL display each menu item with an image, name, and price in IDR format
5. THE Kiosk_System SHALL display a "Tambah" button for each menu item
6. THE Kiosk_System SHALL display a bottom bar showing total item count and total price

### Requirement 4: Cart Management

**User Story:** As a customer, I want to add items to my cart and see the running total, so that I know what I'm ordering and how much it costs.

#### Acceptance Criteria

1. WHEN a "Tambah" button is clicked, THE Cart_Manager SHALL add the selected item to the cart
2. WHEN an item is added to the cart, THE Cart_Manager SHALL update the total item count
3. WHEN an item is added to the cart, THE Cart_Manager SHALL recalculate and display the total price
4. THE Cart_Manager SHALL format all prices in Indonesian Rupiah format (e.g., Rp 35.000)
5. WHEN the cart contains at least one item, THE Kiosk_System SHALL enable the "Lanjut ke Pembayaran" button
6. WHEN the "Lanjut ke Pembayaran" button is clicked, THE Kiosk_System SHALL transition to the checkout screen

### Requirement 5: Checkout Review and Modification

**User Story:** As a customer, I want to review my order and adjust quantities before payment, so that I can ensure my order is correct.

#### Acceptance Criteria

1. WHEN the checkout screen is displayed, THE Kiosk_System SHALL show a list of all cart items
2. THE Kiosk_System SHALL display each item with its name, price, and current quantity
3. THE Kiosk_System SHALL provide increment (+) and decrement (-) buttons for each item
4. WHEN the increment button is clicked, THE Cart_Manager SHALL increase the item quantity by one
5. WHEN the decrement button is clicked, THE Cart_Manager SHALL decrease the item quantity by one
6. WHEN an item quantity reaches zero, THE Cart_Manager SHALL remove the item from the cart
7. THE Kiosk_System SHALL display the subtotal with real-time updates as quantities change
8. THE Kiosk_System SHALL provide a button to proceed to payment selection

### Requirement 6: Payment Method Selection

**User Story:** As a customer, I want to choose my payment method, so that I can pay in my preferred way.

#### Acceptance Criteria

1. WHEN the payment screen is displayed, THE Kiosk_System SHALL show available payment methods
2. THE Kiosk_System SHALL display QRIS as a payment option with visual prominence
3. THE Kiosk_System SHALL display "Bayar di Kasir" (Pay at Counter) as a manual payment option
4. THE Kiosk_System SHALL select QRIS as the default payment method
5. WHEN QRIS is selected, THE Kiosk_System SHALL display a QR code placeholder
6. WHEN a payment method is selected, THE Kiosk_System SHALL enable the "Confirm Payment" button
7. WHEN the confirm button is clicked, THE Kiosk_System SHALL display a loading state

### Requirement 7: Order Completion and Queue Number

**User Story:** As a customer, I want to receive confirmation of my order with a queue number, so that I know my order was successful and can track it.

#### Acceptance Criteria

1. WHEN payment is confirmed, THE Kiosk_System SHALL transition to the success screen
2. THE Kiosk_System SHALL display a large success checkmark icon
3. THE Kiosk_System SHALL generate a unique queue number in format [Letter]-[3 digits] (e.g., A-052)
4. THE Kiosk_System SHALL display the generated queue number prominently
5. THE Kiosk_System SHALL display a "Selesai" (Finish) button
6. WHEN the "Selesai" button is clicked, THE Kiosk_System SHALL reset all order state
7. WHEN the "Selesai" button is clicked, THE Kiosk_System SHALL return to the welcome screen

### Requirement 8: Screen Transition Management

**User Story:** As a customer, I want smooth transitions between screens, so that the ordering experience feels polished and professional.

#### Acceptance Criteria

1. THE Screen_Switcher SHALL control visibility of exactly one screen at any time
2. WHEN transitioning between screens, THE Screen_Switcher SHALL apply smooth animations
3. THE Screen_Switcher SHALL use Animate.css classes for transition effects
4. THE Screen_Switcher SHALL maintain a current step state to track the active screen
5. WHEN a screen transition occurs, THE Screen_Switcher SHALL hide the previous screen before showing the next

### Requirement 9: Visual Branding and Theme

**User Story:** As a restaurant owner, I want the kiosk to reflect our brand identity, so that customers recognize our restaurant and feel the traditional Indonesian atmosphere.

#### Acceptance Criteria

1. THE Kiosk_System SHALL use a modern minimalist light theme with white/light gray background
2. THE Kiosk_System SHALL use #CC0000 (Sederhana Red) as the primary color for buttons and highlights
3. THE Kiosk_System SHALL display the Restoran Sederhana logo from the specified URL
4. THE Kiosk_System SHALL include Rumah Gadang (Atap Bagonjong) motif as decorative elements
5. THE Kiosk_System SHALL position traditional motifs subtly in the four corners of screens
6. THE Kiosk_System SHALL maintain consistent branding across all screens

### Requirement 10: Responsive Layout

**User Story:** As a system administrator, I want the kiosk interface to work on different screen sizes, so that it can be deployed on various kiosk hardware and tested on desktops.

#### Acceptance Criteria

1. THE Kiosk_System SHALL render correctly on tablet-sized screens (typical kiosk displays)
2. THE Kiosk_System SHALL render correctly on desktop screens for testing and demonstration
3. THE Kiosk_System SHALL use responsive design techniques to adapt to different viewport sizes
4. THE Kiosk_System SHALL maintain readability and usability across supported screen sizes
5. THE Kiosk_System SHALL ensure touch targets are appropriately sized for tablet interaction

### Requirement 11: State Management

**User Story:** As a developer, I want centralized state management, so that the application maintains data consistency across screens.

#### Acceptance Criteria

1. THE Kiosk_System SHALL maintain a single state object containing all order data
2. THE Order_State SHALL include the cart items array with product details and quantities
3. THE Order_State SHALL include the selected fulfillment type
4. THE Order_State SHALL include the calculated total price
5. WHEN the order is completed, THE Kiosk_System SHALL reset the state to initial values
6. THE Kiosk_System SHALL update the state synchronously when user actions occur

### Requirement 12: Currency Formatting

**User Story:** As a customer, I want to see prices in familiar Indonesian Rupiah format, so that I can easily understand the cost.

#### Acceptance Criteria

1. THE Kiosk_System SHALL format all monetary values in Indonesian Rupiah format
2. THE Kiosk_System SHALL use "Rp" as the currency prefix
3. THE Kiosk_System SHALL use period (.) as the thousands separator
4. THE Kiosk_System SHALL display prices without decimal places (e.g., Rp 35.000 not Rp 35.000,00)
5. WHEN displaying prices, THE Kiosk_System SHALL apply consistent formatting across all screens
