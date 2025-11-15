# AI Carousel Maker - Setup Instructions

## Prerequisites

- Node.js 18+ installed
- A Supabase account
- OpenAI API key or Anthropic API key

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your credentials
3. Run the SQL schema from `lib/supabase/schema.sql` in your Supabase SQL Editor
4. Enable Google OAuth:
   - Go to Authentication > Providers
   - Enable Google provider
   - Add your Google OAuth credentials
   - Add authorized redirect URL: `http://localhost:3000/auth/callback`

### 3. Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Fill in your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI (choose one)
OPENAI_API_KEY=your_openai_api_key

# OR Anthropic Claude
ANTHROPIC_API_KEY=your_anthropic_api_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features Implemented

### ✅ Landing Page
- Hero section with Google login
- Feature showcase
- 12 template previews
- CTA sections

### ✅ Authentication
- Google OAuth integration
- Protected routes
- Session management

### ✅ AI Input Panel
- Topic and description input
- Target audience customization
- Tone selection (simple, friendly, expert, emotional, corporate)
- Slide count control (6-10 slides)
- Template selection
- Intro style options
- Hook and CTA toggles

### ✅ Canvas Editor
- Fabric.js-powered canvas
- Real-time editing
- Inline text editing
- Drag and drop
- Text formatting (bold, alignment)
- AI rewrite tools (shorter, longer, simple, punchy, clearer, professional)

### ✅ Template System
- 12 professionally designed templates
- 4 style categories:
  - AI Carousels (curves, gradients, abstract)
  - Content Drips (minimal, clean)
  - Carousel Maker (structured grid)
  - Post Nitro (bold, modern)
- Custom color schemes
- Font pairings
- Background patterns

### ✅ Brand Kit
- Save brand colors and fonts
- Apply brand kit to carousels
- Persistent storage in Supabase

### ✅ Export System
- PNG export
- JPG export
- PDF export (all slides)
- ZIP export (all slides as PNG)
- Quality control
- Aspect ratio options (4:5, 1:1)

### ✅ Autosave & Drafts
- Auto-save every 10 seconds
- Draft storage in Supabase
- Version history via undo/redo

### ✅ Slide Management
- Add/delete/duplicate slides
- Reorder slides
- Slide navigation
- Thumbnail previews
- Slide counter with customizable styles

## Project Structure

```
carousel/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   │   ├── generate/      # AI carousel generation
│   │   └── rewrite/       # AI text rewrite
│   ├── editor/            # Editor page
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── editor/           # Editor components
│   ├── landing/          # Landing page components
│   └── providers/        # Context providers
├── lib/                   # Utilities
│   ├── supabase/         # Supabase config
│   ├── templates.ts      # Template definitions
│   └── utils.ts          # Helper functions
├── store/                 # Zustand stores
│   ├── authStore.ts      # Authentication state
│   └── carouselStore.ts  # Carousel state
├── types/                 # TypeScript types
└── hooks/                 # Custom React hooks

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Canvas**: Fabric.js
- **State**: Zustand
- **Database**: Supabase
- **Auth**: Supabase Auth (Google OAuth)
- **AI**: OpenAI GPT-4 / Anthropic Claude
- **Export**: html2canvas, jsPDF, JSZip

## Development Notes

- Canvas rendering is optimized for performance
- All edits trigger history updates for undo/redo
- Autosave prevents data loss
- Protected routes require authentication
- Brand kits are user-specific via RLS

## Known Limitations

- Image upload is not yet implemented (placeholder ready)
- Avatar generation requires external service
- Template marketplace is planned for future
- Collaboration features coming in Phase 2

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Update Supabase Redirect URLs

Add your production URL:
- `https://your-domain.com/auth/callback`

## Support

For issues or questions, please check:
- Database schema is correctly applied
- Environment variables are set
- Supabase Google OAuth is enabled
- API keys are valid

## License

MIT
