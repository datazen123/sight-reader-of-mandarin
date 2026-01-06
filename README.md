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

- Single HTML file (zero build dependencies)
- Vanilla JavaScript
- Browser Speech Synthesis API for TTS
- Claude API for translation (via Anthropic)

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/mandarin-sight-reader)

Or import directly:
1. Push this repo to GitHub/GitLab/Bitbucket
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Deploy (no configuration needed)

## Local Development

Just open `index.html` in a browser. No server required for the example phrases.

For the translation feature, you'll need the Claude API access (works automatically in Claude artifacts, or add your API key for standalone use).

## License

MIT
