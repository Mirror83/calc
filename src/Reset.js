export default function Reset(props) {
  return (
    <div className={props.class} onClick={() => props.reset()}>
      {props.value}
    </div>
  );
}
