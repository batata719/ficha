if ('serviceWorker' in navigator && window.isSecureContext) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch((error) => {
      console.error('Não foi possível registrar o modo offline do Tá Jóia RPG:', error);
    });
  });
}
