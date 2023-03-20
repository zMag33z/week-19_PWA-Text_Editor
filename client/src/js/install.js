const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA  https://web.dev/learn/pwa/installation-prompt/
// `beforeinstallprompt` event
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    butInstall.classList.toggle('app-update.show');
});

// `butInstall` element
butInstall.addEventListener('click', async () => {
    const eventPrompt = deferredPrompt;
    if(!eventPrompt){
        return;
    };
    eventPrompt.prompt();
    // reset null not undefined to clear prompt
    deferredPrompt = null;
    butInstall.classList.toggle('app-update.show');
});

// `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // reset null not undefined to clear prompt
    deferredPrompt = null;
    console.log('👍', 'appinstalled', event);
});