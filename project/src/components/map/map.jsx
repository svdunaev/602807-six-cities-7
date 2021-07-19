import React, {useRef, useEffect, useState} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import { OfferType } from '../../common-prop-types';

const icon = leaflet.icon({
  iconUrl: 'img/pin.svg',
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

      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.location.latitude,
            lng: point.location.longitude,
          }, {
            icon: (point.title === activeCard.title)
              ? iconActive
              : icon,
          })
          .addTo(instance);
      });

      setMap(instance);
    }
  }, [map, city, activeCard.title, points]);

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
  city: PropTypes.shape(OfferType.city).isRequired,
  activeCard: PropTypes.shape(OfferType).isRequired,
};

export default Map;
