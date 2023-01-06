interface SearchBarProps {
  className?: string;
}

function SearchBar (props: SearchBarProps) {
  return (
    <input type="text" placeholder="Search..." className={props.className} />
  )
}

export default SearchBar