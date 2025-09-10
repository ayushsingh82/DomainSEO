# domaSEO - No-Code Domain Sales Pages

A Next.js application that allows anyone to create branded, SEO-optimized landing pages for their domain NFTs. Built with real-time data integration from the Doma Protocol orderbook.

## ✨ Features

### 🎨 No-Code Builder
- **Drag-and-drop customization**: Easy-to-use form-based builder
- **Live preview**: See changes in real-time as you customize
- **Custom branding**: Upload logos, set colors, and customize messaging
- **Multiple themes**: Choose from various design templates

### 🔍 SEO Optimized
- **Server-side rendering**: Fast loading and SEO-friendly pages
- **Meta tags**: Automatically generated title, description, and keywords
- **Social cards**: Twitter and OpenGraph preview cards
- **Clean URLs**: Beautiful domain-based URLs for better SEO

### 📊 Real-time Data Integration
- **Doma API integration**: Live pricing and orderbook data
- **Automatic updates**: Real-time listing and offer information
- **Multi-chain support**: Works across different blockchain networks
- **Analytics ready**: Built-in tracking and performance metrics

### 💰 Marketplace Features
- **Buy Now buttons**: Direct integration with orderbook listings
- **Make Offer functionality**: Allow visitors to submit offers
- **Price history**: Display historical sales data
- **Activity feeds**: Show recent listings and offers

## 🚀 Quick Start

### 1. Browse Available Domains
Visit `/domains` to explore available domain NFTs with real-time pricing data.

### 2. Create Your Sales Page
1. Go to `/create` to access the page builder
2. Enter your domain name (e.g., `crypto.eth`)
3. Customize your branding, colors, and messaging
4. Preview your page in real-time
5. Generate your sales page

### 3. Share Your Page
Your generated page will be available at `/domain/{your-domain-name}` with optional customization parameters.

## 📖 API Integration

### Doma Protocol Integration
The application integrates with Doma Protocol APIs:

- **Orderbook API**: Real-time listing and offer data
- **GraphQL Subgraph**: Domain information and statistics
- **Multi-chain support**: Works with Ethereum, Polygon, and other networks

### API Key
The application uses the provided API key:
```
v1.fa2d276a9752ed2ad4ffdd72344c4973af5051bbbeba1e4d393019cdf93bebbd
```

## 🛠 Technical Implementation

### Architecture
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Server-side rendering**: SEO optimization
- **Dynamic routing**: Domain-based page generation

### Key Components
- `DomainSalesPage`: Main sales page component with customization
- `DomaAPI`: Service layer for Doma Protocol integration
- Dynamic routing with `/domain/[domain]/page.tsx`
- Form-based page builder with live preview

### Features Implemented
1. **Domain Search & Browse** (`/domains`)
2. **Page Builder** (`/create`)
3. **Dynamic Sales Pages** (`/domain/[domain]`)
4. **SEO Optimization** (meta tags, social cards)
5. **Real-time Data** (API integration)
6. **Responsive Design** (mobile-friendly)

## 🎯 Use Cases

### For Domain Holders
- Create professional sales pages without coding
- Showcase domain value with real-time data
- Enable easy buying and offer workflows
- Improve domain discoverability through SEO

### For Buyers
- Browse available domains with live pricing
- View comprehensive domain information
- Make offers or purchase directly
- Access professional sales presentations

### For Developers
- API-first architecture for easy integration
- Customizable components and themes
- Real-time data synchronization
- Multi-chain blockchain support

## 🔧 Customization Options

### Branding
- Custom brand name and logo
- Color themes (primary and accent colors)
- Custom headlines and descriptions
- Background images and graphics

### Content
- Show/hide statistics sections
- Show/hide offer history
- Custom call-to-action buttons
- Personalized messaging

### SEO
- Custom meta descriptions
- Domain-specific keywords
- Social media preview cards
- Structured data markup

## 🌐 Example URLs

### Sample Sales Pages
- `/domain/crypto.eth` - Cryptocurrency domain
- `/domain/nft.eth` - NFT marketplace domain  
- `/domain/ai.dom` - AI project domain

### With Customization
```
/domain/crypto.eth?brand=CryptoSales&theme=%236603BF&accent=%23C6FC7B&headline=Own%20the%20Future%20of%20Crypto
```

## 📈 Analytics & Performance

### SEO Benefits
- Server-side rendering for fast indexing
- Optimized meta tags and descriptions
- Clean, semantic HTML structure
- Mobile-responsive design

### Performance
- Fast loading with Next.js optimization
- Cached API responses
- Optimized images and assets
- CDN-ready deployment

## 🔮 Future Enhancements

### Planned Features
- **Advanced Analytics**: Traffic and conversion tracking
- **A/B Testing**: Multiple page variants
- **Integration Marketplace**: Connect with more NFT platforms
- **Template Gallery**: Pre-designed page templates
- **White-label Solutions**: Custom branding for registrars

### Technical Roadmap
- **Wallet Integration**: Direct transaction signing
- **Smart Contract Integration**: On-chain offer management
- **Multi-language Support**: Internationalization
- **Advanced SEO**: Schema markup and rich snippets

---

Built with ❤️ using [Doma Protocol](https://doma.xyz) APIs for real-time domain data and marketplace integration.
