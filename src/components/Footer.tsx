import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-mist mt-24">
      <Container className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-10 text-sm text-stone">
        <p>&copy; {new Date().getFullYear()} Tresunotres. All rights reserved.</p>
        <p>Branding &amp; Identity</p>
      </Container>
    </footer>
  );
}
