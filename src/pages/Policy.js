import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={'Privacy Policy'}>
      <div className="policy">
        <div className="container">
          <div className="privacy-section">
            <h1 className="privacy-heading">Privacy Policy</h1>
            <p>This privacy policy applies to the website example.com.</p>
            <p>
              We respect your privacy and are committed to protecting personally
              identifiable information you may provide us through the website.
              We have adopted this privacy policy to explain what information
              may be collected, how we use this information, and under what
              circumstances we may disclose the information to third parties.
            </p>
          </div>
          <div className="privacy-section">
            <h2 className="privacy-heading">Information We Collect</h2>
            <p>
              We collect information that you provide to us directly when you
              visit our website. This information may include your name, email
              address, and any other information you choose to provide.
            </p>
            <p>
              We may also collect information automatically when you use our
              website. This information may include your IP address, browser
              type, and operating system.
            </p>
          </div>
          <div className="privacy-section">
            <h2 className="privacy-heading">Use of Information</h2>
            <p>We may use the information we collect to:</p>
            <ul>
              <li>Provide, operate, and maintain our website</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Monitor and analyze usage of our website</li>
              <li>
                Send you promotional communications, if you have opted in to
                receive them
              </li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
          <div className="privacy-section">
            <h2 className="privacy-heading">Disclosure of Information</h2>
            <p>We may disclose your personal information to:</p>
            <ul>
              <li>Service providers who assist us in operating our website</li>
              <li>Third-party vendors who provide services on our behalf</li>
              <li>Law enforcement or government agencies as required by law</li>
            </ul>
          </div>
          <div className="privacy-section">
            <h2 className="privacy-heading">Changes to This Privacy Policy</h2>
            <p>
              We may update our privacy policy from time to time. We will notify
              you of any changes by posting the new privacy policy on this page.
            </p>
            <p>
              You are advised to review this privacy policy periodically for any
              changes. Changes to this privacy policy are effective when they
              are posted on this page.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
