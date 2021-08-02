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
  const [map, markersGroup] = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      markersGroup.clearLayers();
      map.flyTo([city.location.latitude, city.location.longitude], city.location.zoom);
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
          .addTo(markersGroup);
      });
    }
  }, [markersGroup, points, activeCard, city, map]);

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
  city: PropTypes.object.isRequired,
  activeCard: OfferType,
};

export default Map;
