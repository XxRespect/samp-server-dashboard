# BMMSL Dashboard

A comprehensive dashboard for SAMP (San Andreas Multiplayer) game server management, built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### 🏠 Landing Page
- Modern, responsive design with grey theme
- Roboto font for better typography
- Navigation with icons (Home, About, Admins, Shop, UCP)
- User session management (login/logout)
- Hero section with CTA buttons
- Features showcase with glassmorphism cards

### 📊 Dashboard
- **User Management**: View player statistics, profile information
- **Admin Panel**: Manage server administrators
- **Chat Logs**: Real-time chat monitoring and filtering
- **Player Analytics**: Detailed statistics and charts
- **Ban Management**: View and manage player bans
- **Geolocation**: IP-based location tracking

### 🔐 Authentication
- NextAuth.js integration with credentials provider
- Session management with JWT
- Role-based access control (USER, MODERATOR, ADMIN)
- Secure password hashing with bcrypt

### 🎨 UI/UX
- Dark theme with grey color scheme
- Responsive design for mobile and desktop
- Modern components with shadcn/ui
- Smooth transitions and hover effects
- Loading states and error handling

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: NextAuth.js with credentials provider
- **Database**: Prisma ORM with MySQL/MariaDB
- **Icons**: Lucide React
- **Charts**: Custom chart components
- **Deployment**: Vercel ready

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- MySQL/MariaDB database
- Git

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd samp-dashboard
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/database_name"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Optional: Geolocation API
GEOLOCATION_API_KEY="your-api-key"
```

### 4. Database Setup
```bash
# Run database migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

### 5. Start Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📖 Usage Guide

### 🔑 User Registration & Login
1. Navigate to `/login`
2. Enter your credentials (username and password)
3. Upon successful login, you'll be redirected to `/dashboard`

### 👤 Dashboard Navigation
- **Home**: Overview and statistics
- **Users**: View and manage all players
- **Admins**: Manage server administrators
- **Chat Logs**: Monitor server chat in real-time
- **Profile**: View and edit your profile

### 🔍 Chat Logs Features
- **Search by ID**: Filter by player account ID
- **Search by Name**: Filter by player username
- **Message Filter**: Search within chat messages
- **Pagination**: Navigate through large datasets
- **Real-time Updates**: Live chat monitoring

### 🛡️ Admin Features
- **Role Management**: Assign USER, MODERATOR, ADMIN roles
- **Ban Management**: View and manage player bans
- **IP Tracking**: Monitor player connections
- **Statistics**: View server analytics

## 🏗️ Project Structure

```
app/
├── (auth)/           # Authentication routes
│   ├── login/
│   └── LogOut.action.ts
├── (landing)/        # Landing page
│   ├── page.tsx
│   └── admins/
├── (master)/         # Protected routes
│   ├── users/
│   ├── dashboard/
│   └── admins/
├── api/              # API routes
│   └── ucp/
└── dashboard/         # Dashboard layout
components/
├── ui/               # shadcn/ui components
├── NavBar.tsx
├── appSideBar.tsx
└── AppFooter.tsx
lib/
├── auth.ts           # NextAuth configuration
├── prisma.ts        # Database connection
└── schemas/          # Validation schemas
```

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Database Commands
```bash
npx prisma studio    # Open Prisma Studio
npx prisma migrate   # Run migrations
npx prisma generate  # Generate client
npx prisma db push   # Push schema changes
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm run start
```

## 🔮 Future Roadmap

### Upcoming Features
- [ ] **Real-time Notifications**: WebSocket integration for live updates
- [ ] **Advanced Analytics**: More detailed player statistics
- [ ] **File Upload**: Avatar and file management system
- [ ] **API Documentation**: Swagger/OpenAPI integration
- [ ] **Mobile App**: React Native companion app
- [ ] **Multi-language Support**: Internationalization (i18n)
- [ ] **Backup System**: Automated database backups
- [ ] **Plugin Management**: Server plugin interface

### Potential Improvements
- [ ] **Performance Optimization**: Implement caching strategies
- [ ] **Security Enhancements**: 2FA authentication
- [ ] **Testing**: Unit and integration tests
- [ ] **Monitoring**: Error tracking and performance monitoring
- [ ] **CI/CD Pipeline**: GitHub Actions for deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Join our Discord server (link coming soon)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [shadcn/ui](https://ui.shadcn.com/) - Component Library
- [Prisma](https://www.prisma.io/) - Database ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Lucide](https://lucide.dev/) - Icon Library

---

**Built with ❤️ for the SAMP community**
