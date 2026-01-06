export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { englishText } = await req.json();

    if (!englishText || typeof englishText !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing englishText in request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = `You are a Mandarin Chinese translator for Korean-English bilingual learners. 

Given an English phrase, provide a JSON response with:
1. Traditional Chinese translation (natural, conversational)
2. Word-by-word breakdown with chunking (multi-syllable words grouped together)

For each word/chunk provide:
- "pinyin": romanization with tone marks (e.g., "zuìjìn" not "zui4jin4")
- "hanzi": Traditional Chinese characters
- "hanja": Sino-Korean reading in format "음(漢)" or "—" if no hanja equivalent
- "eumhun": Korean 음훈 format "meaning 음" (e.g., "가장 최 · 가까울 근") or native Korean equivalent
- "isCompound": true if multi-syllable word, false if single syllable

Also provide 1-2 bridge items showing key Sino-Korean cognates.

Respond ONLY with valid JSON, no markdown:
{
  "english": "original english",
  "chinese": "full chinese sentence",
  "words": [
    {"pinyin": "...", "hanzi": "...", "hanja": "...", "eumhun": "...", "isCompound": true/false},
    ...
  ],
  "bridges": [
    {"cn": "詞 cí", "kr": "사(詞)", "meaning": "description", "eumhun_note": "뜻 음 explanation"},
    ...
  ],
  "usage": "when to use this phrase"
}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system: systemPrompt,
        messages: [
          { 
            role: 'user', 
            content: `Translate to Traditional Mandarin Chinese with full breakdown: "${englishText}"` 
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return new Response(JSON.stringify({ error: errorData.error?.message || 'API request failed' }), {
        status: response.status,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const data = await response.json();
    
    // Extract the text content
    const content = data.content[0].text;
    
    // Parse and validate JSON
    let parsed;
    try {
      const cleanJson = content.replace(/```json\n?|\n?```/g, '').trim();
      parsed = JSON.parse(cleanJson);
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Failed to parse translation response', raw: content }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
