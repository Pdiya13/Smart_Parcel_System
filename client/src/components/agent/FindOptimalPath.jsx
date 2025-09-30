import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const FindOptimalPath = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const markersRef = useRef([]); // store markers
  const [cities, setCities] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState([]);
  const [results, setResults] = useState([]);
  const [agent, setAgent] = useState(null);

  mapboxgl.accessToken =
    "pk.eyJ1IjoiZXZhLXJhc3RlIiwiYSI6ImNtZnNsNWZsaTBrcXgya3NkYTlsb2IxdTgifQ.hZ-uv_cqLf_ZzUxEaQUTVw";

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCities() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:8080/api/auth/agent/allowedCities",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data && res.data.cities) {
          setCities(res.data.cities);
        }
      } catch (err) {
        console.error("Failed to fetch cities", err);
        toast.error("Failed to fetch cities");
      }
    }

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await axios.get("http://localhost:8080/api/profile/agent", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAgent(res.data.agent);
        setSource(res.data.agent.city);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        toast.error("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [navigate]);

  
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
    });
  }, []);


  async function getCoordinates(location) {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          location
        )}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      if (data.features.length > 0) {
        return data.features[0].geometry.coordinates; // [lng, lat]
      }
      return null;
    } catch (err) {
      console.error("Geocoding failed:", err);
      return null;
    }
  }

  async function getRoute(start, end) {
    try {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
      );
      const data = await query.json();
      if (data.routes && data.routes.length > 0) {
        return data.routes[0].geometry; 
      }
      return null;
    } catch (err) {
      console.error("Failed to fetch route:", err);
      return null;
    }
  }

  function clearMarkers() {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
  }

  useEffect(() => {
    (async () => {
      if (source && mapRef.current) {
        const coords = await getCoordinates(source);
        if (coords) {
          mapRef.current.setCenter(coords);
          mapRef.current.setZoom(9);

          const marker = new mapboxgl.Marker({ color: "green" })
            .setLngLat(coords)
            .addTo(mapRef.current);
          markersRef.current.push(marker);
        }
      }
    })();
  }, [source]);

  const handleClick = async (e) => {
    e.preventDefault();

    if (!source || destination.length === 0) {
      toast.error("Please select source and at least one destination");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:8080/api/orders/findpath",
        { source, destinations: destination },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setResults(res.data.results);
      toast.success("Shortest path fetched!");

      const sourceCoords = await getCoordinates(source);
      if (!mapRef.current || !sourceCoords) return;

      mapRef.current
        .getStyle()
        .layers.forEach((layer) => {
          if (layer.id.startsWith("route-line")) {
            if (mapRef.current.getLayer(layer.id))
              mapRef.current.removeLayer(layer.id);
            if (mapRef.current.getSource(layer.id))
              mapRef.current.removeSource(layer.id);
          }
        });

      clearMarkers();

      const sourceMarker = new mapboxgl.Marker({ color: "green" })
        .setLngLat(sourceCoords)
        .addTo(mapRef.current);
      markersRef.current.push(sourceMarker);

      const colors = [
        "#FF5733",
        "#33FF57",
        "#3357FF",
        "#FFC300",
        "#120303",
        "#FF33A8",
      ];

      for (let i = 0; i < res.data.results.length; i++) {
        const r = res.data.results[i];
        const color = colors[i % colors.length];

        const coordsList = await Promise.all(
          r.path.map((city) => getCoordinates(city))
        );

        for (let j = 0; j < coordsList.length - 1; j++) {
          const start = coordsList[j];
          const end = coordsList[j + 1];
          if (!start || !end) continue;

          const routeGeometry = await getRoute(start, end);
          if (!routeGeometry) continue;

          const layerId = `route-line-${i}-${j}`;
          mapRef.current.addSource(layerId, {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: routeGeometry,
            },
          });
          mapRef.current.addLayer({
            id: layerId,
            type: "line",
            source: layerId,
            layout: { "line-join": "round", "line-cap": "round" },
            paint: { "line-color": color, "line-width": 4 },
          });
        }

        const lastCoord = coordsList[coordsList.length - 1];
        if (lastCoord) {
          const destMarker = new mapboxgl.Marker({ color: "red" })
            .setLngLat(lastCoord)
            .addTo(mapRef.current);
          markersRef.current.push(destMarker);
        }
      }
    } catch (err) {
      console.error("Failed to fetch path", err);
      toast.error("Failed to fetch path");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", fontFamily: "Arial" }}>
      <div style={{ marginBottom: "10px" }}>
        <label>Source : </label>
        {source}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Destination(s)</label>
        <select
          multiple
          value={destination}
          onChange={(e) =>
            setDestination([...e.target.selectedOptions].map((o) => o.value))
          }
          required
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            height: "120px",
          }}
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleClick}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Find
      </button>

      <div
        ref={mapContainerRef}
        style={{ width: "550px", height: "300px", marginTop: "20px" }}
      ></div>

      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Shortest Paths from {source}:</h3>
          <ul>
            {results.map((r) => (
              <li key={r.destination} style={{ marginBottom: "8px" }}>
                <strong>{r.destination}</strong>: Distance = {r.distance}, Path ={" "}
                {r.path.join(" → ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FindOptimalPath;
