const webview = document.getElementById('webview');
const urlInput = document.getElementById('url');

function procesarEntrada(input) {
    let texto = input.trim();
    const esURL = /^https?:\/\/|^[\w.-]+\.[a-z]{2,}/i.test(texto);

    if (esURL) {
        if (!/^https?:\/\//i.test(texto)) {
            texto = 'https://' + texto;
        }
        return texto;
    } else {
        // Búsqueda por DuckDuckGo (puedes cambiar a Google)
        return 'https://duckduckgo.com/?q=' + encodeURIComponent(texto);
    }
}

// Cargar cuando se presiona Enter
urlInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        const destino = procesarEntrada(urlInput.value);
        webview.loadURL(destino);
    }
});

// Cargar cuando se hace clic en "Ir"
document.getElementById('go').addEventListener('click', () => {
    const destino = procesarEntrada(urlInput.value);
    webview.loadURL(destino);
});

// Botones de navegación
document.getElementById('back').addEventListener('click', () => {
    if (webview.canGoBack()) webview.goBack();
});
document.getElementById('forward').addEventListener('click', () => {
    if (webview.canGoForward()) webview.goForward();
});
document.getElementById('reload').addEventListener('click', () => {
    webview.reload();
});

// Actualizar el input al navegar
webview.addEventListener('did-navigate', () => {
    urlInput.value = webview.getURL();
});
webview.addEventListener('did-navigate-in-page', () => {
    urlInput.value = webview.getURL();
});
webview.addEventListener('did-finish-load', () => {
    urlInput.value = webview.getURL();
});