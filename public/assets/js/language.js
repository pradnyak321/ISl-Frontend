// Function to get the `lang` parameter from the URL
function getLangParam() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('lang');
}

// Function to set the language using Google Translate
function setLanguage() {
    const selectedLang = getLangParam();
    if (selectedLang) {
        const iframe = document.querySelector("iframe.goog-te-banner-frame");
        if (iframe) {
            // Wait for the Google Translate iframe to load
            iframe.onload = () => {
                iframe.contentWindow.document.querySelector(`.goog-te-menu2-item[lang="${selectedLang}"]`).click();
            };
        }
    }
}

// Append `lang` parameter to all navigation links
function updateNavLinks() {
    const selectedLang = getLangParam();
    if (selectedLang) {
        document.querySelectorAll('nav a').forEach(link => {
            const url = new URL(link.href, window.location.origin);
            url.searchParams.set('lang', selectedLang);
            link.href = url.toString();
        });
    }
}

// Reinitialize Google Translate for new page content or navigation
function reinitializeGoogleTranslate() {
    googleTranslateElementInit();
}

// Initialize Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'mr,en',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

// Run the functions after the page loads
window.addEventListener("load", () => {
    setLanguage();
    updateNavLinks();
    reinitializeGoogleTranslate(); // Reinitialize after the page load
});
