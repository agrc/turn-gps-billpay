import FooterSocialMedia from '../header/FooterSocialMedia';
import FooterMainContent from '../header/FooterMainContent';

function AdminLanding() {
  return (
    <div>
      <div className="content-width">
        <h1 className="my-spacing-l text-center">Admin</h1>

        <p className="lead-in">Administration Section</p>
      </div>

      <footer aria-label="Utah Design System (main footer)">
        <FooterSocialMedia />
        <FooterMainContent />
        <div id="utah-footer-placeholder" />
      </footer>
    </div>
  );
}

export default AdminLanding;
