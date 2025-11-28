export default function Lang({ data }) {
  const styles = {
    color: data.color,
    backgroundColor: data.backgroundColor,
  }
  return (
    <>
      <span className="lang" style={styles}>{data.name}
        {!data.status && <span className="lang lost">💀</span>}
      </span>

    </>
  )
}

