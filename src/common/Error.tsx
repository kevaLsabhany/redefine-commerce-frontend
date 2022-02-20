export default function Error(props: { errorMessage?: string }) {
  return <p style={{ color: "red" }}>{props?.errorMessage}</p>;
}
