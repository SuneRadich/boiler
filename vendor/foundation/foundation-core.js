/**
* Core default setup of Foundation javascript logic
* All plugin setup is handled in foundation-pgins.js
*/

//Load core logic and make foundation available as a jQuery plugin
import $ from 'jquery';
import { Foundation } from 'foundation/foundation.core';
Foundation.addToJquery($);

// Add Foundation Utils to Foundation global namespace for backwards compatibility.

import { rtl, GetYoDigits, transitionend } from 'foundation/foundation.util.core';
Foundation.rtl = rtl;
Foundation.GetYoDigits = GetYoDigits;
Foundation.transitionend = transitionend;

import { Box } from 'foundation/foundation.util.box'
import { onImagesLoaded } from 'foundation/foundation.util.imageLoader';
import { Keyboard } from 'foundation/foundation.util.keyboard';
import { MediaQuery } from 'foundation/foundation.util.mediaQuery';
import { Motion, Move } from 'foundation/foundation.util.motion';
import { Nest } from 'foundation/foundation.util.nest';
import { Timer } from 'foundation/foundation.util.timer';

Foundation.Box = Box;
Foundation.onImagesLoaded = onImagesLoaded;
Foundation.Keyboard = Keyboard;
Foundation.MediaQuery = MediaQuery;
Foundation.Motion = Motion;
Foundation.Move = Move;
Foundation.Nest = Nest;
Foundation.Timer = Timer;

// Touch and Triggers previously were almost purely sede effect driven,
// so no // need to add it to Foundation, just init them.
import { Touch } from 'foundation/foundation.util.touch';
Touch.init($);
import { Triggers } from 'foundation/foundation.util.triggers';
Triggers.init($, Foundation);
