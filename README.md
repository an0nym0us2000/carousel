# AI Carousel Maker

A full-featured AI-powered carousel maker for creating stunning LinkedIn-style carousels.

## Features

- AI-powered carousel generation
- 12 professional templates
- Live canvas editor with full customization
- Brand kit management
- Multiple export formats (PNG, JPG, PDF, ZIP)
- Autosave and version history
- Google authentication

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Canvas**: Fabric.js
- **State Management**: Zustand
- **Database & Auth**: Supabase
- **AI**: OpenAI GPT-4 / Anthropic Claude

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                  # Next.js 14 app directory
├── components/           # React components
├── lib/                  # Utilities and configurations
├── store/                # Zustand stores
├── types/                # TypeScript types
└── public/               # Static assets
```

## License

MIT
