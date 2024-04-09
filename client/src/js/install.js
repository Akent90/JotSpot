const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        butInstall.style.display = 'none';
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
    }
});

window.addEventListener('appinstalled', (event) => {
    deferredPrompt = null;
    console.log('PWA was installed', event);
});