export default function Layout(props: {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      {props.sidebar}
      {props.content}
    </div>
  );
}
