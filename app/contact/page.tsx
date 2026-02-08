export default function ContactPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-navy">Contact Us</h1>
      <p>Email: advisory@ipcompliancepro.com | Phone: +1 555 101 2020</p>
      <p>Office: 120 Legal Avenue, Compliance District, NY</p>
      <p>Working Hours: Mon-Fri, 9:00 AM - 6:00 PM</p>
      <iframe title="map" className="h-80 w-full rounded-xl border" src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed" />
    </div>
  );
}
