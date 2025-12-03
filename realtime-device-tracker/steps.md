    Check if the browser supports geolocation.

    Set options for high accuracy, a 5-second timeout, and no caching.

    Use watchPosition to track the users location continously.

    Emit the latitude and longitude via a socket with "send-location". Log any errors to the console

    Initialize a map centered at coordinates (0,0) with a zoom level of 15 using leadlet. Add OpenStreetMap tiles to the map.

    Create an empty object markets.

    When receiving location data via the socket, extract id , latitude, and longitude and center the map on the new coordinates.

    If a marker for the id exists, update its position, otherwise, create a new market at the given coordinates and add it to the map. when a user disconnects, remove their market from the map and delete it from markets.
