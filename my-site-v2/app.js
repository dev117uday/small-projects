window.addEventListener('load', async e => {
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('sw.js');
        }
        catch (error) {
            console.log('failed to import serviceWorker');
            alert("service worker not found");
        }
    }
});
