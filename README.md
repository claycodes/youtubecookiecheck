MIT License

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
 
 Youtube Cookie check is an extension which can be used to force Youtube Login and Cookie clearance for those looking to block Youtube for under 18 restricted users. 
 This extension can be packaged through the chrome developer tools and hosted. Once hosted it can be forced through the Google Admin Console policies. 

Extensions can be hosted through a webserver fora more private delivery. 
Custom hosted extensions need to be locally packaged using the Chrome Browser developer mode at chrome://extensions
A crx file will be generated with an associated PEM file for encryption. The PEM file is not for hosting but should be kept securly in order to repackage the extension and not force an ID change. 
Once packaged the crx id needs to be surfaced. You can use https://crx-checker.appspot.com/ to identify information such as the extension ID for use in the xml. 
An xml file called updates.xml must be created and hosted along with the crx file in the same folder.

The xml will contain the following. Where {Your Extention ID} is replaced by the id of your extension found from https://crx-checker.appspot.com/ and {Full https path to the crx} is replaced by the full https path to access the crx and {Extension Version from manifest} is the extension version from the maniest.json When repacjkagin and update the change in this version in the xml triggers the update of the extension. The extension version in the manifest must match.

```
<?xml version='1.0' encoding='UTF-8'?>
<gupdate xmlns='http://www.google.com/update2/response' protocol='2.0'>
  <app appid='{Your Extention ID}'>
    <updatecheck codebase='{Full https path to the crx}' version='{Extension Version from manifest}' />
  </app>
</gupdate>
```

The crx id and the updates.xml url can be used with the admin console for deployment.
On update of the extensioon and advancement of the version the crx needs to be repackaged and the xml updated and the files pushed back up to hosting. 

I prefer to host using Firebase Hosting. I can have one host an a number of extensions in one place to manage for delivery. 

**Added managed extension JSON object to clear only youtube cookies: 
JSON object can be place when setting the extension. 
```
{ "youtube-only" : {"Value" : true}}
```