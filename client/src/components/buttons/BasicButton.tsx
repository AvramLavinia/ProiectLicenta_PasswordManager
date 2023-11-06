import { CircularProgress } from "@mui/material";
import { ButtonType } from "./Button.types";
import Button from "@mui/material/Button";

const BasicButton = (props: ButtonType) => {
  const { title, onClick, style, loading = false } = props;

  return (
    <Button
      variant="contained"
      onClick={() => {
        if (!loading) {
          !loading && onClick();
        }
      }}
      style={{ ...styleButton, ...style }}
    >
      {loading ? (
        <CircularProgress size={20} />
      ) : (
        <p
          style={{
            fontSize: 18,
            zIndex: 10,
            margin: 0,
            color: "white",
            fontWeight: "bold",
          }}
          onClick={() => !loading && onClick()}
        >
          {title}
        </p>
      )}
    </Button>
  );
};

const styleButton: React.CSSProperties = {
  width: "380px",
  height: "50px",
  borderRadius: "60px",
  backgroundColor: "#00d4ff",
  color: " white",
  fontSize: "25px",
  border: "none",
  zIndex: 100,
  marginTop: "10px",
  marginBottom: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "uppercase",
  cursor: "pointer",
};

export default BasicButton;
