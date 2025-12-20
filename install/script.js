
// Configuration
const CONFIG = {
    AUTO_REDIRECT: true, // Set false untuk disable auto-redirect
    REDIRECT_DELAY: 500, // Delay before redirect (ms)
    FALLBACK_DELAY: 3000, // Show manual options after this delay
    SKIP_REDIRECT_PARAM: 'skip_redirect', // URL param untuk skip redirect
    REDIRECT_ATTEMPTED_KEY: 'redirect_attempted', // Session storage key
    DEBUG_MODE: true // Set false di production
};

// Debug logger
function log(message, data = null) {
    if (CONFIG.DEBUG_MODE) {
        console.log(`[WebView Detector] ${message}`, data || '');
    }
}

// Check if should skip redirect
function shouldSkipRedirect() {
    // Check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get(CONFIG.SKIP_REDIRECT_PARAM) === '1') {
        log('Skip redirect: URL parameter found');
        return true;
    }

    // Check if already attempted in this session
    if (sessionStorage.getItem(CONFIG.REDIRECT_ATTEMPTED_KEY)) {
        log('Skip redirect: Already attempted in this session');
        return true;
    }

    return false;
}

// Comprehensive webview detection
function detectBrowser() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const platform = navigator.platform || 'Unknown';

    log('User Agent:', ua);
    log('Platform:', platform);

    // Detection patterns
    const patterns = {
        // Social Media Apps
        facebook: /FBAN|FBAV|FB_IAB|FB4A|FBLC/i,
        instagram: /Instagram/i,
        twitter: /Twitter/i,
        linkedin: /LinkedIn/i,
        line: /Line\//i,
        wechat: /MicroMessenger/i,
        tiktok: /TikTok|BytedanceWebview/i,
        snapchat: /Snapchat/i,
        reddit: /RedditAndroid/i,
        pinterest: /Pinterest/i,
        telegram: /Telegram/i,
        whatsapp: /WhatsApp/i,

        // Generic WebView patterns
        webview: /wv|WebView/i,

        // Browsers (should NOT redirect)
        chrome: /Chrome\/[0-9.]+.*Mobile(?!.*wv)/i,
        samsung: /SamsungBrowser/i,
        opera: /OPR|Opera/i,
        firefox: /Firefox/i,
        safari: /Safari/i
    };

    let isWebView = false;
    let browserType = 'Unknown Browser';
    let appSource = 'Direct Access';

    // First check if it's a regular browser
    const browserChecks = ['chrome', 'samsung', 'opera', 'firefox', 'safari'];
    for (const browser of browserChecks) {
        if (patterns[browser].test(ua)) {
            // Additional check for Chrome to ensure it's not WebView
            if (browser === 'chrome') {
                // If has 'wv' or missing chrome object, it's WebView
                if (ua.indexOf('wv') !== -1 || !window.chrome) {
                    isWebView = true;
                    browserType = 'Embedded WebView';
                    appSource = 'WebView';
                    break;
                }
            }
            // It's a real browser, don't redirect
            browserType = browser.charAt(0).toUpperCase() + browser.slice(1);
            break;
        }
    }

    // If not identified as browser, check for WebView patterns
    if (browserType === 'Unknown Browser') {
        for (const [app, pattern] of Object.entries(patterns)) {
            if (browserChecks.includes(app)) continue; // Skip browser patterns

            if (pattern.test(ua)) {
                isWebView = true;
                appSource = app.charAt(0).toUpperCase() + app.slice(1);
                browserType = `${appSource} WebView`;
                log(`Detected WebView: ${appSource}`);
                break;
            }
        }
    }

    // Additional WebView detection methods
    if (!isWebView && browserType === 'Unknown Browser') {
        // Check for Android WebView
        if (ua.indexOf('Android') !== -1 && ua.indexOf('wv') !== -1) {
            isWebView = true;
            browserType = 'Android WebView';
            appSource = 'Android App';
        }

        // Check for missing window.chrome in Chrome UA
        if (ua.indexOf('Chrome') !== -1 && !window.chrome) {
            isWebView = true;
            browserType = 'Embedded WebView';
            appSource = 'Unknown App';
        }
    }

    return {
        isWebView,
        browserType,
        platform,
        appSource,
        userAgent: ua
    };
}

