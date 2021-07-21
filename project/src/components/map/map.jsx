import React, {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import { OfferType } from '../../common-prop-types';
import useMap from '../../hooks/useMap';

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
  const map = useMap(mapRef, city);

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
