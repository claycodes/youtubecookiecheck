/**
 * MIT License

Copyright (c) 2021 Clay Smith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
chrome.webNavigation.onCompleted.addListener(function () {
    clearData()
}, { url: [{ urlMatches: 'https://www.youtube.com' }] });

async function cookiecheck() {
    console.log('cookiecheck')
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        let url = tabs[0].url;
        chrome.cookies.get({ url: 'https://*.youtube.com', name: '__Secure-3PAPISID' },
            function (cookie1) {
                if (cookie1) {
                    console.log(cookie1.value);
                }
                else {
                    console.log('Can\'t get cookie! Check the name!');
                }
                chrome.cookies.get({ url: 'https://*.youtube.com', name: '__Secure-1PAPISID' },
                    function (cookie2) {
                        console.log(cookie2)
                        if (cookie2) {
                            console.log(cookie2.value);
                        }
                        else if (cookie1 && !cookie2) {
                            console.log('Can\'t get cookie! Check the name!');
                            if (!url.includes('oops') && !url.includes('restricted_access') && !url.includes('ServiceNotAllowed')) {
                                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                                    chrome.tabs.reload(tabs[0].id);
                                });
                            }
                        }
                    });

            });
    });
}



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "clear") {
        chrome.tabs.update(sender.tab.id, { url: request.url });
        //clearData()
        sendResponse({ ack: true });
    }
}
);


function clearData() {
    chrome.browsingData.remove({
        "since": 0,
    }, {
        // "appcache": true,
        // "cache": true,
        // "cacheStorage": true,
        "cookies": true,
        // "downloads": true, //forbidden with origin
        // "fileSystems": true,
        // "formData": true,//forbidden with origin
        // "history": true, //forbidden with origin
        // "indexedDB": true,
        // "localStorage": true,
        // "passwords": true, //forbidden with origin
        // "serviceWorkers": true,
        // "webSQL": true
    }, function () {
        console.log('Cookies removed')
    });


}