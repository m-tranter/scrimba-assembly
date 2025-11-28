export default function Letter({ letter, status, lost }) {
  return (
    <span className={`letter ${!status && lost ? 'lost' : ''}`}>{status || lost ? letter : ''}</span>
  )
}
