export default function Footer() {
  return (
    <footer id="site-footer" className="border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-neutral-400 sm:flex-row">
        <p id="footer-copyright">&copy; {new Date().getFullYear()} Disclaimer: This website is a demo testing environment. All content, data, images, and materials displayed on this site are for demonstration and testing purposes only. No Legal Binding: The information on this website does not constitute legal, financial, or professional advice. Nothing on this site creates any contract, agreement, or legally binding relationship. No Copyright Intended: Content used on this site may include placeholder text, sample data, or mock assets. No ownership or copyright is claimed over these materials. If you own the rights to any displayed asset and wish for it to be removed, please contact us immediately. Data Accuracy & Liability: All data is simulated and should not be treated as real or accurate. We make no representations or warranties about the completeness, reliability, or accuracy of this data. Any action you take based on this website is strictly at your own risk.</p>
        <p id="footer-note">Contact: mkkeerthi@yahoo.com</p>
      </div>
    </footer>
  );
}
