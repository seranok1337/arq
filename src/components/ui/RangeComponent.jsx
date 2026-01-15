export default function RangeComponent({ min = 0, max = 1, value, onChange, step = 0.01 }) {
  const handleChange = (e) => {
    onChange(e.target.value)
  };

  return (
    <input
      type="range"
      min={min}
      step={step}
      max={max}
      value={value}
      onChange={handleChange}
      className="w-50 h-3 rounded-lg cursor-pointer accent-white"
      style={{
        background: `linear-gradient(to right, white 0%, white ${
          ((value - min) / (max - min)) * 100
        }%, rgba(255,255,255,0.2) ${
          ((value - min) / (max - min)) * 100
        }%, rgba(255,255,255,0.2) 100%)`,
      }}
    />
  );
}
