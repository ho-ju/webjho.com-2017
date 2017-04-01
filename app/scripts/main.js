/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  // Your custom JavaScript goes here

  var WebJhoApp = function() {};

  WebJhoApp.prototype = {
    initParticles: function() {
      particlesJS.load(
        'home',
        '/scripts/libs/particlesjs-config.json',
        function() {
          console.log('particles.js loaded - callback');
        }
      );
    },
    initNavWatch: function() {
      var triggerPoint = $('#about').position().top;
      var $nav = $('nav');
      var currPos = 0;
      console.log(triggerPoint);

      $(window).scroll(function() {
        currPos = $(window).scrollTop();
        if (currPos >= triggerPoint) {
          $nav.addClass('showMeTheMoney');
        } else {
          $nav.removeClass('showMeTheMoney');
        }
      });
    },
    initBars: function() {
      var opts = {
        strokeWidth: 6,
        easing: 'easeInOut',
        duration: 1400,
        color: '#f1c232',
        trailColor: '#555555',
        trailWidth: 1,
        svgStyle: null,
        text: {
          value: '90',
          alignToBottom: false
        }
        // ,step: (state, bar) => {
        //   bar.path.setAttribute('stroke', state.color);
        //   var value = Math.round(bar.value() * 100);
        //   if (value === 0) {
        //     bar.setText('');
        //   } else {
        //     bar.setText(value);
        //   }
        //   bar.text.style.color = state.color;
        // }
      };
      var bar1 = new ProgressBar.Circle(cssBar, opts);

      opts.color = '#e69138';
      var bar2 = new ProgressBar.Circle(jsBar, opts);

      opts.color = '#0f7e8e';
      var bar3 = new ProgressBar.Circle(teamBar, opts);

      opts.color = '#a64d79';
      var bar4 = new ProgressBar.Circle(commBar, opts);

      opts.color = '#3d85c6';
      var bar5 = new ProgressBar.Circle(leaderBar, opts);

      // Animate
      bar1.animate(0.9);
      bar2.animate(0.8);
      bar3.animate(0.9);
      bar4.animate(0.9);
      bar5.animate(0.7);
    }
  };

  $(function() {
    console.log('ready');

    var myApp = new WebJhoApp();
    myApp.initParticles();
    myApp.initNavWatch();
    myApp.initBars();
  });
})();
