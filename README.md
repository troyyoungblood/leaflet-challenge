# leaflet-challenge
20210324

This activity is to provide code that will create an interactive map of earthquake locations using using JavaScript, HTML, CSS and Leaflet.

The homework has 2 Levels.  Level 1 is required and Level 2 is Bonus.  Only Level 1 was completed due to time contraints of the Project 2 work.

Link to the browser <a href="https://troyyoungblood.github.io/D3-Challenge/">Leaflet-Challenge</a>.  

The data set used was for map was a week's worth of earthquake data.  The map has a click feature that allows the user to select a specfic point and obtain eqrthquake related data.  Each circle diameter is relative to its intensity.  The color of the circle is relative to its depth.  The map also has the ability to switch between Street Map and Dark mode.  Also, there is the ability to toggle off the markers if wanting to view a clean map.  The "+" and "-" in the upper left corner of the map allows for zomng in and out on the map.  The map can alos be moved in various directions to view differnt locations.

The scale increments were selected based on looking at the values and splitting them in such a manner as to allow for good color distribution.  The scale increments related to the eartthquake depth are:
  -10 to 2 ft
  2  - 4 ft
  4 - 6 ft
  6 - 10 ft
  10 - 25 ft
  25 - 75 ft
  75 - 100 ft
  100+ ft

Links to the code:

HTML code: [HTML Code](index.html)<br>
JavaScript code: [JavaScript Code](Leaflet-Step-1/static/js/logic.js)<br>
CSS code: [CSS code](Leaflet-Step-1/static/css/style.css)<br>


Example images

<img src="assets/images/age_v_smoker.PNG" width = "450">
<img src="assets/images/hover_text_box.png" width = "450">