// Auto redirect to browser
async function autoRedirectToBrowser() {
    log('Starting auto-redirect sequence...');

    // Mark redirect as attempted
    sessionStorage.setItem(CONFIG.REDIRECT_ATTEMPTED_KEY, 'true');

    const currentUrl = window.location.href;
    const cleanUrl = currentUrl.replace(/[?&]skip_redirect=1/g, '');

    // Preserve UTM and other parameters
    const urlObj = new URL(currentUrl);
    urlObj.searchParams.set('source', 'webview_redirect');
    const targetUrl = urlObj.toString();

    // Method 1: Intent URL (Most reliable for Android)
    const intentUrl = `intent://${targetUrl.replace(/https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;

    // Method 2: Chrome scheme
    const chromeUrl = `googlechrome://navigate?url=${encodeURIComponent(targetUrl)}`;

    // Method 3: Generic intent without package
    const genericIntent = `intent://${targetUrl.replace(/https?:\/\//, '')}#Intent;scheme=https;end`;

    // Try redirect methods in sequence
    const redirectMethods = [
        { url: intentUrl, name: 'Chrome Intent' },
        { url: chromeUrl, name: 'Chrome Scheme' },
        { url: genericIntent, name: 'Generic Intent' }
    ];

    let redirectAttempted = false;

    for (const [index, method] of redirectMethods.entries()) {
        await new Promise(resolve => setTimeout(resolve, index * 500));

        try {
            log(`Attempting redirect method: ${method.name}`);
            window.location.href = method.url;
            redirectAttempted = true;

            // Give time for redirect to work
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            log(`Redirect method failed: ${method.name}`, error);
        }
    }

    // If all methods fail, show manual options
    if (redirectAttempted) {
        setTimeout(() => {
            showManualRedirectOptions();
        }, CONFIG.FALLBACK_DELAY);
    } else {
        showManualRedirectOptions();
    }
}

// Show manual redirect options if auto fails
function showManualRedirectOptions() {
    log('Showing manual redirect options');

    // Hide loading
    document.getElementById('loadingContainer').style.display = 'none';

    // Pastikan content-wrapper tetap tersembunyi
    document.getElementById('contentWrapper').classList.remove('show');
    document.getElementById('contentWrapper').style.display = 'none';

    // Tampilkan manual redirect
    document.getElementById('manualRedirect').classList.add('show');

}

// Force redirect methods (for manual buttons)
function forceRedirectToChrome() {
    const currentUrl = window.location.href;
    const methods = [
        () => window.location.href = `intent://${currentUrl.replace(/https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`,
        () => window.location.href = `googlechrome://navigate?url=${encodeURIComponent(currentUrl)}`,
        () => window.open(currentUrl, '_system'),
        () => window.location.href = 'market://details?id=com.android.chrome'
    ];

    methods.forEach((method, index) => {
        setTimeout(method, index * 500);
    });
}

function forceRedirectToBrowser() {
    const currentUrl = window.location.href;

    // Try multiple methods
    window.open(currentUrl, '_system');

    setTimeout(() => {
        window.location.href = `intent://${currentUrl.replace(/https?:\/\//, '')}#Intent;scheme=https;end`;
    }, 500);
}

function copyLink() {
    const url = window.location.href.replace(/[?&]skip_redirect=1/g, '');

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            alert('Link berhasil dicopy! Paste di browser eksternal.');
            log('Link copied to clipboard');
        }).catch(err => {
            fallbackCopy(url);
        });
    } else {
        fallbackCopy(url);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        alert('Link berhasil dicopy! Paste di browser eksternal.');
    } catch (err) {
        alert('Copy manual: ' + text);
    }

    document.body.removeChild(textArea);
}

function continueHere() {
    // Redirect to same URL with skip parameter
    const url = new URL(window.location.href);
    url.searchParams.set(CONFIG.SKIP_REDIRECT_PARAM, '1');
    window.location.href = url.toString();
}

