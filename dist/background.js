chrome.alarms.create({periodInMinutes:1/60}),chrome.alarms.onAlarm.addListener((function(e){chrome.storage.local.get(["timer"],(function(e){var r,o=null!==(r=e.timer)&&void 0!==r?r:0;chrome.storage.local.set({timer:o+1})}))}));