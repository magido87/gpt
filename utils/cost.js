export function estimateCost(model, prompt, completion) {
  // prices per 1k tokens USD (June 2025)
  const pricing = {
    "gpt-3.5-turbo": { prompt: 0.0005, completion: 0.0015, total: 0.002 }, // simplified
    "gpt-4o":        { prompt: 0.005,  completion: 0.015 } // GPT‑4o official pricing (June 2025)
  };
  const p = pricing[model] || pricing["gpt-3.5-turbo"];
  if (p.total) {
    return ((prompt + completion) * p.total) / 1000;
  }
  return (prompt * p.prompt + completion * p.completion) / 1000;
}
