export const StarsDisplay = props => (
  <>
    {props.range.map(starId => <div key={starId} className="star" />)}
  </>
)