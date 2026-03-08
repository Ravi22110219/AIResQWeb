

function ServicePage() {
  return (
    <div style={pageStyle}>
      
      {/* Header */}
      <header style={headerStyle}>
        <h2 style={{ margin: 0 }}>
          AquaResQ: AIResQ's Urban Flood Digital Twin
        </h2>
      </header>

      {/* Flood Map Iframe */}
      <div style={iframeContainer}>
        <iframe
          src="https://spatial.airesqclimsols.com/"
          title="Gurugram Flood Map"
          style={iframeStyle}
          allowFullScreen
        />
      </div>


      
    </div>
  )
}

export default ServicePage


// -------- Styles --------

const pageStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  background: "#f8fafc",
  fontFamily: "system-ui, sans-serif",
}

const headerStyle = {
  padding: "12px",
  textAlign: "center",
  background: "#ffffff",
  borderBottom: "1px solid #e5e7eb",
  fontWeight: "600",
}

const iframeContainer = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
}

const iframeStyle = {
  width: "98%",
  height: "90vh",
  border: "none",
  borderRadius: "12px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
}

const footerStyle = {
  padding: "10px",
  textAlign: "center",
  background: "#ffffff",
  borderTop: "1px solid #e5e7eb",
  fontSize: "14px",
}