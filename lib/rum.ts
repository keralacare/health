const ANALYTICS_ENDPOINT = 'https://event.health.kerala.care/create';

export const recordEvent = (name: string, attributes?: { [key: string]: string | number | boolean }) => {
  if (typeof window === 'undefined') return;
  
  console.log('Recording event:', name, attributes || '(no attributes)');
  
  fetch(ANALYTICS_ENDPOINT , {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        event: `tn:${name}`, 
      }),
  }).catch(() => {}); // Fire and forget
};
