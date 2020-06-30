import './leaflet-mapbox-gl';
import './MovingMarker';

export default class leafletClass {
  constructor(divId = null, params = {}) {
    if (divId !== null && typeof params === 'object' && typeof L == 'object') {
      this.init(divId, params);
    }
  }

  //  params accept this
  // {
  //     config: { /* map congig*/},
  //     zoom: {/*zoom config*/},
  //     tile: { /*tile config*/}
  // }create
  fetchConfig(params = {}) {
    //default config
    let config = {
      map: {
        center: [0, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 10,
        maxBounds: L.latLngBounds(L.latLng(-90, -540), L.latLng(90, 540)),
        zoomControl: false,
        worldCopyJump: true,
        gestureHandling: true,
        fadeAnimation: true,
        zoomAnimation: true,
      },
      zoom: {
        position: 'bottomright',
      },
      fitBtn: {
        icon: 'fas fa-location-arrow',
        position: 'bottomright',
      },
      tile: {
        detectRetina: true,
        noWrap: false,
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '<a href="https://www.maptiler.com/license/maps/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a>',
      },
      mapboxGL: {
        use: true,
        accessToken:
          'pk.eyJ1IjoiYWxleHNlYXJhdGVzIiwiYSI6ImNqcGlheDIyaDAzbW4zcW1mMjd6Z2JqZngifQ.25bRH1tlz6A2yEakcNM7iw',
        style: 'https://sirius.searates.com/map/opentiler.json?1',
        attribution:
          '<a href="https://www.maptiler.com/license/maps/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a>',
      },
      overlay: {
        use: false,
        detectRetina: true,
        noWrap: false,
        url: 'http://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a href="https://www.openseamap.org/">OpenSeaMap</a>',
      },
    };

    for (let section in config) {
      for (let mapPar in params[section]) {
        config[section][mapPar] = params[section][mapPar];
      }
    }

    return config;
  }

  init(divId, params = {}) {
    //if class already contain map, arr divId is not a string
    if (typeof this.map !== 'undefined' || typeof divId !== 'string') {
      return false;
    }

    let config = this.fetchConfig(params);

    this.map = L.map(divId, config.map);
    this.routs = [];
    this.routsMarkerWork = null; //can be null or anyThing, that mean blocked

    this.drawRoutes();

    //custom zoom settings btn to bottom-right;
    if (config.map.zoomControl === false) {
      L.control.zoom({ position: config.zoom.position }).addTo(this.map);
    }

    if (typeof L.easyButton === 'function') {
      let _this = this;
      L.easyButton(
        config.fitBtn.icon,
        function () {
          _this.fitMap();
        },
        config.fitBtn,
      ).addTo(this.map);
    }

    if (typeof L.mapboxGL === 'function' && config.mapboxGL.use) {
      L.mapboxGL(config.mapboxGL).addTo(this.map);
    } else {
      L.tileLayer(config.tile.url, config.tile).addTo(this.map);
    }

    if (
      config.overlay.use &&
      !config.mapboxGL.use &&
      typeof L.mapboxGL !== 'function'
    ) {
      L.tileLayer(config.overlay.url, config.overlay).addTo(this.map);
    }

    //resize watcher
    setInterval(() => {
      if (typeof this.map !== 'undefined') {
        this.map.invalidateSize(true); //with animation
      }
    }, 400);

    return true;
  }

  saveElement(el, main = false) {
    if (typeof this.elements !== 'object') {
      this.elements = { main: [], additional: [] };
    }

    if (main) {
      this.elements.main.push(el);
    } else {
      this.elements.additional.push(el);
    }

    return el;
  }

  clearMap() {
    if (typeof this.elements === 'object') {
      for (let prop in this.elements.main) {
        // if (typeof this.elements.main[prop].remove === 'function') this.elements.main[prop].remove();
        this.elements.main[prop].remove();
      }
      for (let prop in this.elements.additional) {
        // if (typeof this.elements.additional[prop].remove === 'function') this.elements.additional[prop].remove();
        this.elements.additional[prop].remove();
      }
    }
    this.elements = { main: [], additional: [] };

    this.routs = null;
    if (this.routsMarkerWork != null) {
      this.routsMarkerWork.remove();
    }
    this.routsMarkerWork = null;
  }

  fitMap() {
    let bounds = [];
    if (
      typeof this.elements == 'object' &&
      typeof this.elements.main == 'object' &&
      this.elements.main.length > 0
    ) {
      for (let el in this.elements.main) {
        let element = this.elements.main[el];

        if (typeof element._latlng === 'object') {
          bounds.push(element._latlng);
        }
        if (typeof element._latlngs === 'object') {
          for (let cord in element._latlngs) {
            bounds.push(element._latlngs[cord]);
          }
        }
      }
      this.map.flyToBounds(bounds, {
        animate: true,
        duration: 0.75,
        maxZoom: 12,
      });
    }
  }

  addRoute(latLngs, type) {
    if (typeof this.routs != 'object' || this.routs == null) {
      this.routs = [];
    }
    this.routs.push({ coords: latLngs, type: type });
  }

  drawRoutes() {
    var _this = this;
    var curI = 0;
    var lastI = -1;

    setInterval(function () {
      if (
        typeof _this.routs == 'object' &&
        _this.routs != null &&
        _this.routs.length > 0
      ) {
        if (_this.routsMarkerWork != null && _this.routsMarkerWork.isEnded()) {
          _this.routsMarkerWork.remove();
          _this.routsMarkerWork = null;
          curI++;
        }

        if (curI >= _this.routs.length) {
          curI = 0;
        }
        if (lastI >= _this.routs.length) {
          lastI = 0;
        }

        if (_this.routsMarkerWork == null || lastI !== curI) {
          let transport = 'ship';
          switch (_this.routs[curI].type) {
            case 'truck':
              transport = 'truck-marker';
              break;
            case 'road-dashed':
              transport = 'truck';
              break;
            case 'rail':
              transport = 'train';
              break;
            case 'rail-dashed':
              transport = 'train';
              break;
            case 'air':
              transport = 'plane';
              break;
            case 'air-dashed':
              transport = 'plane';
              break;
          }

          let duration = _this.getRoutDistance(_this.routs[curI].coords) / 350;
          if (duration < 2250) {
            //lower than 600km
            duration = 2250;
          } else if (duration > 10000) {
            duration = _this.getRoutDistance(_this.routs[curI].coords) / 550;
          }

          _this.routsMarkerWork = L.Marker.movingMarker(
            _this.routs[curI].coords,
            duration,
            Object.assign(
              {
                autostart: true,
              },
              _this.marker[transport],
            ),
          ).addTo(_this.map);

          lastI = curI;
        }
      }
    }, 150);
  }

  //coords utils

  getRoutDistance(route) {
    var distance = 0;
    for (let i = 1; i < route.length; i++) {
      distance += Math.sqrt(Math.pow(route[i - 1].distanceTo(route[i]), 2));
    }
    return distance;
  }

  floatLatLng(latLng = []) {
    let correctLatLng = [];

    for (let i = 0; i < latLng.length; i++) {
      correctLatLng.push([parseFloat(latLng[i][0]), parseFloat(latLng[i][1])]);
    }

    return correctLatLng;
  }

  distBtwVecInOneDem(pointA, pointB) {
    if (pointA === pointB) {
      return 0;
    }

    if (pointA > pointB) {
      return pointA - pointB;
    } else {
      return pointB - pointA;
    }
  }

  fixGeodesicLatLng(oldLatLng) {
    // Latitude: -85 to +85
    // Longitude: -180 to +180
    let latLng = [];
    latLng.push(new L.LatLng(oldLatLng[0][0], oldLatLng[0][1]));

    // let latModif = 0;
    let lngModif = 0;

    for (let i = 1; i < oldLatLng.length; i++) {
      //We do not need vertical fix

      //lngSwap
      let lngDistance = Math.sqrt(
        Math.pow(
          this.distBtwVecInOneDem(oldLatLng[i - 1][1], oldLatLng[i][1]),
          2,
        ),
      );
      if (lngDistance > 180) {
        if (oldLatLng[i][1] > 0) {
          lngModif = -360;
        } else if (oldLatLng[i][1] < 0) {
          lngModif = 360;
        }
      }

      latLng.push(new L.LatLng(oldLatLng[i][0], oldLatLng[i][1] + lngModif));
    }

    return latLng;
  }

  distanceBetween(pointA, pointB) {
    return Math.sqrt(
      Math.pow(pointA.lat - pointB.lat, 2) +
        Math.pow(pointA.lng - pointB.lng, 2),
    );
  }

  pointAreNear(pointA, pointB, range = 1) {
    return this.distanceBetween(pointA, pointB) <= range;
  }

  //params is object of https://leafletjs.com/reference-1.3.4.html#path
  createBrush(name, params) {
    if (typeof this.brush === 'undefined') {
      this.brush = {};
    }
    this.brush[name] = params;
  }

  createMarker(name, params) {
    if (typeof this.marker === 'undefined') {
      this.marker = {};
    }
    this.marker[name] = params;
  }

  getRoutDistance(route) {
    let distance = 0;
    for (let i = 1; i < route.length; i++) {
      distance += Math.sqrt(Math.pow(route[i - 1].distanceTo(route[i]), 2));
    }
    return distance;
  }

  findIconName(icon) {
    for (let el in this.marker) {
      if (this.marker[el].icon === icon) {
        return el;
      }
    }

    return 'error';
  }

  getAllElements() {
    let elements = [];
    if (
      typeof this.elements === 'object' &&
      typeof this.elements.main === 'object'
    ) {
      this.elements.main.forEach((el) => {
        if (typeof el.getLatLng === 'function') {
          let title = null;

          elements.push({
            icon: this.findIconName(el.getIcon()),
            latLng: el.getLatLng(),
            title:
              typeof el.getTooltip === 'function' &&
              typeof el.getTooltip() === 'object' &&
              typeof el.getTooltip().getContent === 'function' &&
              el.getTooltip().getContent().toString().length
                ? el.getTooltip().getContent().toString()
                : null,
          });
        }
      });
    }
    return elements;
  }

  addElements(elements) {
    if (typeof this.elements !== 'object') {
      this.clearMap();
    }

    elements.forEach((el) => {
      this.drawMarker(el.icon, el.latLng, el.title);
    });
  }

  //drawers

  drawLine(LatLng, brush, main = false) {
    this.saveElement(L.polyline(LatLng, brush).addTo(this.map), main);
  }

  drawPath(brushName, path) {
    let latLng = this.fixGeodesicLatLng(this.floatLatLng(path));
    this.drawLine(latLng, this.brush[brushName], true);

    //add rout for marker
    this.addRoute(latLng, brushName);

    let coordOffset = [];
    for (let loCoord in latLng) {
      coordOffset.push(
        new L.LatLng(latLng[loCoord].lat, latLng[loCoord].lng - 360),
      );
    }
    this.drawLine(coordOffset, this.brush[brushName]);
    coordOffset = [];
    for (let loCoord in latLng) {
      coordOffset.push(
        new L.LatLng(latLng[loCoord].lat, latLng[loCoord].lng + 360),
      );
    }
    this.drawLine(coordOffset, this.brush[brushName]);
  }

  drawMarker(markerName, latLng, content = null, onlyClick = false) {
    //test Env
    //onlyClick = true;
    //

    if (content !== null) {
      let main = L.marker(latLng, this.marker[markerName]);

      if (onlyClick) {
        main.on({
          click: function () {
            if (
              !this.hasOwnProperty('_tooltip') ||
              typeof this._tooltip != 'object' ||
              (typeof this._tooltip == 'object' && this._tooltip == null)
            ) {
              this.bindTooltip(content, {
                permanent: true,
                opacity: 1,
                direction: 'bottom',
              }).openTooltip();
            } else {
              this.unbindTooltip();
            }
          },
        });
      } else {
        main.bindTooltip(content, {
          opacity: 1,
          direction: 'bottom',
        });
      }

      this.saveElement(main.addTo(this.map), true);
    } else {
      this.saveElement(
        L.marker(latLng, this.marker[markerName]).addTo(this.map),
        true,
      );
    }

    this.saveElement(
      L.marker(
        [latLng[0], parseFloat(latLng[1]) - 360],
        this.marker[markerName],
      ).addTo(this.map),
    );
    this.saveElement(
      L.marker(
        [latLng[0], parseFloat(latLng[1]) + 360],
        this.marker[markerName],
      ).addTo(this.map),
    );
  }

  drawCircle(
    latLng,
    radiusKm,
    fillColor,
    borderColor,
    fillOpacity = 0.2,
    borderWidth = 3,
    borderOpacity = 1.0,
  ) {
    if (!(latLng instanceof L.LatLng)) {
      let temp = latLng;
      latLng = new L.LatLng(latLng[0], latLng[1]);
    }

    this.saveElement(
      L.circle(latLng, {
        radius: radiusKm * 1000, //to meeters
        fill: true,
        fillColor: fillColor,
        fillOpacity: fillOpacity,
        borderColor: borderColor,
        borderWidth: borderWidth,
        borderOpacity: borderOpacity,
      }).addTo(this.map),
      true,
    );
  }
}
