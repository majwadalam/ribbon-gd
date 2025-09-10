# Ribbon Admin Template

A modern, Stripe-inspired admin dashboard template built with Next.js, shadcn/ui, and Tailwind CSS.

![Ribbon Dashboard](https://via.placeholder.com/800x400/1f2937/ffffff?text=Ribbon+Dashboard+Template)

## ✨ Features

### 📊 **Complete Dashboard Suite**
- **Main Dashboard**: Comprehensive analytics overview with metrics cards, charts, and activity feeds
- **Dashboard Alternative**: Enhanced layout with progress indicators and different visualizations
- **Analytics & Reports**: Detailed reporting with interactive charts and data export capabilities
- **Data Tables**: Advanced tables with collapsible rows, search, filtering, and sorting

### 🔐 **Authentication Pages**  
- **Login Screen**: Clean authentication form with social login options
- **Multi-step Signup**: Progressive registration flow with form validation
- **Password Recovery**: Complete forgot password workflow

### ⚙️ **Management Interfaces**
- **User Profile**: Comprehensive profile management with avatar upload
- **Settings**: Multi-tab settings interface (Profile, Notifications, Security, Billing, API)
- **Team Management**: User roles, permissions, and team collaboration tools

### 🎨 **Design System**
- **Stripe-Inspired Design**: Clean, modern interface following Stripe's design principles
- **Dark/Light Mode**: Complete theme switching with system preference detection  
- **Responsive Layout**: Mobile-first design that works on all devices
- **Accessible Components**: WCAG compliant components with proper keyboard navigation

### 🛠️ **Developer Experience**
- **shadcn/ui Components**: Full component library with customizable themes
- **TypeScript Support**: Complete type safety throughout the application
- **v0 Integration**: Built-in button to edit templates directly in v0
- **Well-Documented Code**: Comprehensive inline documentation for easy maintenance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ribbon-admin-template.git
   cd ribbon-admin-template
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ribbon-admin-template/
├── app/                        # Next.js App Router
│   ├── analytics/             # Analytics dashboard
│   ├── dashboard-alt/         # Alternative dashboard layout
│   ├── login/                 # Authentication pages
│   ├── settings/              # User settings
│   ├── signup/                # Multi-step registration
│   ├── tables/                # Data tables with advanced features
│   ├── team/                  # Team management
│   ├── globals.css            # Global styles and design tokens
│   ├── layout.tsx             # Root layout with sidebar
│   └── page.tsx               # Main dashboard
├── components/                # Reusable components
│   ├── ui/                    # shadcn/ui components
│   ├── app-sidebar.tsx        # Navigation sidebar
│   ├── header.tsx             # App header with search and user menu
│   ├── theme-provider.tsx     # Theme management
│   └── v0-button.tsx          # v0 integration button
├── lib/                       # Utility functions
│   └── utils.ts               # Helper functions and utilities
└── public/                    # Static assets
```

## 🎨 Customization

### Design Tokens

The template uses CSS custom properties for easy theming. Modify `app/globals.css` to customize:

```css
:root {
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  /* ... more design tokens */
}
```

### Component Customization

All components are built with shadcn/ui and can be easily customized:

```tsx
// Customize button variants in components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // Add your custom variants
      }
    }
  }
)
```

### Adding New Pages

1. Create a new page in the `app/` directory
2. Add navigation link to `components/app-sidebar.tsx`
3. Follow existing page patterns for consistency

## 🧩 Available Components

### Core Components
- **AppSidebar**: Collapsible navigation with grouped sections
- **Header**: Search, notifications, user menu, and theme toggle
- **V0Button**: Direct integration with v0 for template editing

### UI Components (via shadcn/ui)
- Buttons, Cards, Forms, Tables, Dialogs
- Navigation, Tabs, Progress bars
- Charts (Recharts integration)
- And 40+ more components

### Custom Utilities
- **formatCurrency**: Currency formatting
- **formatNumber**: Number formatting with localization
- **debounce**: Function debouncing
- **cn**: Class name utilities

## 📱 Pages Overview

### 🏠 Main Dashboard (`/`)
- Revenue, user, and transaction metrics
- Interactive charts and graphs
- Recent activity feed
- Quick action buttons

### 📊 Dashboard Alternative (`/dashboard-alt`)
- Enhanced metrics with progress indicators
- Tabbed interface (Overview, Performance, Geographic)
- Advanced visualizations
- Quick actions sidebar

### 📈 Analytics (`/analytics`)
- Comprehensive reporting dashboard
- Multi-tab analytics (Overview, Revenue, Users, Performance)
- Exportable reports
- Detailed user and revenue insights

### 📋 Data Tables (`/tables`)
- Advanced data table with collapsible rows
- Search and filter functionality
- Sortable columns
- Row actions (view, edit, delete)
- Export capabilities

### 🔐 Authentication
- **Login** (`/login`): Social auth + email/password
- **Signup** (`/signup`): Multi-step registration process
- Form validation and error handling

### ⚙️ Settings (`/settings`)
Five comprehensive settings tabs:
- **Profile**: User info, avatar, timezone
- **Notifications**: Email and push preferences  
- **Security**: Password, 2FA, active sessions
- **Billing**: Plans, payment methods
- **API**: Key management and documentation

### 👥 Team Management (`/team`)
- Team member directory
- Role-based permissions (Admin, Editor, Viewer)
- Member invitation system
- Activity tracking
- Team statistics

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Required for production
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# Database (optional)
DATABASE_URL=your-database-url

# Analytics (optional) 
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### TypeScript Configuration

The project uses strict TypeScript settings. Customize in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with default settings

### Other Platforms

The template works on any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Docker

### Build Commands

```bash
# Production build
pnpm build

# Start production server
pnpm start

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## 🎯 Use Cases

This template is perfect for:

- **SaaS Admin Panels**: User management, billing, analytics
- **E-commerce Dashboards**: Orders, products, customers
- **Content Management**: Articles, media, user-generated content
- **Analytics Platforms**: Data visualization, reporting
- **Team Collaboration Tools**: Project management, team coordination

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Amazing component library
- [Stripe](https://stripe.com/) - Design inspiration
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Next.js](https://nextjs.org/) - The React framework for production
- [Lucide](https://lucide.dev/) - Beautiful icon library

## 📞 Support

- 📧 **Email**: support@ribbontemplate.com
- 💬 **Discord**: [Join our community](https://discord.gg/ribbon)
- 📖 **Documentation**: [Full docs](https://docs.ribbontemplate.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/ribbon-admin-template/issues)

---

**Built with ❤️ using Next.js, shadcn/ui, and Tailwind CSS**