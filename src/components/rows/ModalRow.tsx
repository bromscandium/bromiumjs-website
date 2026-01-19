import './styles/ModalRow.css';

interface ModalRowProps {
  onDetailsClick: () => void;
  onMapClick: () => void;
}

export default function ModalRow({ onDetailsClick, onMapClick }: ModalRowProps) {
  return (
    <div className="modal-row">
      <button className="tab-button" onClick={onDetailsClick}>
        Details
      </button>
      <button className="tab-button" onClick={onMapClick}>
        Map
      </button>
    </div>
  );
}
