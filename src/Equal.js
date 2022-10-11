export default function Equal(props) {
  return (
    <div className={props.class} onClick={() => props.evaluateExpression()}>
      {props.value}
    </div>
  );
}
