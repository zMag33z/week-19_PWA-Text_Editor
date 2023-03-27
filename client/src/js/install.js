const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA  https://web.dev/learn/pwa/installation-prompt/
// create changable deferred prompt event
let deferredPrompt;

// window listen pre/before button click installation event .  toggle class show button which is hidden automatically
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    butInstall.classList.toggle('app-update.show');
});

// `butInstall` button element
butInstall.addEventListener('click', async () => {
    const eventPrompt = deferredPrompt;
    if(!eventPrompt){
        return;
    };
    eventPrompt.prompt();
    // reset null (not undefined) to clear prompt
    deferredPrompt = null;
    butInstall.classList.toggle('app-update.show');
});

// `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // reset the deferred prompt event
    deferredPrompt = null;
    console.log('👍', 'appinstalled', event);
});