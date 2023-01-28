interface SearchBarProps {
  className?: string;
  inputEvent?: (word: string) => void;
}

function SearchBar (props: SearchBarProps) {
  return (
    <input type="text" placeholder="Search..." className={props.className} onInput={ev => props.inputEvent?.((ev.target as any).value)} />
  )
}

export default SearchBar