// Update UI with detection results
function updateUI(browserInfo) {
    document.getElementById('browserType').textContent = browserInfo.browserType;
    document.getElementById('platform').textContent = browserInfo.platform;
    document.getElementById('appSource').textContent = browserInfo.appSource;

    const statusEl = document.getElementById('status');
    if (browserInfo.isWebView) {
        statusEl.className = 'status webview';
        statusEl.innerHTML = `⚠️ WebView Detected<br><small>${browserInfo.browserType}</small>`;
    } else {
        statusEl.className = 'status browser';
        statusEl.innerHTML = `✅ Browser Eksternal<br><small>${browserInfo.browserType}</small>`;
    }
}

// Main initialization
window.addEventListener('DOMContentLoaded', async () => {
    log('Page loaded, starting detection...');

    // Detect browser
    const browserInfo = detectBrowser();

    // Update UI
    updateUI(browserInfo);

    // Check if WebView and should redirect
    if (browserInfo.isWebView && CONFIG.AUTO_REDIRECT && !shouldSkipRedirect()) {
        log('WebView detected, initiating auto-redirect...');

        // Small delay before redirect
        setTimeout(() => {
            autoRedirectToBrowser();
        }, CONFIG.REDIRECT_DELAY);
    } else {
        // Not WebView or redirect skipped, show normal content
        log('No redirect needed or redirect skipped');
        document.getElementById('loadingContainer').style.display = 'none';
        document.getElementById('contentWrapper').classList.add('show');

        if (!browserInfo.isWebView) {
            // Hide manual redirect options for regular browsers
            document.getElementById('manualRedirect').style.display = 'none';
        }
    }

    // Log for analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'browser_detection', {
            'event_category': 'Technical',
            'event_label': browserInfo.appSource,
            'is_webview': browserInfo.isWebView
        });
    }
});


let deferredPrompt;

// OneSignal initialization
window.OneSignalDeferred = window.OneSignalDeferred || [];
OneSignalDeferred.push(async function (OneSignal) {
    try {
        await OneSignal.init({
            appId: "a76bb7ba-91a1-4c7f-b3dc-681051f9abd1", // Cloudflare Page
            notifyButton: {
                enable: false
            },
            allowLocalhostAsSecureOrigin: true,
            serviceWorkerPath: "../OneSignalSDKWorker.js",
            serviceWorkerUpdaterPath: "../OneSignalSDKUpdaterWorker.js",
            welcomeNotification: {
                title: "Selamat Datang!",
                message: "Terima kasih telah mengaktifkan notifikasi"
            }
        });

        console.log('OneSignal berhasil diinisialisasi');

    } catch (error) {
        console.error('Error initializing OneSignal:', error);
    }
});


window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installBtn = document.getElementById('installBtn');
    installBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 mr-2" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 6px;">
                    <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                    <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                </svg>
                Install APK
            `;
    installBtn.style.background = '#2563eb';
    console.log('Install prompt tersedia');
});


function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
                document.getElementById('installBtn').textContent = 'Installing...';
                document.getElementById('installBtn').disabled = true;
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    } else {
        alert('Untuk menginstall PWA ini:\n\n' +
            '1. Buka menu browser (⋮)\n' +
            '2. Pilih "Add to Home screen" atau "Install app"\n' +
            '3. Ikuti instruksi yang muncul\n\n' +
            'Atau gunakan browser yang mendukung PWA install.');
    }
}

window.addEventListener('appinstalled', (evt) => {
    console.log('PWA was installed');
    document.getElementById('installBtn').textContent = 'Installed ✓';
    document.getElementById('installBtn').style.background = '#10b981';
    document.getElementById('installBtn').disabled = true;
});

if (window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true) {
    const installBtn = document.getElementById('installBtn');
    installBtn.textContent = 'Already Installed ✓';
    installBtn.style.background = '#10b981';
    installBtn.disabled = true;
    console.log('Aplikasi berjalan dalam mode standalone');

    // Redirect setelah 1 detik
    setTimeout(() => {
        window.location.href = "/";
    }, 1000);
}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../service-worker.js')
        .then(registration => {
            console.log('Service Worker registered:', registration);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });

    navigator.serviceWorker.register('../OneSignalSDKWorker.js')
        .then(registration => {
            console.log('OneSignal SW registered:', registration);
        })
        .catch(error => {
            console.error('OneSignal SW registration failed:', error);
        });
} else {
    console.log('Browser tidak mendukung Service Worker');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    console.log('Install page loaded');
});


