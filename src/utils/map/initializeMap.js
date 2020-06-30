import leafletClass from './leafletClass';

export default function init(id) {
  const map = new leafletClass(id);

  map.createBrush('sea', {
    color: 'blue',
    weight: 2,
    opacity: 1.0,
    className: null,
  });
  map.createBrush('sea-dashed', {
    color: 'blue',
    weight: 2,
    opacity: 1.0,
    dashArray: '15 15',
    className: null,
  });

  map.createBrush('truck', {
    color: 'green',
    weight: 2,
    opacity: 1.0,
    className: null,
  });
  map.createBrush('truck-dashed', {
    color: 'green',
    weight: 2,
    opacity: 1.0,
    dashArray: '15 15',
    className: null,
  });

  map.createBrush('air', {
    color: 'purple',
    weight: 2,
    opacity: 1.0,
    className: null,
  });
  map.createBrush('air-dashed', {
    color: 'purple',
    weight: 2,
    opacity: 1.0,
    dashArray: '15 15',
    className: null,
  });

  map.createBrush('rail', {
    color: 'orange',
    weight: 2,
    opacity: 1.0,
    className: null,
  });
  map.createBrush('rail-dashed', {
    color: 'orange',
    weight: 2,
    opacity: 1.0,
    dashArray: '15 15',
    className: null,
  });

  map.createMarker('sea-port', {
    icon: L.icon({
      iconUrl: 'https://sirius.searates.com/images/marker-blue.png',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    }),
    keyboard: false,
    zIndexOffset: 900,
  });

  map.createMarker('rail', {
    icon: L.icon({
      iconUrl: 'https://sirius.searates.com/images/marker-yel.png',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    }),
    keyboard: false,
    zIndexOffset: 900,
  });

  map.createMarker('truck', {
    icon: L.icon({
      iconUrl: 'https://sirius.searates.com/images/marker-gr.png',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    }),
    keyboard: false,
    zIndexOffset: 900,
  });

  map.createMarker('airport', {
    icon: L.icon({
      iconUrl: 'https://sirius.searates.com/images/marker-purple.png',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    }),
    keyboard: false,
    zIndexOffset: 900,
  });

  //MM
  map.createMarker('ship', {
    icon: L.icon({
      iconUrl: 'https://sirius.searates.com/images/marker-ship.png',
      iconSize: [40, 49],
      iconAnchor: [20, 48.5],
    }),
    keyboard: false,
    zIndexOffset: 900,
  });
  map.createMarker('plane', {
    icon: L.icon({
      iconUrl: 'https://sirius.searates.com/images/marker-air.png',
      iconSize: [40, 49],
      iconAnchor: [20, 48.5],
    }),
    keyboard: false,
    zIndexOffset: 900,
  });
  map.createMarker('truck-marker', {
    icon: L.icon({
      iconUrl: 'https://sirius.searates.com/images/marker-truck-green.png',
      iconSize: [40, 49],
      iconAnchor: [20, 48.5],
    }),
    keyboard: false,
    zIndexOffset: 900,
  });
  map.createMarker('truck-blue', {
    icon: L.icon({
      iconUrl: 'https://sirius.searates.com/images/marker-truck.png',
      iconSize: [40, 49],
      iconAnchor: [20, 48.5],
    }),
    keyboard: false,
    zIndexOffset: 900,
  });
  map.createMarker('train', {
    icon: L.icon({
      iconUrl: 'https://sirius.searates.com/images/marker-rail.png',
      iconSize: [40, 49],
      iconAnchor: [20, 48.5],
    }),
    keyboard: false,
    zIndexOffset: 900,
  });

  map.fitMap();

  return map;
}
