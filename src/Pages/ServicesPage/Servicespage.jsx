import { useState, useEffect, useRef, useMemo } from "react"
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"

// --- AWS Amplify v6 ---
import { Amplify } from "aws-amplify"
import { withAuthenticator } from "@aws-amplify/ui-react"

import awsExports from "./aws-exports"
import WaterLevelChart from "./WaterLevelChart"

Amplify.configure(awsExports)

// --- Configuration ---
const MAP_API_KEY = "AIzaSyBtQGRGSqiUI_QbARdSO35zaSypSQWNFaY"
const LIBRARIES = ["core"]
const mapContainerStyle = { width: "100%", height: "100%" }
const mapCenter = { lat: 23.01449, lng: 72.55019 }
const mapOptions = {
  zoom: 13,
  center: mapCenter,
  disableDefaultUI: true,
  zoomControl: true,
}

// const amcFloodPredBucket = ["amc-pred-b", "amc-pred-multi"]
const amcFloodPredBucket = ["binarydata", "multidata"]

// --- GeoJSON sequence config ---
const START_INDEX = 107
const END_INDEX = 155

function ServicePage({ signOut, user }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: MAP_API_KEY,
    libraries: LIBRARIES,
  })

  // Animation + frame index
  const [currentIndex, setCurrentIndex] = useState(START_INDEX)
  const [isPlaying, setIsPlaying] = useState(false)
  const intervalRef = useRef(null)

  // Map ref
  const [mapRef, setMapRef] = useState(null)

  // Data layers
  const [overlayLayer, setOverlayLayer] = useState(null)
  const [boundaryLayer, setBoundaryLayer] = useState(null)
  const [nodeLayer, setNodeLayer] = useState(null)
  const [pipeLayer, setPipeLayer] = useState(null)

  // Flood prediction bucket selection
  const [selectedBucket, setSelectedBucket] = useState(amcFloodPredBucket[1]) // default to multi
  const [openPopover, setOpenPopover] = useState(null) // 'sim' | 'layers' | 'play' | null
  const handleSelectBucket = (bucket) => {
    setSelectedBucket(bucket)
    setCurrentIndex(START_INDEX)
    setIsPlaying(true) // auto play on simulation selection
  }

  // Derived: Selected S3 base URL
  const baseUrl = useMemo(() => `https://${selectedBucket}.s3.ap-south-1.amazonaws.com`, [selectedBucket])

  // --- Play/Pause Animation ---
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev < END_INDEX ? prev + 1 : START_INDEX))
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPlaying])

  // --- Load GeoJSON whenever index or bucket changes ---
  useEffect(() => {
    loadOverlayGeoJSON(currentIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, mapRef, selectedBucket])

  const handleSliderChange = (event) => {
    if (isPlaying) setIsPlaying(false)
    setCurrentIndex(Number.parseInt(event.target.value, 10))
  }

  const togglePlayPause = () => {
    setIsPlaying((p) => !p)
  }

  // --- Load Overlay GeoJSON from S3 (depends on selected bucket) ---
  const loadOverlayGeoJSON = (index) => {
    if (!mapRef) return
    if (overlayLayer) overlayLayer.setMap(null)

    const fileUrl = `${baseUrl}/time_${index.toString().padStart(3, "0")}.geojson`

    fetch(fileUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const newLayer = new window.google.maps.Data({ map: mapRef })
        newLayer.addGeoJson(data)

        newLayer.setStyle((feature) => {
          const raw = feature.getProperty("value")
          const value = typeof raw === "number" ? raw : Number(raw ?? 0)

          if (selectedBucket === amcFloodPredBucket[0]) {
            // Binary
            const isFlood = value === 1
            return {
              fillColor: isFlood ? "#1f59d1" : "#a8c5ff",
              strokeColor: isFlood ? "#1f59d1" : "#a8c5ff",
              strokeWeight: isFlood ? 0.2 : 0,
              fillOpacity: isFlood ? 0.55 : 0.28,
            }
          } else {
            // Multi: 4,3,2,1 => dark red, red, medium red, light red
            // 0 => transparent (not shown)
            let fillColor = "transparent"
            let strokeColor = "transparent"
            let fillOpacity = 0

            if (value === 4) {
              fillColor = "#7f0000" // dark red
              strokeColor = "#7f0000"
              fillOpacity = 0.7
            } else if (value === 3) {
              fillColor = "#b71c1c" // red
              strokeColor = "#b71c1c"
              fillOpacity = 0.6
            } else if (value === 2) {
              fillColor = "#e53935" // medium/smaller red
              strokeColor = "#e53935"
              fillOpacity = 0.45
            } else if (value === 1) {
              fillColor = "#ffcdd2" // light red
              strokeColor = "#ef9a9a"
              fillOpacity = 0.3
            }

            const visible = value > 0
            return {
              fillColor,
              strokeColor,
              strokeWeight: visible ? 0.3 : 0,
              fillOpacity: visible ? fillOpacity : 0,
            }
          }
        })

        setOverlayLayer(newLayer)
      })
      .catch((err) => console.error("Error loading overlay GeoJSON:", err, fileUrl))
  }

  // --- Toggle Boundary Layer ---
  const toggleBoundaryLayer = () => {
    if (!mapRef) return
    if (boundaryLayer) {
      boundaryLayer.setMap(null)
      setBoundaryLayer(null)
      return
    }
    fetch("https://amcdataflood.s3.ap-south-1.amazonaws.com/staticdata/ahmedabad_city_boundary.geojson")
    // fetch("https://gurugram-poc.s3.ap-south-1.amazonaws.com/gurugram-dem-data/city_boundary_web-friendly.geojson")
      .then((res) => res.json())
      .then((data) => {
        const newLayer = new window.google.maps.Data({ map: mapRef })
        newLayer.addGeoJson(data)
        newLayer.setStyle({
          fillColor: "lightblue",
          strokeColor: "black",
          strokeWeight: 1,
          fillOpacity: 0.1,
        })
        setBoundaryLayer(newLayer)
      })
  }

  // --- Toggle Pipe Layer (Pipes & Canals) ---
  const togglePipeLayer = () => {
    if (!mapRef) return
    if (pipeLayer) {
      pipeLayer.setMap(null)
      setPipeLayer(null)
      return
    }
    fetch("https://amcdataflood.s3.ap-south-1.amazonaws.com/staticdata/ahmedabad_city_pipes_and_canals.geojson")
      .then((res) => res.json())
      .then((data) => {
        const newLayer = new window.google.maps.Data({ map: mapRef })
        newLayer.addGeoJson(data)
        newLayer.setStyle((feature) => {
          if (feature.getGeometry().getType() === "LineString") {
            return {
              strokeColor: "#1779ff",
              strokeWeight: 2,
            }
          }
          return { visible: false }
        })
        setPipeLayer(newLayer)
      })
  }

  // --- Toggle Node Layer ---
  const toggleNodeLayer = () => {
    if (!mapRef) return
    if (nodeLayer) {
      nodeLayer.setMap(null)
      setNodeLayer(null)
      return
    }
    fetch("https://amcdataflood.s3.ap-south-1.amazonaws.com/staticdata/ahmedabad_city_node.geojson")
      .then((res) => res.json())
      .then((data) => {
        const newLayer = new window.google.maps.Data({ map: mapRef })
        newLayer.addGeoJson(data)
        newLayer.setStyle((feature) => {
          if (feature.getGeometry().getType() === "Point") {
            return {
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 3,
                fillColor: "#16a34a",
                fillOpacity: 1,
                strokeWeight: 0,
              },
            }
          }
          return { visible: false }
        })
        setNodeLayer(newLayer)
      })
  }

  if (loadError) return <div>Error loading maps. Please check your API key.</div>
  if (!isLoaded) return <div style={loaderStyle}>Loading Map and Authenticating...</div>

  // Labels for buckets
  const bucketLabel = selectedBucket === amcFloodPredBucket[0] ? "Binary" : "Multi"

  return (
    <div style={pageStyle}>
      {/* Header Bar */}
      <header style={headerStyle} aria-label="Header">
        <div style={{ fontWeight: 700, fontSize: 18, alignItems: "center"}}>Aquatwin: AIResQ's Urban Floods Digital Twins</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      
        </div>
      </header>

      {/* Map Card */}
      <section style={mapShellStyle} aria-label="Map">
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <GoogleMap mapContainerStyle={mapContainerStyle} options={mapOptions} onLoad={(map) => setMapRef(map)} />

          {/* Right Side Overlay Icon Rail */}
          <aside style={iconRailStyle} aria-label="Map Overlay Controls">
            {/* Simulation icon */}
            <div style={{ position: "relative" }}>
              <button
                type="button"
                title="Simulation"
                aria-haspopup="dialog"
                aria-expanded={openPopover === "sim"}
                onClick={() => setOpenPopover(openPopover === "sim" ? null : "sim")}
                style={iconButtonStyle}
              >
                {/* droplet icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3s-6 6-6 9a6 6 0 1 0 12 0c0-3-6-9-6-9z" fill="#0ea5e9" />
                </svg>
              </button>
              {/* hover label */}
              <div style={hoverLabelStyle}>Simulation</div>

              {openPopover === "sim" && (
                <div
                  role="dialog"
                  aria-label="Select Simulation"
                  style={popoverStyle}
                  onMouseLeave={() => setOpenPopover(null)}
                >
                  <div style={popoverHeaderStyle}>
                    <strong>Select Simulation</strong>
                    <span style={{ fontSize: 12, color: "#64748b" }}>{bucketLabel}</span>
                  </div>

                  <label style={radioRowStyle}>
                    <input
                      type="radio"
                      name="sim"
                      checked={selectedBucket === amcFloodPredBucket[0]}
                      onChange={() => handleSelectBucket(amcFloodPredBucket[0])}
                    />
                    <span style={{ marginLeft: 8 }}>Binary</span>
                  </label>
                  <label style={radioRowStyle}>
                    <input
                      type="radio"
                      name="sim"
                      checked={selectedBucket === amcFloodPredBucket[1]}
                      onChange={() => handleSelectBucket(amcFloodPredBucket[1])}
                    />
                    <span style={{ marginLeft: 8 }}>Multiclass</span>
                  </label>

                  <small style={{ display: "block", marginTop: 6, color: "#64748b" }}>
                    Selecting a simulation will auto play.
                  </small>
                </div>
              )}
            </div>

            {/* Layers icon */}
            <div style={{ position: "relative" }}>
              <button
                type="button"
                title="Data Layers"
                aria-haspopup="dialog"
                aria-expanded={openPopover === "layers"}
                onClick={() => setOpenPopover(openPopover === "layers" ? null : "layers")}
                style={iconButtonStyle}
              >
                {/* layers stack icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 4l9 5-9 5-9-5 9-5z" fill="#0f172a" />
                  <path d="M21 12l-9 5-9-5" fill="#0f172a" opacity="0.7" />
                </svg>
              </button>
              <div style={hoverLabelStyle}>Data Layers</div>

              {openPopover === "layers" && (
                <div
                  role="dialog"
                  aria-label="Data Layers"
                  style={popoverStyle}
                  onMouseLeave={() => setOpenPopover(null)}
                >
                  <div style={popoverHeaderStyle}>
                    <strong>Select Layer</strong>
                  </div>

                  <label style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 4px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="4" y="6" width="16" height="12" fill="none" stroke="#0f172a" strokeWidth="1.5" />
                    </svg>
                    <span style={{ flex: 1, marginLeft: 8 }}>Boundary</span>
                    <input
                      type="checkbox"
                      checked={!!boundaryLayer}
                      onChange={toggleBoundaryLayer}
                      aria-label="Toggle boundary"
                    />
                  </label>

                  <label style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 4px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 12h16" stroke="#0f172a" strokeWidth="2" />
                    </svg>
                    <span style={{ flex: 1, marginLeft: 8 }}>Pipes & canals</span>
                    <input
                      type="checkbox"
                      checked={!!pipeLayer}
                      onChange={togglePipeLayer}
                      aria-label="Toggle pipes & canals"
                    />
                  </label>

                  <label style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 4px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="3" fill="#16a34a" />
                    </svg>
                    <span style={{ flex: 1, marginLeft: 8 }}>Node</span>
                    <input type="checkbox" checked={!!nodeLayer} onChange={toggleNodeLayer} aria-label="Toggle nodes" />
                  </label>
                </div>
              )}
            </div>

            {/* Playback icon */}
            <div style={{ position: "relative" }}>
              <button
                type="button"
                title="Playback"
                aria-haspopup="dialog"
                aria-expanded={openPopover === "play"}
                onClick={() => setOpenPopover(openPopover === "play" ? null : "play")}
                style={iconButtonStyle}
              >
                {/* play icon */}
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="#334155" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" fill="#334155" />
                  </svg>
                )}
              </button>
              <div style={hoverLabelStyle}>Playback</div>

              {openPopover === "play" && (
                <div role="dialog" aria-label="Playback" style={popoverStyle} onMouseLeave={() => setOpenPopover(null)}>
                  <div style={popoverHeaderStyle}>
                    <strong>Playback</strong>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button
                      onClick={() => setIsPlaying((p) => !p)}
                      style={primaryButtonStyle}
                      aria-label={isPlaying ? "Pause animation" : "Play animation"}
                    >
                      {isPlaying ? "Pause" : "Play"}
                    </button>
                    <button
                      onClick={() => setCurrentIndex(START_INDEX)}
                      style={secondaryButtonStyle}
                      aria-label="Restart animation"
                    >
                      Restart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Bottom-right legend for flood/multi classes */}
          <div style={legendContainerStyle} aria-label="Map legend">
            <div style={legendRowStyle}>
              <span style={{ ...legendSwatchBase, background: "#1f59d1" }} aria-hidden="true" />
              <span>Flood Area</span>
            </div>
            <div style={legendRowStyle}>
              <span style={{ ...legendSwatchBase, background: "#7f0000" }} aria-hidden="true" />
              <span>Very High</span>
            </div>
            <div style={legendRowStyle}>
              <span style={{ ...legendSwatchBase, background: "#b71c1c" }} aria-hidden="true" />
              <span>High</span>
            </div>
            <div style={legendRowStyle}>
              <span style={{ ...legendSwatchBase, background: "#e53935" }} aria-hidden="true" />
              <span>Medium</span>
            </div>
            <div style={legendRowStyle}>
              <span
                style={{ ...legendSwatchBase, background: "#ffcdd2", border: "1px solid #ef9a9a" }}
                aria-hidden="true"
              />
              <span>Low</span>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline bar below the map */}
      <section style={timelineBarStyle} aria-label="Timeline">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => setIsPlaying((p) => !p)}
            style={secondaryButtonStyle}
            aria-label={isPlaying ? "Pause animation" : "Play animation"}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <span style={{ fontSize: 13, fontWeight: 600, width: 64, textAlign: "center" }}>Time(Hourly) {currentIndex -107}</span>
          <input
            type="range"
            min={START_INDEX}
            max={END_INDEX}
            value={currentIndex}
            onChange={handleSliderChange}
            style={{ width: "100%", cursor: "pointer" }}
            aria-label="Flood frame index"
          />
        </div>
      </section>

      {/* Chart section under the map */}
      <section style={chartSectionStyle} aria-label="Water Level Chart">
        <WaterLevelChart />
      </section>

      {/* Footer Bar */}
      <footer style={footerStyle} aria-label="Footer">
        <div><a href="https://airesqclimsols.com" style={{fontWeight:"bold"}}target="__blank__">Flood Simulator: An AquaTwin Product</a> - Machine Learning Pipelines Setup by <a href="https://github.com/dubeysarth" style={{fontWeight:"bold"}} target="__blank__">Sarth Dubey</a></div>
      </footer>
    </div>
  )
}

