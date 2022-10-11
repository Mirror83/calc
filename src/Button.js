export default function Button(props) {
  return (
    <div className={props.class} onClick={() => props.updateText(props.value)}>
      {props.value}
    </div>
  );
}
