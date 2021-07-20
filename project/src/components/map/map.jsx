import React, {useRef, useEffect, useState} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import { OfferType } from '../../common-prop-types';

const icon = leaflet.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [25, 35],
  iconAnchor: [15, 30],
});

const iconActive = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [25, 35],
  iconAnchor: [15, 30],
});

function Map(props) {
  const {city, points, activeCard} = props;
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city[0].location[0].latitude,
          lng: city[0].location[0].longitude,
        },
        zoom: city[0].location[0].zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
    }
  }, [map, city, activeCard, points]);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.location.latitude,
            lng: point.location.longitude,
          }, {
            icon: (point === activeCard)
              ? iconActive
              : icon,
          })
          .addTo(map);
      });
    }
  }, [map, points, activeCard]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

Map.propTypes = {
  points: PropTypes.arrayOf(OfferType).isRequired,
  city: PropTypes.array.isRequired,
  activeCard: OfferType,
};

export default Map;