// --- Styles ---
const loaderStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  fontSize: "1.2rem",
  fontFamily: "sans-serif",
}

const pageStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  background: "#f8fafc",
  fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
}

const headerStyle = {
  position: "relative",
  zIndex: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
 
  padding: "10px 16px",
  background: "#ffffff",
  borderBottom: "1px solid #e5e7eb",
}

const signOutButtonStyle = {
  padding: "6px 12px",
  background: "#e11d48",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 600,
}

const mapShellStyle = {
  position: "relative",
  margin: "16px",
  borderRadius: "14px",
  overflow: "hidden",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  height: "62vh",
  background: "#ffffff",
}

const iconRailStyle = {
  position: "absolute",
  top: "16px",
  right: "16px",
  zIndex: 20,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}

const iconButtonStyle = {
  width: "44px",
  height: "44px",
  borderRadius: "9999px",
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}

const hoverLabelStyle = {
  position: "absolute",
  right: "56px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.75)",
  color: "#fff",
  fontSize: 11,
  zIndex: -1,
  padding: "4px 6px",
  borderRadius: "4px",
  pointerEvents: "none",
}

const popoverStyle = {
  position: "absolute",
  top: 0,
  right: "56px",
  width: "260px",
  maxWidth: "85vw",
  background: "rgba(255, 255, 255, 0.98)",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
  padding: "10px",
}

const popoverHeaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "6px",
  color: "#0f172a",
}

const radioRowStyle = {
  display: "flex",
  alignItems: "center",
  padding: "6px 2px",
  gap: "6px",
}

const primaryButtonStyle = {
  padding: "6px 12px",
  background: "#0ea5e9",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 600,
}

const secondaryButtonStyle = {
  padding: "6px 12px",
  background: "#e5e7eb",
  color: "#0f172a",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 600,
}

const timelineBarStyle = {
  margin: "0 16px",
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "10px 12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
}

const chartSectionStyle = {
  margin: "16px",
  background: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  padding: "10px",
}

const footerStyle = {
  marginTop: "auto",
  padding: "10px 14px",
  background: "#ffffff",
  borderTop: "1px solid #e5e7eb",
  textAlign: "center",
}

// Styles for legend overlay
const legendContainerStyle = {
  position: "absolute",
  right: "16px",
  bottom: "16px",
  zIndex: 25,
  background: "rgba(255,255,255,0.95)",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "8px 10px",
  boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
  fontSize: 12,
  color: "#0f172a",
}

const legendRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  margin: "4px 0",
}

const legendSwatchBase = {
  width: 12,
  height: 12,
  borderRadius: 2,
  display: "inline-block",
}

// Keep Authenticator wrapper
const AppWithAuthenticator = withAuthenticator(ServicePage)
export default ServicePage;
