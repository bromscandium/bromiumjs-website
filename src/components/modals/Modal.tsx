import { onMounted, onUnmounted } from 'bromium';
import CancelButton from '../buttons/CancelButton';
import './styles/Modal.css';

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: any;
}

export default function Modal({ isOpen, title, onClose, children }: ModalProps) {
  onMounted(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
  });

  onUnmounted(() => {
    document.body.style.overflow = '';
  });

  if (!isOpen) {
    return null;
  }

  function handleBackdropClick(e: MouseEvent) {
    if ((e.target as Element).classList.contains('modal-backdrop')) {
      onClose();
    }
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <CancelButton onClick={onClose} />
          <h2 className="modal-title">{title}</h2>
          <div className="modal-header-spacer"></div>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
