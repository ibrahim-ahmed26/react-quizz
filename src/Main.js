export default function Main({ children }) {
  return (
    <main className="main">
      <ul>
        <li>{children.map((q) => q.correctOption)}</li>
      </ul>
    </main>
  );
}
