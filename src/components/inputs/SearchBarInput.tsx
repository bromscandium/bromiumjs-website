import MagnifyingGlassIcon from '../icons/MagnifyingGlassIcon';
import './styles/SearchBarInput.css';

interface SearchBarInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  disabled?: boolean;
}

export default function SearchBarInput({
  value,
  onChange,
  onSearch,
  disabled = false,
}: SearchBarInputProps) {
  function handleSubmit(e: Event) {
    e.preventDefault();
    if (!disabled) onSearch();
  }

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    onChange(target.value);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Write a city here"
        value={value}
        onInput={handleInput}
        disabled={disabled}
      />
      <button
        className="search-button"
        disabled={disabled}
        onClick={handleSubmit}
      >
        <MagnifyingGlassIcon size={20} />
      </button>
    </form>
  );
}
