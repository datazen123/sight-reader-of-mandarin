# Mandarin Sight Reader

A language learning tool for Korean-English speakers learning Traditional Mandarin Chinese.

## Features

- **Sight-reading flow UI**: Phrases displayed with Pinyin, Hanzi, and Hanja/Eumhun layers
- **Word chunking**: Multi-syllable words grouped for natural reading rhythm
- **Korean bridge**: Leverages Sino-Korean (한자) cognates for faster vocabulary acquisition
- **Audio playback**: Browser TTS with 1-5× repeat options
- **Layer toggles**: Show/hide Pinyin, Hanzi, Hanja, chunking indicators
- **Monochrome mode**: Reduce visual distraction
- **Custom translation**: Enter your own English phrases for instant breakdown

## Tech Stack

- Single HTML file + Edge Function (zero build dependencies)
- Vanilla JavaScript
- Browser Speech Synthesis API for TTS
- Claude API via Vercel Edge Function (secure server-side)

## Project Structure

```
mandarin-sight-reader/
├── index.html          # Main app (static)
├── api/
│   └── translate.js    # Edge function for Claude API
├── vercel.json         # Vercel config
├── README.md
└── .gitignore
```

## Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your repository
3. **Add Environment Variable** (required for translation feature):
   - Name: `ANTHROPIC_API_KEY`
   - Value: Your Anthropic API key from [console.anthropic.com](https://console.anthropic.com)
4. Click **Deploy**

### 3. One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/mandarin-sight-reader&env=ANTHROPIC_API_KEY&envDescription=Your%20Anthropic%20API%20key%20for%20Claude&envLink=https://console.anthropic.com)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes (for translation) | Your Claude API key |

## Local Development

The example phrases work without any setup - just open `index.html` in a browser.

For the translation feature locally, you'll need:
1. [Vercel CLI](https://vercel.com/cli): `npm i -g vercel`
2. Create `.env.local` with your `ANTHROPIC_API_KEY`
3. Run `vercel dev`

## License

MIT

